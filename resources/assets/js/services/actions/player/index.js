import _ from 'lodash'
import {PLAYER_SET_IS_PLAYING, PLAYER_SET_PLAYING_SONG_FILE, PLAYER_SET_PLAYING_LIST} from "./constansts";

export const setPlayingListAction = list => {
    return {
        type: PLAYER_SET_PLAYING_LIST,
        payload: list
    }
}

export const setPlayingSongFileAction = (songFileId) => {
    return {
        type: PLAYER_SET_PLAYING_SONG_FILE,
        payload: songFileId
    }
}

export const setIsPlayingAction = (isPlaying) => {
    return {
        type: PLAYER_SET_IS_PLAYING,
        payload: !!isPlaying
    }
}

export const playPreviousSongAction = () => {
    return dispatch => {
        dispatch(playNextOrPreviousSongAction(-1))
    }
}

export const playNextSongAction = () => {
    return dispatch => {
        dispatch(playNextOrPreviousSongAction(1))
    }
}

const playNextOrPreviousSongAction = (additionToIndex) => {
    return (dispatch, getState) => {
        const { player: { playingList, playingSongId } } = getState()

        let index = _.indexOf(playingList, playingSongId)

        if (index < 0) {
            return
        }

        let newSongFileId = _.get(playingList, index + additionToIndex, false)

        if (!newSongFileId) {
            return
        }

        dispatch(setPlayingSongFileAction(newSongFileId))
    }
}

export const playSongFromListAction = (songFileId) => {
    return (dispatch, getState) => {

        const { songFiles: { currentIdList } } = getState()

        dispatch(setPlayingListAction(currentIdList))
        dispatch(setPlayingSongFileAction(songFileId))

    }
}