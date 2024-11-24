<template>
    <div>
        <!-- Botón para abrir el modal -->
        <button type="button" class="btn btn-primary mr-25" @click="abrirModal">
            Agendar cita
        </button>

        <!-- Modal -->
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
            v-if="modalVisible">
            <div class="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                <!-- Header -->
                <div class="flex justify-between items-center border-b pb-4">
                    <h2 class="text-lg font-semibold">Agendar Cita</h2>
                    <button class="text-gray-400 hover:text-gray-600" @click="cerrarModal">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Cuerpo del Modal -->
                <div class="py-4">
                    <form>
                        <!-- Step 1 -->
                        <div v-show="step === 1">
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1">Escoge tu mascota:</label>
                                <select class="w-full input input-bordered" v-model="selectedMascota">
                                    <option disabled value="">Selecciona una mascota</option>
                                    <option v-for="mascota in mascotas" :key="mascota.id" :value="mascota.id">
                                        {{ mascota.nombre }} - {{ mascota.animal.animal }}
                                    </option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1">Tipo de cita:</label>
                                <select class="w-full input input-bordered" v-model="selectedTipoCita">
                                    <option disabled value="">Selecciona un tipo de cita</option>
                                    <option v-for="tipo in tiposCita" :key="tipo.id" :value="tipo.id">
                                        {{ tipo.tipoCita }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Step 2 -->
                        <div v-show="step === 2">
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1">Fecha</label>
                                <!-- Input de fecha estilizado -->
                                <input type="date"
                                    class="w-full input input-bordered border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 rounded-md"
                                    required v-model="fecha" :min="fechaActual" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1">Observaciones</label>
                                <textarea class="textarea max-w-sm" aria-label="Textarea"
                                    v-model="observaciones"></textarea>
                            </div>
                        </div>

                        <!-- Step 3 -->
                        <div v-show="step === 3">
                            <div class="mb-4">
                                <label class="block text-sm font-medium mb-1">Turnos disponibles:</label>
                                <div class="space-y-2 max-h-60 overflow-y-auto">
                                    <div v-for="turno in turnos" :key="turno.id" class="flex items-center">
                                        <input type="checkbox" :value="turno.id" :id="`turno-${turno.id}`"
                                            class="checkbox" v-model="selectedTurno"
                                            @change="seleccionarUnicoTurno(turno.id)" />
                                        <label :for="`turno-${turno.id}`" class="ml-2">
                                            {{ formatearTurno(turno) }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Footer -->
                <div class="flex justify-between items-center pt-4 border-t">
                    <button v-if="step > 1" class="btn btn-secondary" @click="prevStep">
                        Atras
                    </button>
                    <button v-if="step < 3" class="btn btn-primary" @click="nextStep">
                        Siguiente
                    </button>
                    <button v-if="step === 3" class="btn btn-success" @click="agendarCita">
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../../../Api';
import NotificationService from '../../../../NotificationService.js';

const props = defineProps({
    userId: Number,
    token: String,
});

// Declarar los eventos que el componente emitirá
const emit = defineEmits();

// Datos reactivos
const mascotas = ref([]);
const tiposCita = ref([]);
const turnos = ref([]);
const fechaActual = ref('');
const selectedMascota = ref('');
const selectedTipoCita = ref('');
const fecha = ref('');
const observaciones = ref('');
const selectedTurno = ref([]);

// Estado del modal y el paso actual
const modalVisible = ref(false);
const step = ref(1);

// Funciones de API
const obtenerMascotasPorUsuario = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/mascotas/usuario/${props.userId}`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });
        mascotas.value = response.data;
    } catch (err) {
        console.error('Error al cargar las mascotas', err);
    }
};

const obtenerTiposCitas = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tipo-citas`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });
        tiposCita.value = response.data;
    } catch (err) {
        console.error('Error al cargar los tipos de cita', err);
    }
};

const obtenerTurnos = async (fechaSeleccionada) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/turnos`, {
            params: {
                fecha: fechaSeleccionada,
            },
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        });
        turnos.value = response.data;
    } catch (err) {
        console.error('Error al cargar los turnos', err);
    }
};

// Función para agendar cita
const agendarCita = async () => {
    try {
        const citaData = {
            idMascota: selectedMascota.value,
            idTurno: selectedTurno.value[0], // Usamos solo el primer turno seleccionado
            idTipo: selectedTipoCita.value,
            observaciones: observaciones.value,
        };

        const response = await axios.post(`${API_BASE_URL}/citas`, citaData, {
            headers: {
                Authorization: `Bearer ${props.token}`,
            },
        });

        const notificacion = new NotificationService();
        notificacion.showSuccess(response.data.message);

        // Emitir evento para actualizar la lista de citas
        emit('AgendaExitosa'); // Emitir el evento correctamente

        cerrarModal();
    } catch (error) {
        console.error('Error al agendar la cita:', error);
    }
};

// Funciones del modal
const abrirModal = () => {
    modalVisible.value = true;
};

const cerrarModal = () => {
    modalVisible.value = false;
    step.value = 1; // Reinicia el paso al primer paso
    selectedMascota.value = '';
    selectedTipoCita.value = '';
    fecha.value = '';
    observaciones.value = '';
    selectedTurno.value = [];
};

// Funciones para cambiar de paso
const nextStep = () => {
    if (step.value < 3) step.value++;
};

const prevStep = () => {
    if (step.value > 1) step.value--;
};

// Función para formatear los turnos
const formatearTurno = (turno) => {
    const fechaInicio = new Date(turno.fechaInicio);
    const fechaFin = new Date(turno.fechaFin);
    const fechaFormateada = `${fechaInicio.toLocaleDateString()} ${fechaInicio.toLocaleTimeString()} - ${fechaFin.toLocaleTimeString()}`;
    return `${fechaFormateada} (${turno.veterinario.nombre} ${turno.veterinario.apellido})`;
};

// Restringir la selección a un solo turno
const seleccionarUnicoTurno = (id) => {
    if (selectedTurno.value.includes(id)) {
        selectedTurno.value = [id];
    }
};

// Llamar a las funciones cuando el componente se monte
onMounted(() => {
    obtenerMascotasPorUsuario();
    obtenerTiposCitas();

    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const año = hoy.getFullYear();

    fechaActual.value = `${año}-${mes}-${dia}`;
});

// Observar la fecha seleccionada para obtener los turnos disponibles
watch(fecha, (newFecha) => {
    if (newFecha) {
        obtenerTurnos(newFecha);
    }
});
</script>
