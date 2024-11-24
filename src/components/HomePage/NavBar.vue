<script setup>
import { useRouter } from 'vue-router';  // Importar el hook para navegación programática

</script>
<template>
    <nav class="navbar rounded-box flex w-full items-center justify-between gap-2 shadow">
        <div class="navbar-start flex items-center gap-2 max-sm:w-1/4">
            <!-- Logo en un div circular con fondo naranja usando Tailwind -->
            <router-link to="/home" class="flex justify-center items-center">
                <div class="bg-orange-500 flex justify-center items-center w-12 h-12 rounded-full">
                    <img src="../../assets/logo.svg" alt="Logo" class="w-8 h-8 object-cover" />
                </div>
            </router-link>
            <!-- Nombre del sitio -->
            <router-link to="/home" class="link text-base-content/90 link-neutral text-xl font-bold no-underline">
                SaludAnimalia
            </router-link>
        </div>
        <div class="navbar-center max-sm:hidden">
            <ul class="menu menu-horizontal p-0 font-medium">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </div>
        <div class="navbar-end items-center gap-4">
            <div class="dropdown relative inline-flex sm:hidden rtl:[--placement:bottom-end]">
                <button id="dropdown-default" type="button"
                    class="dropdown-toggle btn btn-text btn-secondary btn-square" aria-haspopup="menu"
                    aria-expanded="false" aria-label="Dropdown">
                    <span class="icon-[tabler--menu-2] dropdown-open:hidden size-5"></span>
                    <span class="icon-[tabler--x] dropdown-open:block hidden size-5"></span>
                </button>
                <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu"
                    aria-orientation="vertical" aria-labelledby="dropdown-default">
                    <li><a class="dropdown-item" href="#">Link 1</a></li>
                    <li><a class="dropdown-item" href="#">Link 2</a></li>
                    <li><a class="dropdown-item" href="#">Link 3</a></li>
                </ul>
            </div>
            <router-link to="/auth" class="btn max-sm:btn-square btn-primary">
                <span class="max-sm:hidden">Ingresa aquí</span>
                <span class="icon-[tabler--arrow-right]"></span>
            </router-link>
        </div>
    </nav>
</template>

<style scoped>
/* No necesitas estilos adicionales, ya que Tailwind CSS cubre todo lo necesario */
</style>


<style scoped></style>
