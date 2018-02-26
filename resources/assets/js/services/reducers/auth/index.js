import { createReducer } from "../utilities"
import { AUTH_SET_TOKEN, AUTH_DISCARD_TOKEN, AUTH_SET_USER, AUTH_SET_IS_AUTHENTICATED} from '../../actions/auth/constants'

const setToken = (state, action) => {
    return {
        ...state,
        token: action.payload
    }
}

const discardToken = () => {
    return {
        token: null,
        user: null,
        isAuthenticated: false
    }
}

const setUser = (state, action) => {
    return {
        ...state,
        user: action.payload,
        isAuthenticated: true
    }
}

const setIsAuthenticated = (state, action) => {
    return {
        ...state,
        isAuthenticated: action.payload
    }
}

export default createReducer({
    token: null,
    user: null,
    isAuthenticated: null,
}, {
    [AUTH_SET_TOKEN]: setToken,
    [AUTH_DISCARD_TOKEN]: discardToken,
    [AUTH_SET_USER]: setUser,
    [AUTH_SET_IS_AUTHENTICATED]: setIsAuthenticated
})