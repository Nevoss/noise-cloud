import _ from 'lodash'
import api from '../../api'
import { SONG_FILES_SET_LIST, SONG_FILES_CHANGE_ORDER, SONG_FILES_SET_PLAYING_SONG_FILE, SONG_FILES_SET_IS_PLAYING } from "./constansts"

export const setSongFilesListAction = (list) => {
    return {
        type: SONG_FILES_SET_LIST,
        payload: _.keyBy(list, 'id'),
    }
}

export const changeOrderAction = (by, direction) => {
    return {
        type: SONG_FILES_CHANGE_ORDER,
        payload: {
            by, direction
        }
    }
}

export const setPlayingSongFileAction = (songFileId) => {
    return {
        type: SONG_FILES_SET_PLAYING_SONG_FILE,
        payload: songFileId
    }
}

export const setIsPlayingAction = (isPlaying) => {
    return {
        type: SONG_FILES_SET_IS_PLAYING,
        payload: !!isPlaying
    }
}

export const getSongFilesAction = () => {
    return (dispatch, getState) => {

        const { auth: { token }, songFiles: { filters } } = getState()

        api.songFiles.getAll(filters, token)
            .then(response => {
                dispatch(setSongFilesListAction(response.data.data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}