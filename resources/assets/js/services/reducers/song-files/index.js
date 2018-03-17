import {createReducer} from "../utilities"
import { SONG_FILES_SET_LIST, SONG_FILES_CHANGE_ORDER, SONG_FILES_SET_CURRENT_ID_LIST } from "../../actions/song-files/constansts"

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

export default createReducer({
    list: {},
    filters: {},
    order: {
        by: 'song.artist.name',
        direction: 'asc',
    },
    currentIdList: [],
}, {
    [SONG_FILES_SET_LIST]: setSongFiles,
    [SONG_FILES_CHANGE_ORDER]: changeListOrder,
    [SONG_FILES_SET_CURRENT_ID_LIST]: setCurrentIdList
})