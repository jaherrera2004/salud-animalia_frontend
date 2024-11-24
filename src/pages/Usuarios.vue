<script setup>
import { ref, onMounted, nextTick } from 'vue'; // Agregado onMounted para cargar los datos cuando el componente se monta
import NavBarUsuario from '../components/Usuarios/NavBarUsuario.vue';
import SubNavBarUsuario from '../components/Usuarios/SubNavbar.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { API_BASE_URL } from '../Api';
import JwtManager from '../JwtManager';
import Main from '../components/Usuarios/subComponentes/Main.vue';

// Estado para la respuesta de la API y para los errores
const data = ref(null);
const error = ref(null);

// Instanciación del JwtManager y uso del router
const jwtManager = new JwtManager();
const router = useRouter();

// Obtención del token y validación
const token = jwtManager.getToken();

if (!jwtManager.isAuthenticated(token) || jwtManager.isTokenExpired(token)) {
    jwtManager.removeToken();
    router.push('/home'); // Redirige a la página principal si no está autenticado
}

const userId = jwtManager.getPayloadAttribute('userId'); // Obtener userId del token

// Función para obtener los datos del usuario desde la API
const obtenerUsuario = async (userId, token) => {
    try {

        const response = await axios.get(`${API_BASE_URL}/usuarios/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}` // Corregido el formato de la autorización
            }
        });
        data.value = response.data;
        console.log('Respuesta de la API:', data.value); // Verifica la respuesta
    } catch (err) {
        error.value = 'Error al cargar los datos';
        console.error(err);
    }
};

// Ejecutar la función obtenerUsuario cuando el componente se monte
onMounted(() => {
    if (userId && token) {
        obtenerUsuario(userId, token);
    }

});

</script>

<template>
    <!-- Mostrar la barra de navegación con los datos del usuario -->
    <NavBarUsuario :nombre="data?.nombre" :apellido="data?.apellido" :username="data?.username" :email="data?.email" />

    <div class="w-full">
        <hr class="mb-4 mt-2" />
    </div>

    <div class="ml-5">
        <SubNavBarUsuario class="ml-4" />
        <Main :userId="userId" :token="token"></Main>
    </div>
</template>
