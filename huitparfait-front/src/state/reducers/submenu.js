import {
    SHOW_SUBMENU,
    HIDE_SUBMENU,
} from '../actions/submenu'

const initialState = false

export default function (state = initialState, action) {

    switch (action.type) {

        case SHOW_SUBMENU:
            return {
                [action.submenu]: true,
            }

        case HIDE_SUBMENU:
            return false

        default:
            return state
    }
}
