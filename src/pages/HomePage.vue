<script setup>
import NavBar from '../components/HomePage/NavBar.vue';
import Header from '../components/HomePage/Header.vue';
import Servicios from '../components/HomePage/Servicios.vue';
import Footer from '../components/HomePage/Footer.vue';
import SobreNosotros from '../components/HomePage/SobreNosotros.vue';
</script>



<template>

    <div>
        <NavBar></NavBar>


        <Header></Header>

        <Servicios></Servicios>
        <SobreNosotros></SobreNosotros>
        <Footer></Footer>
    </div>

    <router-view></router-view>
</template>