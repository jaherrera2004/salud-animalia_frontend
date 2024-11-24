<script setup>
import TablaCitas from './Citas/TablaCitas.vue';

defineProps({
    userId: Number,
    token: String
});
</script>

<template>
    <div id="tabs-pill-icon-3" class="hidden" role="tabpanel" aria-labelledby="tabs-pill-icon-item-3">
        <TablaCitas :userId="userId" :token="token"></TablaCitas>
    </div>
</template>