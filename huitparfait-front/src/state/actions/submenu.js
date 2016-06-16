export const SHOW_SUBMENU = 'SHOW_SUBMENU'
export function showSubmenu(submenu) {
    return {
        type: SHOW_SUBMENU,
        submenu,
    }
}

export const HIDE_SUBMENU = 'HIDE_SUBMENU'
export function hideSubmenu() {
    return {
        type: HIDE_SUBMENU,
    }
}
