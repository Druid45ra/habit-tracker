import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./index.css"; // << AICI trebuie să fie importul CSS principal

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
