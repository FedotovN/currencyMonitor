import { createApp } from 'vue'
import App from './App.vue'
import UI from '@/components/UI'
const app = createApp(App)
console.log(UI)
UI.forEach(comp => app.component(comp.name, comp))
app.mount('#app')

