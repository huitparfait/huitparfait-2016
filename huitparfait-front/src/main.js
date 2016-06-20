import Vue from 'vue'
import VueValidator from 'vue-validator'
import store from './state/configureStore'
import { fetchCurrentUser } from './state/actions/user'
import App from './App'
import router from './router'
import Card from './components/Card'
import CardList from './components/CardList'
import CardTitle from './components/CardTitle'
import Btn from './components/Btn'
import LinkBtn from './components/LinkBtn'

Vue.use(VueValidator)

Vue.component('Card', Card)
Vue.component('CardList', CardList)
Vue.component('CardTitle', CardTitle)
Vue.component('Btn', Btn)
Vue.component('LinkBtn', LinkBtn)

Vue.filter('rank', function (ranking) {

    if (ranking == null) {
        return ''
    }

    if (ranking === 1) {
        return '1er'
    }

    return `${ranking}ème`
})

Vue.filter('frenchPlural', function (count, text) {

    if (count > 1 || count < -1) {
        return `${text}s`
    }

    return text
})

store.dispatch(fetchCurrentUser())
    .then(() => router.start(App, 'body'))
    .catch(() => router.start(App, 'body'))
