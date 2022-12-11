import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
 