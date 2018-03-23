import _ from 'lodash'
import { createSelector } from 'reselect'

const getSongFilesList = state => state.songFiles.list
const getSongFilesOrder = state => state.songFiles.order
const getPlayingSongFileId = state => state.player.playingSongId

export const getMusicPageList = createSelector(
    [getSongFilesList, getSongFilesOrder],
    (list, order) => {
        return _.orderBy(list, [order.by], [order.direction]);
    }
)

export const getPlayingSongFile = createSelector(
    [getSongFilesList, getPlayingSongFileId],
    (list, songFileId) => {
        return _.get(list, songFileId, null)
    }
)

export const getSongFilesAlbums = createSelector(
    [ getSongFilesList ],
    (list) => {
        let albums = {};

        _.forEach(list, item => {
            if (_.get(item, 'song.album.id') && !albums[_.get(item, 'song.album.id')]) {
                albums[item.song.album.id] = item.song.album
            }
        })

        return albums
    }
)