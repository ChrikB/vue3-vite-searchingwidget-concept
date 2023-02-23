//const { createApp } = require('vue')
import {createApp} from 'vue'
import App from "./App.vue"
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const App = createApp(App);
/* just a fast way to store global array for favorite items */
App.config.globalProperties.myFavorites = []; 

App.use( router )
.mount("#app");



