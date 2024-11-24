<script setup>
import FormularioRegistrarse from '../components/Auth/FormularioRegistrarse.vue';
import FormularioLogin from '../components/Auth/FormularioLogin.vue';
import NavBar from '../components/HomePage//NavBar.vue'
</script>

<template>
    <NavBar />
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-6xl p-6 space-y-6 lg:space-y-0 lg:space-x-6">
        <!-- Formulario de Registro -->
        <div class="w-full lg:w-2/5">
            <FormularioRegistrarse />
        </div>

        <!-- Formulario de Login -->
        <div class="w-full lg:w-2/5">
            <FormularioLogin />
        </div>
    </div>
</template>

<style scoped>
/* No se necesitan estilos adicionales; Tailwind CSS maneja la responsividad */
</style>
