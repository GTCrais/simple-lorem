
import { createApp } from 'vue';
import mitt from 'mitt';

import App from './components/App.vue';
import ComponentManager from './services/ComponentManager.js';
import StoreManager from './services/StoreManager.js';

window.eventHub = mitt();

const app = createApp(App);

app.use(StoreManager.setupStore());
ComponentManager.registerComponents(app);

app.mount('#vue-wrapper');
