import React, { Component } from 'react'
import { connect } from 'react-redux'

class SongFilesList extends Component {
    render() {
        return (
            <div className="w-3/4 mx-auto bg-white shadow p-6">
                <table>
                    <tr>

                    </tr>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songFiles.list
    }
}

export default connect(mapStateToProps)(SongFilesList)