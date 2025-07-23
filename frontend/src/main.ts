import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

createApp(App).mount('#app');
