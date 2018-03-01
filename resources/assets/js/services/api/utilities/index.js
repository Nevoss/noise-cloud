
export const setToken = token => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
}