<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
            class="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg transform transition-transform duration-300 scale-95 sm:scale-100">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-semibold text-gray-800">Detalles de la Mascota</h2>
                <button class="text-gray-500 hover:text-gray-800 transition-colors" @click="cerrarModal"
                    aria-label="Cerrar modal">
                    ✕
                </button>
            </div>
            <div v-if="mascota" class="space-y-6">
                <!-- Información de la mascota -->
                <div>
                    <h5 class="text-lg font-medium text-primary mb-2 border-b pb-1">Información de la Mascota</h5>
                    <p><strong class="text-gray-600">Nombre:</strong> {{ mascota.nombre }}</p>
                    <p><strong class="text-gray-600">Animal:</strong> {{ mascota.animal.animal }}</p>
                    <p><strong class="text-gray-600">Raza:</strong> {{ mascota.raza }}</p>
                    <p><strong class="text-gray-600">Edad:</strong> {{ mascota.edad }} años</p>
                    <p><strong class="text-gray-600">Sexo:</strong> {{ mascota.sexo }}</p>
                </div>

                <!-- Información del dueño -->
                <div>
                    <h5 class="text-lg font-medium text-primary mb-2 border-b pb-1">Información del Dueño</h5>
                    <p><strong class="text-gray-600">Dueño:</strong> {{ mascota.duenio.nombre }}
                        {{ mascota.duenio.apellido }}</p>
                    <p><strong class="text-gray-600">Teléfono:</strong> {{ mascota.duenio.telefono }}</p>
                    <p><strong class="text-gray-600">Email:</strong> {{ mascota.duenio.email }}</p>
                </div>
            </div>
            <button
                class="mt-6 px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-colors w-full"
                @click="cerrarModal">
                Cerrar
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../../../Api';

const props = defineProps({
    visible: Boolean,
    mascotaId: Number,
    token: String,
});

console.log('ID de mascota recibido en el modal:', props.mascotaId); // Verificar si llega correctamente

const emit = defineEmits(['update:visible']);
const mascota = ref(null);

// Función para cargar los detalles de la mascota
const cargarDetallesMascota = async () => {
    try {
        if (props.mascotaId) {
            const respuesta = await axios.get(`${API_BASE_URL}/mascotas/${props.mascotaId}`, {
                headers: {
                    Authorization: `Bearer ${props.token}`,
                },
            });
            mascota.value = respuesta.data;
            console.log('Detalles de la mascota:', respuesta.data);
        } else {
            console.log('No se ha recibido un ID válido');
        }
    } catch (error) {
        console.error('Error al cargar los detalles de la mascota:', error);
    }
};

watch(
    () => props.mascotaId,
    (newMascotaId) => {
        if (newMascotaId) {
            cargarDetallesMascota(); // Cargar los detalles de la mascota cuando el ID cambie
        }
    }
);

// Cerrar el modal
const cerrarModal = () => {
    emit('update:visible', false);
};
</script>

<style scoped>
/* Sombra personalizada para darle profundidad */
.shadow-lg {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}



/* Separador sutil */
.border-b {
    border-bottom: 1px solid #e5e7eb;
    /* Gris claro */
}
</style>
