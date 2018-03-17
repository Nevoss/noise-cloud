import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSongFilesAction } from "../../services/actions/song-files/index"
import SongFilesList from './components/song-files-list'

class Music extends Component {

    componentWillMount() {
        this.props.getSongFilesAction();
    }

    render() {
        return (
            <div className="mb-6">
                <SongFilesList />
            </div>
        )
    }

}

export default connect(null, { getSongFilesAction })(Music)