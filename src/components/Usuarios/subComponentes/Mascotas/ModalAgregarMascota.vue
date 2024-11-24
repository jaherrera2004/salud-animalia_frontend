<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../../../Api';
import NotificationService from '../../../../NotificationService';

const props = defineProps({
    token: String,
    userId: Number
});

const emit = defineEmits(['registroExitoso']);


const nombre = ref('');
const animal = ref('')
const raza = ref('');
const sexo = ref('');
const edad = ref('');
const animales = ref([]);

// Verifica si todos los campos están llenos y válidos
const isFormValid = computed(() => {
    return nombre.value && animal.value && raza.value && sexo.value && edad.value && edad.value >= 0;
});

const obtenerAnimales = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/animales`, {
            headers: {
                Authorization: `Bearer ${props.token}` // Usar backticks para interpolar la variable
            }
        });
        animales.value = response.data; // Guardar los animales obtenidos
    } catch (error) {
        console.error('Error al obtener la lista de animales:', error);
    }
};

// Llamar a la función cuando el componente se monte
onMounted(() => {
    obtenerAnimales();
});

const registrarMascota = async () => {
    try {
        const payload = {
            nombre: nombre.value,
            raza: raza.value,
            edad: parseInt(edad.value),
            sexo: sexo.value,
            idAnimal: parseInt(animal.value),
            idDuenio: props.userId
        };

        const response = await axios.post(API_BASE_URL + '/mascotas', payload, {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        });

        // Emite el evento para indicar que el registro fue exitoso
        emit('registroExitoso');

        // Muestra la notificación de éxito después de que se haya registrado correctamente
        const notificación = new NotificationService();
        notificación.showSuccess(response.data.message)

    } catch (error) {
        console.error('Error al registrar la mascota:', error);
        // Muestra la notificación de error en caso de fallo
        Notificaciones.showError("Hubo un error al registrar la mascota.");
    }
};

// Función para manejar el envío del formulario
const submitForm = (event) => {
    event.preventDefault();
    registrarMascota();
};
</script>

<template>
    <button type="button" class="btn max-sm:btn-square btn-primary mr-28" aria-haspopup="dialog" aria-expanded="false"
        aria-controls="form-modal" data-overlay="#form-modal">
        Agregar Mascota
    </button>
    <!-- Modal con formulario de registro -->
    <div id="form-modal" class="overlay modal overlay-open:opacity-100 hidden" role="dialog" tabindex="-1">
        <div class="modal-dialog overlay-open:opacity-100">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Registrar Mascota</h3>
                    <button type="button" class="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                        aria-label="Cerrar" data-overlay="#form-modal">
                        <span class="icon-[tabler--x] size-4"></span>
                    </button>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="modal-body pt-0">
                        <!-- Nombre -->
                        <label class="form-control mb-4">
                            <span class="label-text">Nombre</span>
                            <input type="text" v-model="nombre" placeholder="Nombre" class="input" required />
                        </label>

                        <!-- Animal -->
                        <label class="form-control mb-4">
                            <span class="label-text">Animal</span>
                            <select v-model="animal" class="input" required>
                                <option value="">Selecciona el tipo de animal</option>
                                <option v-for="a in animales" :key="a.id" :value="a.id">{{ a.animal }}</option>
                            </select>
                        </label>

                        <!-- Raza -->
                        <label class="form-control mb-4">
                            <span class="label-text">Raza</span>
                            <input type="text" v-model="raza" placeholder="Raza" class="input" required />
                        </label>

                        <!-- Sexo -->
                        <label class="form-control mb-4">
                            <span class="label-text">Sexo</span>
                            <select v-model="sexo" class="input" required>
                                <option value="">Selecciona el sexo</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </label>

                        <!-- Edad -->
                        <label class="form-control mb-4">
                            <span class="label-text">Edad</span>
                            <input type="number" v-model="edad" placeholder="Edad en años" class="input" min="0"
                                required />
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-overlay="#form-modal">Cerrar</button>
                        <!-- Deshabilitar el botón si el formulario no es válido -->
                        <button type="submit" class="btn btn-primary" :disabled="!isFormValid"
                            data-overlay="#form-modal">Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
