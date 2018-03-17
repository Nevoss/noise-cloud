import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPlayingSongFileAction } from "../../../../../services/actions/song-files/index";
import AlbumImage from '../../../../../components/songs/AlbumImage'

class SongFileItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const songFile = this.props.songFile

        return (
            <tr className="group">
                <td>
                    <AlbumImage songFile={songFile} />
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
                                onClick={() => this.props.setPlayingSongFileAction(songFile.id)}
                            ></span>
                            <span className="far fa-trash-alt text-grey-light trans-fast cursor-pointer hover:text-red-lighter"></span>
                        </div>
                    </div>
                </td>
            </tr>
        )
    }
}

export default connect(null, { setPlayingSongFileAction })(SongFileItem)