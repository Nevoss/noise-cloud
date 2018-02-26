import axios from 'axios';

// Register
const register = (params) => {
    return axios.post(window.route('auth.register'), params)
}

// Login
const login = (params) => {
    return axios.post(window.route('auth.login'), params)
}

// logout
const logout = (token) => {
    return axios.get(window.route('auth.logout'), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// me
const me = (token) => {
    return axios.get(window.route('auth.me'), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default {
    login, register, me, logout
}