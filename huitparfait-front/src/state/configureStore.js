import Vue from 'vue'
import Revue from 'revue'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'
import reducer from './reducers/index'

import * as userActions from './actions/user'
import * as groupsActions from './actions/groups'
import * as predictionsActions from './actions/predictions'
import * as rankingActions from './actions/ranking'
import * as submenuActions from './actions/submenu'

const actions = {
    userActions,
    groupsActions,
    rankingActions,
    predictionsActions,
    submenuActions,
}

const reduxStore = createStore(reducer, compose(
    applyMiddleware(invariant(), thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

const store = new Revue(Vue, reduxStore, actions)

export default store
