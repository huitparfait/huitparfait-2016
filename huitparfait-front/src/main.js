import Vue from 'vue'
import VueValidator from 'vue-validator'
import store from './state/configureStore'
import { fetchCurrentUser } from './state/actions/user'
import App from './App'
import router from './router'

Vue.use(VueValidator)

store.dispatch(fetchCurrentUser())
    .then(() => router.start(App, 'body'))
    .catch(() => router.start(App, 'body'))
