import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setArtistFilterAction } from "../../services/actions/song-files/index"
import ArtistList from './components/artist-list'
import SongFilesLists from '../../components/songs/song-files-list'
import {fetchArtistFromSongFiles, getChosenArtist} from "../../services/selectors/song-files/index";

class Artists extends Component {

    componentDidMount() {
        this.props.setArtistFilterAction(parseInt(_.first(_.keys(this.props.artists))))
    }

    render() {
        if (_.isEmpty(this.props.artists)) {
            return (
                <div className="bg-white shadow p-6">
                    There is no Artists.
                </div>
            )
        } else {
            return (
                <div className="flex -mx-4">
                    <div className="w-1/4 mx-4">
                        <ArtistList />
                    </div>
                    <div className="w-3/4 mx-4">
                        <div className="bg-white shadow p-6">
                            {
                                this.props.chosenArtist ? (
                                    <SongFilesLists />
                                ) : (
                                    <div>
                                        Choose an Artist.
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        artists: fetchArtistFromSongFiles(state),
        chosenArtist: getChosenArtist(state)
    }
}

export default connect(mapStateToProps, { setArtistFilterAction })(Artists)