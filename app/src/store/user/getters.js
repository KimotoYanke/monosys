export function isLogined (state) {
    if (state.username.length === 0) {
        return false
    } else {
        return true
    }
}
