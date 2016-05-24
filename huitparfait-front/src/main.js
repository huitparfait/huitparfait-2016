import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Rankings from './components/Rankings'
import Predictions from './components/Predictions'
import GroupList from './components/GroupList'
import Group from './components/Group'
import NewGroup from './components/NewGroup'
import Faq from './components/Faq'
import Profile from './components/Profile'

Vue.use(VueRouter)

const router = new VueRouter({
    history: true,
})

router.map({
    '/classements': { name: 'rankings', component: Rankings },
    '/pronostics': { name: 'predictions', component: Predictions },
    '/groupes': { name: 'groupList', component: GroupList },
    '/groupes/:groupId/:groupName': { name: 'group', component: Group },
    '/groupes/nouveau': { name: 'newGroup', component: NewGroup },
    '/faq': { name: 'faq', component: Faq },
    '/profil': { name: 'profile', component: Profile },
})

router.start(App, 'body')

// router.go({ name: 'predictions' })