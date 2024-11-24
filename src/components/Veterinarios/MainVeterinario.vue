<script setup>
import InicioVeterinario from './sub/InicioVeterinario.vue';
import Agenda from './sub/Agenda.vue';
import Citas from './sub/Citas.vue';

const props = defineProps({
    userId: Number,
    token: String,
});
</script>

<template>
    <div class="mt-3">
        <InicioVeterinario />
        <Agenda></Agenda>
        <Citas :token="props.token" :userId="props.userId"></Citas>

    </div>
</template>