<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Importa el router
import { API_BASE_URL } from '../../Api';
import JwtManager from '../../JwtManager'


const router = useRouter();

const formData = ref({
    username: '',
    contrasenia: '',
});

const handleSubmit = async (event) => {
    const form = event.target;

    if (!form.checkValidity()) {
        form.classList.add('validate');
        return;
    }

    const jsonData = { ...formData.value };
    try {
        const respuesta = await axios.post(API_BASE_URL + '/auth', jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const token = respuesta.data.accessToken
        const jwtManager = new JwtManager();
        jwtManager.saveToken(token);

        switch (respuesta.data.usuarioDatosResponse.rol) {
            case "usuario":
                router.push('/usuarios');
                break;

            case "veterinario":
                router.push('/veterinario')
            default:
                break;
        }


    } catch (error) {
        if (error.response) {
            console.error('Error del servidor:', error.response.data);
        } else if (error.request) {
            console.error('No hubo respuesta del servidor:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
};
</script>

<template>
    <div class="bg-base-100 w-full rounded-lg shadow">
        <div class="w-96 p-4">
            <form class="needs-validation peer grid gap-y-4" @submit.prevent="handleSubmit" novalidate>
                <div class="w-full">
                    <h3 class="text-4xl text-center font-bold text-primary">Inicia Sesión</h3>
                    <hr class="mb-4 mt-2" />
                </div>

                <!-- Usuario -->
                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Usuario o Correo: </span>
                    </div>
                    <input type="text" name="username" placeholder="JohnDoe" class="input" required
                        v-model="formData.username" title="Por favor ingresa tu usuario o correo válido." />
                    <span class="error-message">Por favor ingresa tu usuario</span>
                    <span class="success-message">¡Se ve bien!</span>
                </label>

                <!-- Contraseña -->
                <label class="form-control">
                    <div class="label">
                        <span class="label-text">Contraseña: </span>
                    </div>
                    <input type="password" name="contrasenia" placeholder="••••••••" class="input" required
                        minlength="8" v-model="formData.contrasenia" title="Por favor ingresa una contraseña válida." />
                    <span class="error-message">Por favor ingresa tu contraseña.</span>
                    <span class="success-message">¡Se ve bien!</span>
                </label>

                <!-- Botón de Iniciar Sesión -->
                <div class="w-full text-center mt-4">
                    <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </div>
</template>
