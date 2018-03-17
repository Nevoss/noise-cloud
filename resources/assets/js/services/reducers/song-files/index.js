import {createReducer} from "../utilities"
import { SONG_FILES_SET_LIST, SONG_FILES_CHANGE_ORDER, SONG_FILES_SET_PLAYING_SONG_FILE, SONG_FILES_SET_IS_PLAYING } from "../../actions/song-files/constansts"

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

const setPlayingSongFile = (state, action) => {
    return {
        ...state,
        playingSongId: action.payload,
        isPlaying: true,
    }
}

const setIsPlaying = (state, action) => {
    return {
        ...state,
        isPlaying: action.payload
    }
}

export default createReducer({
    list: {},
    filters: {},
    order: {
        by: 'song.artist.name',
        direction: 'asc',
    },
    playingSongId: null,
    isPlaying: false,
}, {
    [SONG_FILES_SET_LIST]: setSongFiles,
    [SONG_FILES_CHANGE_ORDER]: changeListOrder,
    [SONG_FILES_SET_PLAYING_SONG_FILE]: setPlayingSongFile,
    [SONG_FILES_SET_IS_PLAYING]: setIsPlaying
})