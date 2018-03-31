export const fetchAlbumFromSongFile = (item) => {
    if (!item ) {
        return null
    }

    let album = item.song.album
    album.artist = item.song.artist

    return album
}

export const fetchArtistFromSongFile = item => {
    if (!item) {
        return null
    }

    let artist = item.song.artist

    return artist
}

