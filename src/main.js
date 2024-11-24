import { createApp } from "vue";
import routes from "./Router";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(routes);
app.mount("#app");
