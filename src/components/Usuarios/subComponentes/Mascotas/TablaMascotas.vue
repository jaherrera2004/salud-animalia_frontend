<script setup>
import { ref, onMounted } from 'vue';
import ModalAgregarMascota from './ModalAgregarMascota.vue';
import ModalEditarMascota from './ModalEditarMascota.vue';
import { API_BASE_URL } from '../../../../Api';
import axios from 'axios';
import Swal from 'sweetalert2';

const props = defineProps({
    userId: Number,
    token: String
});

const data = ref([]);
const error = ref(null);

const modalEditarVisible = ref(false);
const mascotaSeleccionada = ref(null);

// Función para obtener las mascotas
const obtenerMascotasPorUsuario = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mascotas/usuario/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });
        data.value = response.data;
    } catch (err) {
        error.value = 'Error al cargar los datos';
        console.error(err);
    }
};

// Llamada inicial
onMounted(() => {
    obtenerMascotasPorUsuario();
});

// Función para abrir el modal de edición
const abrirModalEditar = (mascota) => {
    mascotaSeleccionada.value = mascota;
    modalEditarVisible.value = true;
};

// Función para cerrar el modal de edición
const cerrarModalEditar = () => {
    modalEditarVisible.value = false;
};

// Función para actualizar la lista después de la edición
const actualizarLista = () => {
    obtenerMascotasPorUsuario();
};

// Función para eliminar una mascota
const eliminarMascota = async (idMascota) => {
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
        try {
            await axios.delete(`${API_BASE_URL}/mascotas/${idMascota}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            });
            Swal.fire('Eliminado', 'La mascota ha sido eliminada.', 'success');
            actualizarLista(); // Actualizar la lista de mascotas
        } catch (err) {
            Swal.fire('Error', 'No se pudo eliminar la mascota.', 'error');
            console.error(err);
        }
    }
};
</script>


<template>
    <div>
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-semibold ml-28">Lista de Mascotas</h1>
            <ModalAgregarMascota :token="props.token" :userId="props.userId" @registroExitoso="actualizarLista" />
        </div>

        <div class="w-full">
            <hr class="mb-4 mt-2" />
        </div>

        <div class="overflow-x-auto flex justify-center">
            <table class="table-striped-columns table w-full max-w-7xl mx-4">
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-lg">Nombre</th>
                        <th class="px-6 py-3 text-lg">Animal</th>
                        <th class="px-6 py-3 text-lg">Raza</th>
                        <th class="px-6 py-3 text-lg">Sexo</th>
                        <th class="px-6 py-3 text-lg">Edad</th>
                        <th class="w-32 text-center px-6 py-3 text-lg">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="mascota in data" :key="mascota.id">
                        <td class="px-6 py-4">{{ mascota.nombre }}</td>
                        <td class="px-6 py-4">{{ mascota.animal.animal }}</td>
                        <td class="px-6 py-4">{{ mascota.raza }}</td>
                        <td class="px-6 py-4">{{ mascota.sexo === 'M' ? 'Masculino' : 'Femenino' }}</td>
                        <td class="px-6 py-4">{{ mascota.edad }} años</td>
                        <td class="text-center px-6 py-4">
                            <button class="btn btn-circle btn-text btn-sm" aria-label="Editar mascota"
                                @click="abrirModalEditar(mascota)">
                                <span class="icon-[tabler--pencil] text-blue-400"></span>
                            </button>
                            <button class="btn btn-circle btn-text btn-sm" aria-label="Eliminar mascota"
                                @click="eliminarMascota(mascota.id)">
                                <span class="icon-[tabler--trash] text-red-500"></span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <ModalEditarMascota :token="props.token" :mascota="mascotaSeleccionada" :isVisible="modalEditarVisible"
            @actualizacionExitosa="actualizarLista" @cerrarModal="cerrarModalEditar" />
    </div>
</template>