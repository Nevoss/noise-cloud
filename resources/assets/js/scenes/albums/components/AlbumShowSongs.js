import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMusicList, getChosenAlbum } from "../../../services/selectors/song-files/index"

class AlbumShowSongs extends Component {

    render() {
        console.log(this.props.chosenAlbum);

        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        songFiles: getMusicList(state),
        chosenAlbum: getChosenAlbum(state),
    }
}

export default connect(mapStateToProps)(AlbumShowSongs)
