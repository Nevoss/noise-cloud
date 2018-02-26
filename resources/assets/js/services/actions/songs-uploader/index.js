import { SONGS_UPLOADER_PUSH_TO_QUEUE, SONGS_UPLOADER_UPLOAD_DONE, SONGS_UPLOADER_UPLOAD_STARTED, SONGS_UPLOADER_SHOW_PROCESS_BOX } from './constants'
import { mapUploadingFiles } from "./utilities"

/**
 * adding id to files and push the the queue
 *
 * @param data
 * @returns {{type, payload}}
 */
export const pushToQueueAction = data => {
    return {
        type: SONGS_UPLOADER_PUSH_TO_QUEUE,
        payload: mapUploadingFiles(data)
    }
}

/**
 * File upload succeeded
 *
 * @param uploadFileId
 * @returns {{type, payload: *}}
 */
export const uploadDoneAction = uploadFileId => {
    return {
        type: SONGS_UPLOADER_UPLOAD_DONE,
        payload: uploadFileId
    }
}

/**
 * File upload started
 *
 * @param uploadFileId
 * @returns {{type, payload: *}}
 */
export const uploadStartedAction = uploadFileId => {
    return {
        type: SONGS_UPLOADER_UPLOAD_STARTED,
        payload: uploadFileId
    }
}

/**
 * show or hide the process box
 *
 * @param open
 * @returns {{type, payload: *}}
 */
export const showProcessBox = open => {
    return {
        type: SONGS_UPLOADER_SHOW_PROCESS_BOX,
        payload: open
    }
}

/**
 * upload all the files recursively
 *
 * @returns {function(*, *)}
 */
export const recursiveUploaderAction = () => {
    return (dispatch, getState) => {
        const { songsUploader: { queue } } = getState()

        if (queue.length <= 0) {
            return
        }

        let fileToUpload =  _.head(queue)
        dispatch(uploadStartedAction(fileToUpload))

        setTimeout(() => {
            dispatch(uploadDoneAction(fileToUpload))
            dispatch(recursiveUploaderAction())
        }, 5000)
    }
}

/**
 * upload songs action
 *
 * @param data
 * @returns {function(*)}
 */
export const uploadSongsAction = data => {
    return dispatch => {
        dispatch(pushToQueueAction(data))
        dispatch(recursiveUploaderAction())
    }
}