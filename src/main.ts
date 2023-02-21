import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./assets/main.css";

const app = createApp(App);

/* just a fast way to store global data for 'favorites' list */
app.config.globalProperties.myFavorites = []; 

app.use(createPinia());
app.use(router);

app.mount("#app");
