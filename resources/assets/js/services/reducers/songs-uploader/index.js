import _ from 'lodash'
import {
    SONGS_UPLOADER_PUSH_TO_QUEUE,
    SONGS_UPLOADER_UPLOAD_DONE,
    SONGS_UPLOADER_UPLOAD_STARTED,
    SONGS_UPLOADER_SHOW_PROCESS_BOX
} from '../../actions/songs-uploader/constants'
import { createReducer } from "../utilities"

/**
 * show or not show process box
 *
 * @param state
 * @param action
 * @returns {{showProcessBox}}
 */
const setShowProcessBox = (state, action) => {
    return {
        ...state,
        showProcessBox: action.payload
    }
}

/**
 * push files to queue
 *
 * @param state
 * @param action
 * @returns {{queue: [null,null]}}
 */
const pushToQueue = (state, action) => {
    const { queue, ...rest } = state;

    return {
        ...rest,
        queue: [ ...queue, ...action.payload ]
    }
}

/**
 * set uploading file
 *
 * @param state
 * @param action
 * @returns {{showProcessBox: boolean, uploading}}
 */
const setUploadingFile = (state, action) => {
    return {
        ...state,
        showProcessBox: true,
        uploading: action.payload.id
    }
}

/**
 * sey uploaded file done
 *
 * @param state
 * @param action
 * @returns {{uploading: null, done: [null,null], queue: [null]}}
 */
const setUploadDone = (state, action) => {

    let { queue, done, ...rest } = state
    let uploadedFile = _.remove(queue, item => item.id === action.payload.id)
    
    return {
        ...rest,
        uploading: null,
        done: [ ...done, ...uploadedFile ],
        queue: [ ...queue ],
    }
}

export default createReducer({
    queue: [],
    done: [],
    uploading: null,
    showProcessBox: false,
}, {
    [SONGS_UPLOADER_PUSH_TO_QUEUE]: pushToQueue,
    [SONGS_UPLOADER_UPLOAD_DONE]: setUploadDone,
    [SONGS_UPLOADER_UPLOAD_STARTED]: setUploadingFile,
    [SONGS_UPLOADER_SHOW_PROCESS_BOX]: setShowProcessBox
});