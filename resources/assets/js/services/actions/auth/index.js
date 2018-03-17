import localForage from 'localforage'
import api from '../../api'
import { throwErrors } from "../../reducers/utilities"
import { AUTH_SET_TOKEN, AUTH_DISCARD_TOKEN, AUTH_SET_USER, AUTH_SET_IS_AUTHENTICATED, AUTH_TOKEN_NAME } from './constants'

/**
 *
 * @param data
 * @returns {{type, payload: *}}
 */
export const setUserAction = data => {
    return {
        type: AUTH_SET_USER,
        payload: data
    }
}

/**
 *
 * @param data
 * @returns {{type, payload: *}}
 */
export const setTokenAction = data => {
    return {
        type: AUTH_SET_TOKEN,
        payload: data
    }
}

/**
 *
 * @returns {{type}}
 */
export const discardTokenAction = () => {

    localForage.removeItem(AUTH_TOKEN_NAME)

    return {
        type: AUTH_DISCARD_TOKEN
    }
}

/**
 *
 * @param isAuth
 * @returns {{type, payload: *}}
 */
export const setIsAuthenticatedAction = (isAuth) => {
    return {
        type: AUTH_SET_IS_AUTHENTICATED,
        payload: isAuth
    }
}

/**
 *
 * @param token
 * @returns {function()}
 */
export const storeTokenAction = token => {
    return () => {
        localForage.setItem(AUTH_TOKEN_NAME, token)
    }
}

/**
 *
 * @param token
 * @returns {function(*)}
 */
export const meAction = token => {
    return dispatch => {
        return api.auth.me(token)
            .then(({ data }) => {
                dispatch(setTokenAction(token))
                dispatch(setUserAction(data.data))
            }).catch(() => {
                dispatch(discardTokenAction())
            })
    }
}

/**
 *
 * @returns {function(*, *)}
 */
export const logoutAction = () => {
    return (dispatch, getState) => {

        const { auth } = getState()

        api.auth.logout(auth.token)

        dispatch(discardTokenAction())
    }
}

/**
 *
 * @param data
 * @returns {function(*)}
 */
export const loginAction = data => {
    return (dispatch) => {
        return api.auth.login(data)
            .then(({ data }) => {
                dispatch(setTokenAction(data.meta.token))
                dispatch(setUserAction(data.data))
                dispatch(storeTokenAction(data.meta.token))

                return Promise.resolve()
            }).catch(({ response: { status, data } }) => {
                throwErrors(status, data)

                return Promise.reject()
            })
    }
}

/**
 *
 * @param data
 * @returns {function(*)}
 */
export const registerAction = data => {
    return (dispatch) => {
        return api.auth.register(data)
            .then(({ data }) => {
                dispatch(storeTokenAction(data.meta.token))
                dispatch(setUserAction(data.data))
                dispatch(setTokenAction(data.meta.token))

                return Promise.resolve()
            })
            .catch(({ response: { status, data } }) => {
                throwErrors(status, data)

                return Promise.reject()
            })
    }
}