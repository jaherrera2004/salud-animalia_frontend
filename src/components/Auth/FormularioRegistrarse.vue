<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { API_BASE_URL } from '../../Api';
import NotificationService from '../../NotificationService';

const notificationService = new NotificationService();

const formData = ref({
    cedula: '',
    nombre: '',
    apellido: '',
    edad: null,
    telefono: '',
    email: '',
    username: '',
    contrasenia: '',
    idRol: 1,
});

const resetForm = () => {
    formData.value = {
        cedula: '',
        nombre: '',
        apellido: '',
        edad: null,
        telefono: '',
        email: '',
        username: '',
        contrasenia: '',
        idRol: 1,
    };
};

const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity()) {
        const jsonData = { ...formData.value };

        try {
            const respuesta = await axios.post(API_BASE_URL + '/usuarios', jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(respuesta.data);
            notificationService.showSuccess(respuesta.data.message);

            resetForm();
        } catch (error) {
            if (error.response) {
                console.error('Error del servidor:', error.response.data);
            } else if (error.request) {
                console.error('No hubo respuesta del servidor:', error.request);
            } else {
                console.error('Error:', error.message);
            }
        }
    } else {
        form.classList.add('validate');
    }
};
</script>

<template>
    <div class="bg-base-100 w-auto rounded-lg shadow border-primary">
        <div class="w-auto p-4">
            <form @submit="handleSubmit" class="needs-validation peer grid gap-y-4" novalidate>
                <div class="w-full">
                    <h3 class="text-4xl text-primary text-center font-bold">Regístrate aquí</h3>
                </div>

                <div class="w-full">
                    <h4 class="text-center font-semibold text-lg">Detalles de cuenta</h4>
                    <hr class="mb-4 mt-2" />
                </div>

                <!-- Nombre y Apellido -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Nombre: </span>
                        </div>
                        <input type="text" placeholder="John" class="input" v-model="formData.nombre" required
                            pattern="^[a-zA-Z ]+$" />
                    </label>

                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Apellido: </span>
                        </div>
                        <input type="text" placeholder="Doe" class="input" v-model="formData.apellido" required
                            pattern="^[a-zA-Z ]+$" />
                    </label>
                </div>

                <!-- Correo electrónico y Usuario -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Correo electrónico: </span>
                        </div>
                        <input type="email" placeholder="John@example.com" class="input" v-model="formData.email"
                            required />
                    </label>

                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Usuario: </span>
                        </div>
                        <input type="text" placeholder="JohnDoe" class="input" v-model="formData.username" required
                            pattern="^[a-zA-Z0-9_]+$" />
                    </label>
                </div>

                <!-- Contraseña y Confirmación -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Contraseña: </span>
                        </div>
                        <input type="password" placeholder="••••••••" class="input" v-model="formData.contrasenia"
                            required minlength="8" />
                    </label>
                </div>

                <div class="w-full">
                    <hr class="mb-4 mt-2" />
                    <h4 class="text-center font-semibold text-lg">Información personal</h4>
                </div>

                <!-- Teléfono, Edad y Cédula -->
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Teléfono: </span>
                        </div>
                        <input type="tel" placeholder="123-456-7890" class="input" v-model="formData.telefono"
                            required />
                    </label>

                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Edad: </span>
                        </div>
                        <input type="number" placeholder="30" class="input" v-model="formData.edad" required min="18" />
                    </label>

                    <label class="form-control">
                        <div class="label">
                            <span class="label-text">Cédula: </span>
                        </div>
                        <input type="text" placeholder="123456789" class="input" v-model="formData.cedula" required />
                    </label>
                </div>

                <!-- Botón de Enviar -->
                <div class="w-full text-center mt-4">
                    <button type="submit" class="btn btn-primary">Registrarse</button>
                </div>
            </form>
        </div>
    </div>
</template>
