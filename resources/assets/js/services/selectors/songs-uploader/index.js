import _ from 'lodash'
import { createSelector } from 'reselect'

const getQueueFiles = state => state.songsUploader.queue
const getDoneFiles = state => state.songsUploader.done
const getUploadingFile = state => state.songsUploader.uploading

export const getUploadingFileData = createSelector(
    [getQueueFiles, getUploadingFile],
    (queue, fileId) => {

        if (!fileId) {
            return null
        }

        return _.find(queue, file => file.id === fileId)

    }
)

export const getAllFiles = createSelector(
    [ getQueueFiles, getDoneFiles ],
    (queue, done) => {
        return [
            ...queue, ...done
        ]
    }
)