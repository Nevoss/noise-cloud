import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArtistFromSongFiles } from "../../../../services/selectors/song-files/index"
import { setArtistFilterAction } from "../../../../services/actions/song-files/index"

class ArtistList extends Component {

    renderImage(artist) {
        if (artist.image) {
            return <img src={_.get(artist, 'image')} alt={artist.name} className="w-32 h-32"/>
        }

        return (
            <div className="bg-grey-light w-full h-full"></div>
        )
    }

    render() {
        return (
            <div className="w-full bg-white shadow p-6">
                {
                    _.map(this.props.artists, artist => {
                        return (
                            <div className="flex mb-4 cursor-pointer" key={artist.id} onClick={() => this.props.setArtistFilterAction(artist.id)}>
                                <span className="mr-4">
                                    <div className="w-32 h-32">
                                        { this.renderImage(artist) }
                                    </div>
                                </span>
                                <div className="pt-2">
                                    <span className="text-sm font-semibold"> { artist.name } </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        artists: fetchArtistFromSongFiles(state)
    }
}

export default connect(mapStateToProps, { setArtistFilterAction })(ArtistList)