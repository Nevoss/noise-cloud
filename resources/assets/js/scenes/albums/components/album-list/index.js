import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSongFilesAlbums} from "../../../../services/selectors/song-files/index";

class AlbumList extends Component {

    renderAlbums() {
        return _.map(this.props.albums, album => {
            return (
                <div className="mr-8 text-center" key={album.id}>
                    <div>
                        <img src={_.get(album, 'image')} alt={album.name} className="w-24 h-24"/>
                    </div>
                    <span className="text-sm">
                        { album.name }
                    </span>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="w-full mx-auto bg-white shadow p-6 flex">
                {this.renderAlbums()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        albums: getSongFilesAlbums(state)
    }
}

export default connect(mapStateToProps)(AlbumList)