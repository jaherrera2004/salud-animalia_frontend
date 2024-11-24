import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import Auth from "./pages/Auth.vue";
import Usuarios from "./pages/Usuarios.vue";
import Veterinarios from "./pages/Veterinarios.vue";

const routes = [
  {
    path: "/",
    component: HomePage // Cambia HomePage por la página inicial
  },
  {
    path: "/home",
    component: HomePage
  },
  {
    path: "/auth",
    component: Auth
  },
  {
    path: "/usuarios",
    component: Usuarios
  },
  {
    path: "/veterinario",
    component: Veterinarios
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
