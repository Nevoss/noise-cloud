import {createReducer} from "../utilities";
import {PLAYER_SET_IS_PLAYING, PLAYER_SET_PLAYING_SONG_FILE, PLAYER_SET_PLAYING_LIST} from "../../actions/player/constansts";

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

const setPlayingList = (state, action) => {
    return {
        ...state,
        playingList: action.payload
    }
}

export default createReducer({
    playingSongId: null,
    isPlaying: false,
    playingList: [],
}, {
    [PLAYER_SET_PLAYING_SONG_FILE]: setPlayingSongFile,
    [PLAYER_SET_IS_PLAYING]: setIsPlaying,
    [PLAYER_SET_PLAYING_LIST]: setPlayingList
})