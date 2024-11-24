<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../../../Api';
import Swal from 'sweetalert2';

const props = defineProps({
    token: String,
    mascota: Object, // Recibe la mascota seleccionada
    isVisible: Boolean // Controla la visibilidad del modal
});

const emit = defineEmits(['actualizacionExitosa', 'cerrarModal']);

const mascotaEditada = ref({ ...props.mascota });
const animales = ref([]);

// Función para cerrar el modal
const cerrarModal = () => {
    emit('cerrarModal');
};

// Función para obtener la lista de animales
const obtenerAnimales = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/animales`, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });
        animales.value = response.data;
    } catch (error) {
        console.error('Error al obtener la lista de animales:', error);
    }
};

// Función para guardar los cambios
const guardarCambios = async () => {
    try {
        await axios.post(`${API_BASE_URL}/mascotas`, {
            id: mascotaEditada.value.id,
            nombre: mascotaEditada.value.nombre,
            raza: mascotaEditada.value.raza,
            edad: mascotaEditada.value.edad,
            sexo: mascotaEditada.value.sexo,
            idAnimal: mascotaEditada.value.idAnimal,
            idDuenio: props.mascota.duenio.id
        }, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });
        Swal.fire('Éxito', 'La mascota ha sido actualizada.', 'success');
        emit('actualizacionExitosa');
        cerrarModal();
    } catch (err) {
        Swal.fire('Error', 'No se pudo actualizar la mascota.', 'error');
        console.error(err);
    }
};

// Computed para verificar si hay cambios
const hayCambios = computed(() => {
    return (
        mascotaEditada.value.nombre !== props.mascota.nombre ||
        mascotaEditada.value.raza !== props.mascota.raza ||
        mascotaEditada.value.edad !== props.mascota.edad ||
        mascotaEditada.value.sexo !== props.mascota.sexo ||
        mascotaEditada.value.idAnimal !== props.mascota.idAnimal
    );
});

// Actualizar datos editados cuando cambie la mascota seleccionada
watch(
    () => props.mascota,
    (newVal) => {
        mascotaEditada.value = { ...newVal };
    }
);

// Cargar la lista de animales al montar el componente
onMounted(() => {
    obtenerAnimales();
});
</script>

<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Editar Mascota</h2>
                <button class="text-red-500" @click="cerrarModal">
                    <span class="icon-[tabler--x] text-2xl"></span>
                </button>
            </div>
            <form @submit.prevent="guardarCambios">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium mb-2">Nombre</label>
                        <input v-model="mascotaEditada.nombre" type="text" class="input w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Raza</label>
                        <input v-model="mascotaEditada.raza" type="text" class="input w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Edad</label>
                        <input v-model="mascotaEditada.edad" type="number" class="input w-full" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Sexo</label>
                        <select v-model="mascotaEditada.sexo" class="input w-full">
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Animal</label>
                        <select v-model="mascotaEditada.idAnimal" class="input w-full">
                            <option v-for="animal in animales" :key="animal.id" :value="animal.id">
                                {{ animal.animal }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end space-x-4">
                    <button type="button" class="btn btn-outline" @click="cerrarModal">Cancelar</button>
                    <button type="submit" class="btn btn-primary" :disabled="!hayCambios">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.input {
    border: 1px solid #d1d5db;
    padding: 0.5rem;
    border-radius: 0.375rem;
    font-size: 1rem;
}
</style>
