import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { playSongFromListAction } from "../../../../../services/actions/player/index";
import AlbumImage from '../../../../../components/songs/AlbumImage'

class SongFileItem extends Component {

    constructor(props) {
        super(props)

        this.renderSongImage.bind(this)
    }

    renderSongImage() {
        if (this.props.songFile.id !== this.props.playingSongId) {
            return (
                <AlbumImage songFile={this.props.songFile} />
            )
        }

        return (
            <div className="w-8 h-8 rounded-full bg-red-lighter flex items-center justify-center">
                <span className="icon-volume-2 text-white" style={{paddingLeft: 2}}></span>
            </div>
        )
    }

    render() {
        const songFile = this.props.songFile

        return (
            <tr className="group">
                <td>
                    {this.renderSongImage()}
                </td>
                <td> { songFile.original_name } </td>
                <td> { _.get(songFile, 'song.name') } </td>
                <td> { _.get(songFile, 'song.artist.name') } </td>
                <td> { _.get(songFile, 'song.album.name') } </td>
                <td className="w-32 h-1" style={{ padding: 0 }}>
                    <div className="w-full h-full overflow-hidden">
                        <div className="h-full w-full flex items-center justify-center text-md opacity-0 group-hover:opacity-100 trans-fast">
                            <span
                                className="fas fa-play text-grey mr-6 cursor-pointer trans-fast cursor-pointer hover:text-red-light"
                                onClick={() => this.props.playSongFromListAction(songFile.id)}
                            ></span>
                            <span className="far fa-trash-alt text-grey-light trans-fast cursor-pointer hover:text-red-lighter"></span>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        playingSongId: state.player.playingSongId
    }
}

export default connect(mapStateToProps, { playSongFromListAction })(SongFileItem)