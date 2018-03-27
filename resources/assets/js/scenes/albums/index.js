import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { getSongFilesAction, setAlbumFilterAction } from "../../services/actions/song-files/index"
import AlbumList from './components/album-list'
import AlbumShowSongs from './components/AlbumShowSongs'

class Albums extends Component {

    componentWillMount() {
        this.props.getSongFilesAction();
    }

    componentDidMount() {

        let albumId = this.props.match.params.id

        if (albumId) {
            this.props.setAlbumFilterAction(albumId)
        }
    }

    render() {
        return (
            <div>
                <AlbumList />
                <div>
                    <Route path="/albums/:id" component={AlbumShowSongs} />
                </div>
            </div>
        )
    }
}

export default connect(null, { getSongFilesAction, setAlbumFilterAction })(Albums)