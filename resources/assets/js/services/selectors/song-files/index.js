import _ from 'lodash'
import { createSelector } from 'reselect'

const getSongFilesList = state => state.songFiles.list
const getSongFilesOrder = state => state.songFiles.order
const getPlayingSongFileId = state => state.songFiles.playingSongId

export const getOrderedList = createSelector(
    [getSongFilesList, getSongFilesOrder],
    (list, order) => {
        return _.orderBy(list, [order.by], [order.direction]);
    }
)

export const getPlayingSongFile = createSelector(
    [getSongFilesList, getPlayingSongFileId],
    (list, songFileId) => {
        return list[songFileId]
    }
)