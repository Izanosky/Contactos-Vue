import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'


const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'system'
        }
    }
})
app.use(router)
app.use(createPinia())
app.use(ToastService)
app.directive('tooltip', Tooltip);
app.use(ConfirmationService);
app.component('ConfirmDialog', ConfirmDialog)
app.component('Toast', Toast)


app.mount('#app')