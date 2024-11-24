<script setup>
import TablaMascotas from './Mascotas/TablaMascotas.vue';

defineProps({
    userId: Number,
    token: String
});

</script>
<template>

    <div id="tabs-pill-icon-2" class="hidden" role="tabpanel" aria-labelledby="tabs-pill-icon-item-2">

        <TablaMascotas :userId="userId" :token="token"></TablaMascotas>
    </div>
</template>