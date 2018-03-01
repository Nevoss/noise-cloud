import axios from 'axios';
import { setToken } from "./utilities/index";

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
    return axios.get(window.route('auth.logout'), setToken(token));
}

// me
const me = (token) => {
    return axios.get(window.route('auth.me'), setToken(token))
}

export default {
    login, register, me, logout
}