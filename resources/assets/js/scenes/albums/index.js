import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSongFilesAction } from "../../services/actions/song-files/index"
import AlbumList from './components/album-list'

class Albums extends Component {

    componentWillMount() {
        this.props.getSongFilesAction();
    }

    render() {
        return (
            <div>
                <AlbumList />
            </div>
        )
    }
}

export default connect(null, { getSongFilesAction })(Albums)