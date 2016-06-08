import Vue from 'vue'
import VueRouter from 'vue-router'
import Rankings from './components/Rankings'
import Predictions from './components/Predictions'
import GroupList from './components/GroupList'
import GroupUsers from './components/GroupUsers'
import GroupRanking from './components/GroupRanking'
import GroupJoin from './components/GroupJoin'
import NewGroup from './components/NewGroup'
import Faq from './components/Faq'
import Profile from './components/Profile'
import store from './state/configureStore'

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
        component: Rankings,
    },
    '/pronostics': {
        name: 'predictions',
        component: Predictions,
    },
    '/groupes': {
        name: 'groupList',
        component: GroupList,
    },
    '/groupes/:groupId/:groupName': {
        name: 'group',
        component: GroupUsers,
    },
    '/rejoindre/:groupId/:groupName': {
        name: 'groupJoin',
        component: GroupJoin,
    },
    '/groupes/:groupId/:groupName/classements': {
        name: 'groupRanking',
        component: GroupRanking,
    },
    '/groupes/nouveau': {
        name: 'newGroup',
        component: NewGroup,
    },
    '/faq': {
        name: 'faq',
        component: Faq,
    },
    '/profil': {
        name: 'profile',
        component: Profile,
    },
})

router.redirect({
    '*': '/',
})

router.beforeEach(({ to, next, redirect }) => {

    const PATH_BEFORE_LOGIN = 'path-before-login'

    if (to.name === 'home') {

        if (store.state.user != null) {

            const redirectPath = localStorage.getItem(PATH_BEFORE_LOGIN)
            if (redirectPath != null) {
                localStorage.removeItem(PATH_BEFORE_LOGIN)
                return redirect({ path: redirectPath })
            }

            return redirect({ name: 'groupList' })
        }

        return next()
    }

    if (store.state.user != null) {
        return next()
    }

    localStorage.setItem(PATH_BEFORE_LOGIN, to.path)
    return redirect({ name: 'home' })
})

export default router
