<script setup>
import { useRouter } from 'vue-router';  // Importar el hook para navegación programática
</script>

<template>
    <div class="py-12 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
            <!-- Título de la sección -->
            <h2 class="text-center text-7xl font-semibold text-primary mb-8">Sobre Nosotros</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                <!-- Misión de la clínica -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-3xl font-semibold text-primary mb-4 text-center">Nuestra Misión</h3>
                    <p class="text-gray-600 text-lg">
                        En <span class="font-semibold text-primary">SaludAnimalia</span>, nuestra misión es brindar el
                        mejor cuidado y atención médica a las mascotas. Nos esforzamos por ofrecer servicios de salud de
                        alta calidad para garantizar la felicidad y bienestar de tus compañeros peludos, con un equipo
                        de profesionales apasionados por el cuidado animal.
                    </p>
                </div>

                <!-- Visión de la clínica -->
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <h3 class="text-3xl font-semibold text-primary mb-4 text-center">Nuestra Visión</h3>
                    <p class="text-gray-600 text-lg">
                        Ser la clínica veterinaria de referencia en la comunidad, reconocida por nuestra excelencia en
                        servicios de salud animal y la confianza que generan nuestros profesionales. Queremos ser un
                        lugar donde las mascotas y sus dueños reciban atención de calidad en un ambiente cálido y
                        acogedor.
                    </p>
                </div>
            </div>

            <div class="mt-20 text-center">
                <h3 class="text-5xl font-semibold text-primary mb-4 text-center">Conoce a nuestro equipo</h3>
                <p class="text-lg text-gray-600 mb-8">
                    En SaludAnimalia, contamos con un equipo altamente capacitado y con mucha pasión por el bienestar
                    animal. Cada miembro de nuestro equipo está comprometido a brindar lo mejor para tus mascotas,
                    asegurando su salud y felicidad en todo momento.
                </p>
                <br>
                <!-- Sección de veterinarios -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Veterinario 1 -->
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="../../assets/images/vets/images (2).jpg" alt="Veterinario 1"
                            class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h4 class="text-xl font-semibold text-primary">Dr. Juan Pérez</h4>
                            <p class="text-gray-600 mt-2">
                                El Dr. Pérez es un veterinario apasionado por el bienestar animal. Se dedica a brindar
                                cuidados médicos completos a todas las mascotas.
                            </p>
                        </div>
                    </div>

                    <!-- Veterinario 2 -->
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="../../assets/images/vets/images (1).jpg" alt="Veterinario 2"
                            class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h4 class="text-xl font-semibold text-primary">Dra. Ana Gómez</h4>
                            <p class="text-gray-600 mt-2">
                                La Dra. Gómez es una veterinaria dedicada a la salud animal, brindando atención integral
                                y asegurando el bienestar de tus mascotas.
                            </p>
                        </div>
                    </div>

                    <!-- Veterinario 3 -->
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="../../assets/images/vets/images.jpg" alt="Veterinario 3"
                            class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h4 class="text-xl font-semibold text-primary">Dr. Luis Martínez</h4>
                            <p class="text-gray-600 mt-2">
                                El Dr. Martínez se enfoca en ofrecer atención médica de alta calidad, velando por la
                                salud y el confort de las mascotas.
                            </p>
                        </div>
                    </div>

                    <!-- Veterinario 4 -->
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="../../assets/images/vets/close-up-on-veterinarian-taking-care-of-cat-4.jpg"
                            alt="Veterinario 4" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <h4 class="text-xl font-semibold text-primary">Dra. María Ruiz</h4>
                            <p class="text-gray-600 mt-2">
                                La Dra. Ruiz es una veterinaria con una profunda pasión por el cuidado y la salud de las
                                mascotas. Siempre dispuesta a ayudar.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    <br>
    <br>
</template>

<style scoped>
/* Fuente personalizada de Google Fonts */
body {
    font-family: 'Roboto', sans-serif;
}
</style>
