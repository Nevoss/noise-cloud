import _ from 'lodash'
import { createSelector } from 'reselect'

const getSongFilesList = state => state.songFiles.list
const getSongFilesOrder = state => state.songFiles.order
const getSongFilesFilters = state => state.songFiles.filters
const getPlayingSongFileId = state => state.player.playingSongId

export const getMusicList = createSelector(
    [getSongFilesList, getSongFilesOrder, getSongFilesFilters],
    (list, order, filters) => {

        if (filters.albumId) {
            list = _.filter(list, (songFile) => {
                return _.get(songFile, 'song.album.id') === filters.albumId
            })
        }

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
                albums[item.song.album.id].artist = item.song.artist
            }
        })

        return albums
    }
)

export const getChosenAlbum = createSelector(
    [ getSongFilesAlbums, getSongFilesFilters ],
    (albums, filter) => {

        if (!filter.albumId) {
            return null
        }

        return _.find(albums, album => album.id === filter.albumId )
    }
)