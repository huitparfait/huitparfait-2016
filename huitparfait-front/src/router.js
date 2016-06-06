import Vue from 'vue'
import VueRouter from 'vue-router'
import Rankings from './components/Rankings'
import Predictions from './components/Predictions'
import GroupList from './components/GroupList'
import GroupUsers from './components/GroupUsers'
import GroupJoin from './components/GroupJoin'
import NewGroup from './components/NewGroup'
import Faq from './components/Faq'
import Profile from './components/Profile'
import store from './configureStore'
import { getCurrentUser } from './actions/user-actions'

Vue.use(VueRouter)

const router = new VueRouter({
    history: true,
    saveScrollPosition: true,
})

router.map({
    '/': {
        name: 'home',
        component: Faq,
    },
    '/classements': {
        name: 'rankings',
        component: Vue.component('Rankings', Rankings),
    },
    '/pronostics': {
        name: 'predictions',
        component: Vue.component('Predictions', Predictions),
    },
    '/groupes': {
        name: 'groupList',
        component: Vue.component('GroupList', GroupList),
    },
    '/groupes/:groupId/:groupName': {
        name: 'group',
        component: Vue.component('GroupUsers', GroupUsers),
    },
    '/rejoindre/:groupId/:groupName': {
        name: 'groupJoin',
        component: Vue.component('GroupJoin', GroupJoin),
    },
    '/groupes/nouveau': {
        name: 'newGroup',
        component: Vue.component('NewGroup', NewGroup),
    },
    '/faq': {
        name: 'faq',
        component: Vue.component('Faq', Faq),
    },
    '/profil': {
        name: 'profile',
        component: Vue.component('Profile', Profile),
    },
})

router.redirect({
    '*': '/'
})

store.dispatch(getCurrentUser())

// router.beforeEach(({ to, next, redirect }) => {
//
//     if (to.name === 'home') {
//
//         if (WebApi.apiState.user != null) {
//
//             const redirectPath = localStorage.getItem('before-login-path');
//             if (redirectPath != null) {
//                 localStorage.removeItem('before-login-path');
//                 redirect({ path: redirectPath })
//             }
//             else {
//                 redirect({ name: 'groupList' })
//             }
//         }
//         else {
//             next()
//         }
//     }
//     else {
//
//         if (WebApi.apiState.user != null) {
//             next()
//         }
//         else {
//             localStorage.setItem('before-login-path', to.path);
//             redirect({ name: 'home' })
//         }
//     }
// })

export default router
