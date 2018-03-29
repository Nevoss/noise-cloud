import _ from 'lodash'
import { createSelector } from 'reselect'

const getSongFilesList = state => state.songFiles.list
const getSongFilesOrder = state => state.songFiles.order
const getSongFilesFilters = state => state.songFiles.filters
const getPlayingSongFileId = state => state.player.playingSongId

const fetchAlbumFromSongFile = (item) => {
    if (!item ) {
        return null;
    }

    let album = item.song.album
    album.artist = item.song.artist

    return album
}

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
                albums[item.song.album.id] = fetchAlbumFromSongFile(item)
            }
        })

        return albums
    }
)

export const getChosenAlbum = createSelector(
    [ getSongFilesList, getSongFilesFilters ],
    (list, filter) => {

        if (!filter.albumId) {
            return null
        }

        let album = null

        _.forEach(list, item => {
            if (_.get(item, 'song.album.id') === filter.albumId) {
                album = fetchAlbumFromSongFile(item)
            }
        })

        return album
    }
)