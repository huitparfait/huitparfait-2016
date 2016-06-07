import Vue from 'vue'
import Revue from 'revue'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import invariant from 'redux-immutable-state-invariant'
import reducer from './reducers/index'
import * as userActions from './actions/user'
import * as groupsActions from './actions/groups'

const actions = {
    userActions,
    groupsActions,
}

const reduxStore = createStore(reducer, compose(
    applyMiddleware(invariant(), thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
))

const store = new Revue(Vue, reduxStore, actions)

export default store
