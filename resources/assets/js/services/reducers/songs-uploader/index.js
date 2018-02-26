import _ from 'lodash'
import {
    SONGS_UPLOADER_PUSH_TO_QUEUE,
    SONGS_UPLOADER_UPLOAD_DONE,
    SONGS_UPLOADER_UPLOAD_STARTED,
    SONGS_UPLOADER_SHOW_PROCESS_BOX
} from '../../actions/songs-uploader/constants'
import { createReducer } from "../utilities"

const setShowProcessBox = (state, action) => {
    return {
        ...state,
        showProcessBox: action.payload
    }
}

const pushToQueue = (state, action) => {
    const { queue, ...rest } = state;

    return {
        ...rest,
        queue: [ ...queue, ...action.payload ]
    }
}

const setUploadingFile = (state, action) => {
    return {
        ...state,
        showProcessBox: true,
        uploading: action.payload.id
    }
}

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