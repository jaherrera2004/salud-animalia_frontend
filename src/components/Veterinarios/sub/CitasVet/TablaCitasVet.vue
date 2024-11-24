<template>
    <div class="w-full overflow-x-auto p-4">
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-semibold ml-28">Lista de Citas</h1>
            <!-- Modal de detalles de mascota -->
            <ModalMascotaDetalles :visible="modalVisible" :mascotaId="mascotaSeleccionada" :token="props.token"
                @update:visible="modalVisible = $event" />
        </div>

        <div class="w-full">
            <hr class="mb-4 mt-2" />
        </div>

        <div class="overflow-x-auto flex justify-center">
            <table class="table-striped-columns table w-full max-w-7xl mx-4">
                <thead>
                    <tr>
                        <th class="px-6 py-3 text-lg">Id</th>
                        <th class="px-6 py-3 text-lg">Mascota</th>
                        <th class="px-6 py-3 text-lg">Dueño</th>
                        <th class="px-6 py-3 text-lg">Fecha</th>
                        <th class="px-6 py-3 text-lg">Hora</th>
                        <th class="px-6 py-3 text-lg">Tipo de Cita</th>
                        <th class="px-6 py-3 text-lg">Estado</th>
                        <th class="w-32 text-center px-6 py-3 text-lg">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cita in citas" :key="cita.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4">{{ cita.id }}</td>
                        <td class="px-6 py-4">
                            <a href="#" @click.prevent="abrirModalMascota(cita.mascotaId)" class="underline">
                                {{ cita.mascota }}
                            </a>
                        </td>

                        <td class="px-6 py-4">{{ cita.duenio }}</td>
                        <td class="px-6 py-4">{{ cita.fecha }}</td>
                        <td class="px-6 py-4">{{ cita.hora }}</td>
                        <td class="px-6 py-4">{{ cita.tipoCita }}</td>
                        <td class="px-6 py-4">
                            <span class="badge text-xs" :class="{
                                'badge-soft badge-info': cita.estado === 'Agendada',
                                'badge-soft badge-danger text-red-600': cita.estado === 'Cancelada',
                                'badge-soft badge-success': cita.estado === 'Completada',
                            }">
                                {{ cita.estado }}
                            </span>
                        </td>
                        <td class="text-center px-6 py-4">
                            <button v-if="cita.estado === 'Agendada'"
                                class="btn btn-circle btn-text btn-sm text-green-600" aria-label="Completar"
                                @click="completarCita(cita.id)">
                                <span class="icon-[tabler--check] text-2xl"></span>
                            </button>
                            <button v-if="cita.estado === 'Agendada'"
                                class="btn btn-circle btn-text btn-sm text-red-600" aria-label="Cancelar"
                                @click="confirmarCancelacion(cita.id)">
                                <span class="icon-[tabler--x] text-2xl"></span>
                            </button>
                            <span v-else></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../../../Api';
import Swal from 'sweetalert2';
import NotificationService from '../../../../NotificationService';
import ModalMascotaDetalles from './ModalMascotaDetalles.vue';

const props = defineProps({
    userId: Number,
    token: String,
});

const citas = ref([]);
const modalVisible = ref(false);
const mascotaSeleccionada = ref(null);

const formatearFechaISO = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const formatearHoraISO = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

const cargarCitas = async () => {
    try {
        const respuesta = await axios.get(`${API_BASE_URL}/citas/usuario/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        });

        citas.value = respuesta.data.map((cita) => ({
            id: cita.id,
            mascota: cita.mascota.nombre,
            mascotaId: cita.mascota.id,
            duenio: `${cita.mascota.duenio.nombre} ${cita.mascota.duenio.apellido}`,
            fecha: formatearFechaISO(cita.turno.fechaInicio),
            hora: formatearHoraISO(cita.turno.fechaInicio),
            tipoCita: cita.tipoCita.tipoCita,
            estado: cita.estado.estado,
        }));
    } catch (error) {
        console.error('Error al cargar las citas:', error);
    }
};

const abrirModalMascota = (mascotaId) => {
    mascotaSeleccionada.value = mascotaId; // Actualiza correctamente el valor del ref
    modalVisible.value = true;
};

const confirmarCancelacion = async (idCita) => {
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción cancelará la cita y no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
        const notificacion = new NotificationService();
        try {
            await axios.put(`${API_BASE_URL}/citas/${idCita}/2`, null, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            });

            notificacion.showSuccess('La cita ha sido cancelada');
            cargarCitas();
        } catch (error) {
            Swal.fire('Error', 'No se pudo cancelar la cita.', 'error');
            notificacion.showError('No se pudo cancelar la cita');
            console.error(error);
        }
    }
};

const completarCita = async (idCita) => {
    const confirmacion = await Swal.fire({
        title: '¿Completar cita?',
        text: 'Esta acción marcará la cita como completada.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, completar',
        cancelButtonText: 'Cancelar',
    });

    if (confirmacion.isConfirmed) {
        const notificacion = new NotificationService();
        try {
            await axios.put(`${API_BASE_URL}/citas/${idCita}/3`, null, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            });

            notificacion.showSuccess('La cita ha sido completada');
            cargarCitas(); // Actualiza la lista de citas
        } catch (error) {
            Swal.fire('Error', 'No se pudo completar la cita.', 'error');
            notificacion.showError('No se pudo completar la cita');
            console.error(error);
        }
    }
};

onMounted(() => {
    cargarCitas();
});
</script>
