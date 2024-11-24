<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import JwtManager from '../../JwtManager';

const router = useRouter();
const jwtManager = new JwtManager();

// Estado del dropdown
const dropdownKey = ref(0);  // Usamos un ref para el key del dropdown

const cerrarSesion = () => {
    // Elimina el token utilizando JwtManager
    jwtManager.removeToken();
    // Forzamos la re-renderización del dropdown
    dropdownKey.value += 1;  // Cambiamos el key para reiniciar el dropdown
    // Redirige al usuario al home
    router.push('/home');
};

defineProps({
    nombre: String,
    apellido: String,
    username: String,
    email: String
});
</script>

<template>
    <nav class="navbar bg-base-100 rounded-box shadow">
        <div class="navbar-start flex items-center gap-2 max-sm:w-1/4">
            <router-link to="/usuarios" class="flex justify-center items-center">
                <div class="bg-orange-500 flex justify-center items-center w-12 h-12 rounded-full">
                    <img src="../../assets/logo.svg" alt="Logo" class="w-8 h-8 object-cover" />
                </div>
            </router-link>
            <router-link to="/usuarios" class="link text-base-content/90 link-neutral text-xl font-bold no-underline">
                SaludAnimalia
            </router-link>
        </div>
        <div class="navbar-end flex items-center gap-4">
            <div class="dropdown relative inline-flex rtl:[--placement:bottom-end]">
                <button id="dropdown-avatar" type="button"
                    class="dropdown-toggle btn btn-outline btn-primary flex items-center gap-2 rounded-full"
                    aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <div class="avatar">
                        <div class="size-6 rounded-full">
                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png" alt="User Avatar" />
                        </div>
                    </div>
                    <span>{{ username }}</span> <!-- Usa el prop username aquí -->
                    <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
                </button>
                <ul :key="dropdownKey" class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu"
                    aria-orientation="vertical" aria-labelledby="dropdown-avatar">
                    <li class="dropdown-header gap-3">
                        <div class="avatar">
                            <div class="w-10 rounded-full">
                                <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png" alt="User Avatar" />
                            </div>
                        </div>
                        <div>
                            <h6 class="text-base-content/90 text-base font-semibold">
                                {{ nombre }} {{ apellido }} <!-- Muestra nombre y apellido -->
                            </h6>
                            <small class="text-base-content/50 text-sm font-normal">
                                {{ email }} <!-- Muestra el email -->
                            </small>
                        </div>
                    </li>
                    <li><a class="dropdown-item" href="#">Mi Perfil</a></li>
                    <li><a class="dropdown-item" href="#">Ajustes</a></li>
                    <li class="dropdown-footer gap-2">
                        <button class="btn btn-error btn-soft btn-block" @click="cerrarSesion">
                            <span class="icon-[tabler--logout]"></span>
                            Cerrar Sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
