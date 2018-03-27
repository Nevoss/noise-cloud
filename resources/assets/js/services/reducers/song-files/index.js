import {createReducer} from "../utilities"
import { SONG_FILES_SET_LIST, SONG_FILES_CHANGE_ORDER, SONG_FILES_SET_CURRENT_ID_LIST, SONG_FILES_FILTER_BY } from "../../actions/song-files/constansts"

const initFilters = {
    albumId: null,
    artistId: null,
    playlistId: null,
}

const initOrder = {
    by: 'song.artist.name',
    direction: 'asc',
}

const setSongFiles = (state, action) => {
    return {
        ...state,
        list: {
            ...state.list,
            ...action.payload
        }
    }
}

const changeListOrder = (state, action) => {
    return {
        ...state,
        order: action.payload
    }
}

const setCurrentIdList = (state, action) => {
    return {
        ...state,
        currentIdList: action.payload
    }
}

const setFilterBy = (state, action) => {
    return {
        ...state,
        order: {
            ...initOrder
        },
        filters: {
            ...initFilters,
            ...action.payload,
        }
    }
}

export default createReducer({
    list: {},
    filters: {
        ...initFilters
    },
    order: {
        ...initOrder
    },
    currentIdList: [],
}, {
    [SONG_FILES_SET_LIST]: setSongFiles,
    [SONG_FILES_CHANGE_ORDER]: changeListOrder,
    [SONG_FILES_SET_CURRENT_ID_LIST]: setCurrentIdList,
    [SONG_FILES_FILTER_BY]: setFilterBy
})