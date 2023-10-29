import './assets/main.css'
// main.ts
import 'virtual:uno.css'
import { createApp } from 'vue'
import { useStore } from './store'

import App from './App.vue'
import router from './router'

import VueKonva from 'vue-konva';
import Oruga from '@oruga-ui/oruga-next';


const app = createApp(App)

useStore(app)
app.use(router)
app.use(VueKonva)
app.use(Oruga)

app.mount('#app')
