<script setup>
import TablaCitasVet from './CitasVet/TablaCitasVet.vue';


const props = defineProps({
    userId: Number,
    token: String,
});

</script>
<template>
    <div id="tabs-pill-icon-2" class="hidden" role="tabpanel" aria-labelledby="tabs-pill-icon-item-3">
        <TablaCitasVet :userId="props.userId" :token="props.token"></TablaCitasVet>
    </div>
</template>