import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMusicList, getChosenAlbum } from "../../../services/selectors/song-files/index"
import { setAlbumFilterAction } from "../../../services/actions/song-files/index"
import SongFilesLists from '../../../components/songs/song-files-list'

class AlbumShowSongs extends Component {

    render() {
        if (this.props.chosenAlbum) {
            return (
                <div className="mt-4 flex w-full mx-auto bg-white shadow p-6">
                    <div className="w-1/5 mx-2 flex justify-center text-sm">
                        <div className="mt-4">
                            <img src={this.props.chosenAlbum.image} className="max-w-full"/>
                            <div>
                                <strong className="block mt-2 font-semibold">
                                    { this.props.chosenAlbum.name }
                                </strong>
                                <p className="block mt-2">
                                    { this.props.chosenAlbum.artist.name }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/5 mx-2">
                        <SongFilesLists />
                    </div>
                </div>
            )
        }

        return (
            <div className="flex w-full mx-auto bg-white shadow p-6 text-center mt-4">
                Choose an Album.
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

export default connect(mapStateToProps, { setAlbumFilterAction })(AlbumShowSongs)
