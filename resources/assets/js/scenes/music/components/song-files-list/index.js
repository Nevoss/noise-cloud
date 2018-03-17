import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOrderedList } from '../../../../services/selectors/song-files'
import { changeOrderAction } from "../../../../services/actions/song-files/index";
import SongFileItem from './components/SongFileItem'

class SongFilesList extends Component {

    changeOrder(path) {
        let direction = (path === this.props.order.by && this.props.order.direction === 'asc') ? 'desc' : 'asc'

        this.props.changeOrderAction(path, direction)
    }

    renderFile(songFile) {
        return (
            <SongFileItem songFile={songFile} key={songFile.id} />
        )
    }

    renderOrderArrows(path) {
        if (this.props.order.by !== path) {
            return
        }

        return (
            <span className="text-grey-light ml-2">
            {
                this.props.order.direction === 'asc' ? (
                    <i className="fas fa-sort-up"></i>
                ) : (
                    <i className="fas fa-sort-down"></i>
                )
            }
            </span>
        )
    }

    render() {
        return (
            <div className="w-full mx-auto bg-white shadow p-6">
                <table className="table striped">
                    <thead>
                        <tr>
                            <th>  </th>
                            <th>
                                <span onClick={() => this.changeOrder('original_name')} className="cursor-pointer">
                                    File Name
                                </span>
                                {this.renderOrderArrows('original_name')}
                            </th>
                            <th>
                                <span onClick={() => this.changeOrder('song.name')} className="cursor-pointer">
                                    Song
                                </span>
                                {this.renderOrderArrows('song.name')}
                            </th>
                            <th>
                                <span onClick={() => this.changeOrder('song.artist.name')} className="cursor-pointer">
                                    Artist
                                </span>
                                {this.renderOrderArrows('song.artist.name')}
                            </th>
                            <th>
                                <span onClick={() => this.changeOrder('song.album.name')} className="cursor-pointer">
                                    Album
                                </span>
                                {this.renderOrderArrows('song.album.name')}
                            </th>
                            <th>  </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(this.props.songFiles, songFile => {
                                return this.renderFile(songFile)
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        songFiles: getOrderedList(state),
        order: state.songFiles.order,
    }
}

export default connect(mapStateToProps, { changeOrderAction })(SongFilesList)