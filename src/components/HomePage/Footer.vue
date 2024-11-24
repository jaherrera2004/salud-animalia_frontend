<template>
    <footer class="bg-white text-gray-800 py-6">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Sección de información de la clínica -->
                <div>
                    <h3 class="text-lg font-semibold text-primary">SaludAnimalia</h3>
                    <p class="text-gray-600 mt-2">
                        Tu clínica veterinaria de confianza, dedicada a ofrecer los mejores servicios de salud para tus
                        mascotas.
                    </p>
                    <div class="mt-4">
                        <span class="block">Teléfono: (123) 456-7890</span>
                        <span class="block">Email: contacto@saludanimalia.com</span>
                    </div>
                </div>

                <!-- Sección de enlaces rápidos -->
                <div>
                    <h3 class="text-lg font-semibold text-primary">Enlaces rápidos</h3>
                    <ul class="mt-2 space-y-2">
                        <li><a href="#" class="text-gray-600 hover:text-primary">Inicio</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-primary">Servicios</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-primary">Agendar cita</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-primary">Contacto</a></li>
                    </ul>
                </div>

                <!-- Sección de redes sociales -->
                <div>
                    <h3 class="text-lg font-semibold text-primary">Síguenos</h3>
                    <div class="mt-2 flex space-x-4">
                        <a href="#" class="text-gray-600 hover:text-primary">
                            <span class="icon-[akar-icons--facebook-fill] text-2xl"></span>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-primary">
                            <span class="icon-[akar-icons--instagram-fill] text-2xl"></span>
                        </a>
                        <a href="#" class="text-gray-600 hover:text-primary">
                            <span class="icon-[akar-icons--twitter-fill] text-2xl"></span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="mt-8 border-t border-gray-300 pt-4 text-center text-gray-600 text-sm">
                <p>&copy; 2024 SaludAnimalia. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
/* Estilos adicionales para asegurar que los íconos tengan un tamaño adecuado */
.icon-[akar-icons--facebook-fill],
.icon-[akar-icons--instagram-fill],
.icon-[akar-icons--twitter-fill] {
    font-size: 1.5rem;
}
</style>
