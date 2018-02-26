import _ from 'lodash'
import { SubmissionError } from 'redux-form';

/**
 * create reducers
 *
 * @param initialState
 * @param handlers
 * @returns {reducer}
 */
export const createReducer = (initialState, handlers) => {
    return function reducer(state = initialState, action) {

        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        }

        return state

    }
}

/**
 * Throw validations error if needed
 *
 * @param status
 * @param data
 */
export const throwErrors = (status, data) => {
    if (status === 422 && data.errors) {
        throw new SubmissionError(_.mapValues(data.errors, (errors) => {
            if (_.isArray(errors)) {
                return errors[0]
            }

            return errors;
        }))
    }

    throw new SubmissionError({
        _error: 'Something went wrong, please try again later.'
    })


}