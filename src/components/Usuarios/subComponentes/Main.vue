<script setup>
import InicioUsuario from './InicioUsuario.vue';
import Mascotas from './Mascotas.vue';
import Citas from './Citas.vue';

defineProps({
    userId: Number,
    token: String
});

</script>


<template>
    <div class="mt-3">
        <InicioUsuario />
        <Mascotas :userId="userId" :token="token"></Mascotas>
        <Citas :userId="userId" :token="token"></Citas>


    </div>
</template>