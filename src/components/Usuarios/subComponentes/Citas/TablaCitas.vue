<template>
    <div class="w-full overflow-x-auto p-4">
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-semibold ml-28">Lista de Citas</h1>
            <!-- Escuchar el evento 'AgendaExitosa' para recargar las citas -->
            <ModalAgendarCita :userId="userId" :token="token" @AgendaExitosa="cargarCitas"></ModalAgendarCita>
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
                        <th class="px-6 py-3 text-lg">Veterinario</th>
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
                        <td class="px-6 py-4">{{ cita.mascota }}</td>
                        <td class="px-6 py-4">{{ cita.veterinario }}</td>
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
                            <!-- Mostrar solo el botón de eliminar si la cita está agendada -->
                            <button v-if="cita.estado === 'Agendada'"
                                class="btn btn-circle btn-text btn-sm text-red-600" aria-label="Eliminar"
                                @click="confirmarCancelacion(cita.id)">
                                <span class="icon-[tabler--x] text-2xl"></span>
                            </button>

                            <!-- No mostrar nada si no está agendada (sin ícono en otros estados) -->
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
import ModalAgendarCita from './ModalAgendarCita.vue';
import Swal from 'sweetalert2';
import NotificationService from '../../../../NotificationService';

const props = defineProps({
    userId: Number,
    token: String,
});

// Citas obtenidas desde la API
const citas = ref([]);

// Función para formatear la fecha
function formatearFechaISO(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

// Función para formatear la hora
function formatearHoraISO(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

// Función para cargar las citas desde la API
async function cargarCitas() {
    try {
        const respuesta = await axios.get(`${API_BASE_URL}/citas/usuario/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        });

        // Transformar los datos de la API para que se ajusten al formato de la tabla
        citas.value = respuesta.data.map((cita) => ({
            id: cita.id,
            mascota: cita.mascota.nombre,
            veterinario: `${cita.turno.veterinario.nombre} ${cita.turno.veterinario.apellido}`,
            fecha: formatearFechaISO(cita.turno.fechaInicio),
            hora: formatearHoraISO(cita.turno.fechaInicio),
            tipoCita: cita.tipoCita.tipoCita,
            estado: cita.estado.estado,
        }));
    } catch (error) {
        console.error('Error al cargar las citas:', error);
    }
}

const confirmarCancelacion = async (idCita) => {
    // Muestra un SweetAlert para confirmar la acción
    const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción cancelará la cita y no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'Cancelar'
    });

    if (confirmacion.isConfirmed) {
        const notificacion = new NotificationService();
        try {
            // Llamada al endpoint para cancelar la cita
            await axios.put(`${API_BASE_URL}/citas/${idCita}/2`, null, {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            });


            notificacion.showSuccess("La cita ha sido cancelada")


            cargarCitas();
        } catch (error) {
            Swal.fire('Error', 'No se pudo cancelar la cita.', 'error');
            notificacion.showError('No se pudo cancelar la cita');
            console.error(error);
        }
    }
};

onMounted(() => {
    cargarCitas();
});
</script>
