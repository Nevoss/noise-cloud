import _ from 'lodash'
import { createSelector } from 'reselect'
import { fetchArtistFromSongFile, fetchAlbumFromSongFile } from "./utilities";

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

        if (filters.artistId) {
            list = _.filter(list, (songFile) => {
                return _.get(songFile, 'song.artist.id') === filters.artistId
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

export const fetchArtistFromSongFiles = createSelector(
    [ getSongFilesList],
    list => {
        let artists = {};

        _.forEach(list, item => {

            if (_.get(item, 'song.artist.id') && !artists[_.get(item, 'song.artist.id')]) {
                artists[item.song.artist.id] = fetchArtistFromSongFile(item)
            }
        })

        return artists
    }
)

export const getChosenArtist = createSelector(
    [ fetchArtistFromSongFiles, getSongFilesFilters ],
    (artistList, filters) => {
        if (_.get(artistList, filters.artistId)) {
            return artistList[filters.artistId]
        }

        return null
    }
)