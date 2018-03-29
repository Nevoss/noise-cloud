import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { getSongFilesAction, setAlbumFilterAction } from "../../services/actions/song-files/index"
import AlbumList from './components/album-list'
import AlbumShowSongs from './components/AlbumShowSongs'

class Albums extends Component {

    componentDidMount() {
        // this.props.getSongFilesAction();
    }

    render() {
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

export default connect(null, { getSongFilesAction, setAlbumFilterAction })(Albums)