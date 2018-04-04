import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSongFilesAction, setAlbumFilterAction } from "../../services/actions/song-files/index"
import AlbumList from './components/album-list'
import AlbumShowSongs from './components/AlbumShowSongs'
import { getSongFilesAlbums } from "../../services/selectors/song-files/index"

class Albums extends Component {

    componentDidMount() {
        this.props.setAlbumFilterAction(parseInt(_.first(_.keys(this.props.albums))))
    }

    render() {
        if (_.isEmpty(this.props.albums)) {
            return (
                <div className="bg-white shadow p-6">
                    There is no Albums.
                </div>
            )
        } else {
            return (
                <div>
                    <AlbumList />
                    <div>
                        <AlbumShowSongs/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        albums: getSongFilesAlbums(state)
    }
}

export default connect(mapStateToProps, { getSongFilesAction, setAlbumFilterAction })(Albums)