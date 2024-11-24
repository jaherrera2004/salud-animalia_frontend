<script setup>

</script>

<template>

    <nav class="tabs overflow-x-auto space-x-1 rtl:space-x-reverse p-1" aria-label="Tabs" role="tablist"
        aria-orientation="horizontal">
        <button type="button"
            class="btn btn-text active-tab:bg-primary active-tab:text-white hover:text-primary active hover:bg-primary/20"
            id="tabs-pill-icon-item-1" data-tab="#tabs-pill-icon-1" aria-controls="tabs-pill-icon-1" role="tab"
            aria-selected="false">
            <span class="icon-[tabler--home] size-5 flex-shrink-0"></span>
            <span class="hidden sm:inline">Inicio</span>
        </button>
        <button type="button"
            class="btn btn-text active-tab:bg-primary active-tab:text-white hover:text-primary hover:bg-primary/20"
            id="tabs-pill-icon-item-2" data-tab="#tabs-pill-icon-2" aria-controls="tabs-pill-icon-2" role="tab"
            aria-selected="false">

            <span class="icon-[tabler--calendar-event] size-5 flex-shrink-0"></span>

            <span class="hidden sm:inline">Mis citas</span>
        </button>
        <button type="button"
            class="btn btn-text active-tab:bg-primary active-tab:text-white hover:text-primary hover:bg-primary/20"
            id="tabs-pill-icon-item-3" data-tab="#tabs-pill-icon-3" aria-controls="tabs-pill-icon-3" role="tab"
            aria-selected="false">
            <span class="icon-[tabler--notebook] size-5 flex-shrink-0"></span>
            <span class="hidden sm:inline">Mi agenda</span>
        </button>
    </nav>


</template>