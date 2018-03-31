import _ from 'lodash'
import api from '../../api'
import { SONG_FILES_SET_LIST, SONG_FILES_CHANGE_ORDER, SONG_FILES_SET_CURRENT_ID_LIST, SONG_FILES_FILTER_BY } from "./constansts"

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

export const setCurrentIdListAction = (currentIdList) => {
    return {
        type: SONG_FILES_SET_CURRENT_ID_LIST,
        payload: currentIdList
    }
}

export const resetFilterAction = () => {
    return {
        type: SONG_FILES_FILTER_BY,
        payload: {}
    }
}

export const setAlbumFilterAction = (albumId) => {
    return {
        type: SONG_FILES_FILTER_BY,
        payload: {
            albumId: albumId
        }
    }
}

export const setArtistFilterAction = (artistId) => {
    return {
        type: SONG_FILES_FILTER_BY,
        payload: {
            artistId: artistId
        }
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