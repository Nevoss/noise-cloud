import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSongFilesAction, resetFilterAction } from "../../services/actions/song-files/index"
import SongFilesList from '../../components/songs/song-files-list'

class Music extends Component {

    componentWillMount() {
        this.props.getSongFilesAction();
    }

    componentDidMount() {
        this.props.resetFilterAction();
    }

    render() {
        return (
            <div className="mb-6">
                <div className="w-full mx-auto bg-white shadow p-6">
                    <SongFilesList />
                </div>
            </div>
        )
    }

}

export default connect(null, { getSongFilesAction, resetFilterAction })(Music)