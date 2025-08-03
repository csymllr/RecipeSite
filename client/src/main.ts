import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';

import './firebase'; // Ensure Firebase is initialized

import './assets/main.css';

createApp(App).use(router).use(createPinia()).mount('#app');
