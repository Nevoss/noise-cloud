import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {getSongFilesAlbums} from "../../../../services/selectors/song-files/index";
import { setAlbumFilterAction } from "../../../../services/actions/song-files/index"

class AlbumList extends Component {

    renderAlbums() {
        return _.map(this.props.albums, album => {
            return (
                <div className="mr-8" key={album.id}>
                    <div>
                        <span onClick={() => this.props.setAlbumFilterAction(album.id) } className="cursor-pointer">
                            <img src={_.get(album, 'image')} alt={album.name} className="w-32 h-32"/>
                        </span>
                    </div>
                    <span className="text-xs font-semibold block mt-2">
                        { album.name }
                    </span>
                    <span className="text-xs block mt-2 text-grey">
                        { album.artist.name }
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

export default connect(mapStateToProps, { setAlbumFilterAction })(AlbumList)