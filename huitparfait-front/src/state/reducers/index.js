import { combineReducers } from 'redux'
import loaders from './loaders'
import user from './user'
import group from './group'
import groups from './groups'
import groupUsers from './groupUsers'

export default combineReducers({
    loaders,
    user,
    group,
    groups,
    groupUsers,
})