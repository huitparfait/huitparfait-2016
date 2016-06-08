import { combineReducers } from 'redux'
import loaders from './loaders'
import user from './user'
import group from './group'
import groups from './groups'
import groupUsers from './groupUsers'
import groupRanking from './groupRanking'
import ranking from './ranking'

export default combineReducers({
    loaders,
    user,
    group,
    groups,
    groupUsers,
    groupRanking,
    ranking,
})
