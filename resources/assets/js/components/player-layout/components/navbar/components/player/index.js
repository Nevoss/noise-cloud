import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setIsPlayingAction } from "../../../../../../services/actions/song-files/index"
import { getPlayingSongFile } from "../../../../../../services/selectors/song-files/index"
import ReactPlayer from 'react-player'

class Player extends Component {

    constructor(props) {
        super(props)

        this.state = {
            totalTime: '00:00',
            progress: {
                loaded: 0,
                played: 0,
                playedSeconds: 0
            }
        }
    }

    pad(num) {
        return ('0' + num).slice(-2);
    }

    transformSecsToMins(secs) {
        secs = Math.floor(secs)
        return `${this.pad(Math.floor(secs / 60))}:${this.pad(secs % 60)}`
    }

    render() {
        return (
            <div className="h-full">
                <ReactPlayer
                    url={_.get(this.props.playingSongFile, 'public_path')}
                    onProgress={(progress) => {
                        this.setState({
                            progress
                        })
                    }}
                    onDuration={(duration) => {
                        this.setState({
                            totalTime: this.transformSecsToMins(duration)
                        })
                    }}
                    playing={this.props.isPlaying}
                    width={0}
                    height={0}
                    config={{
                        file: {
                            forceAudio: true
                        }
                    }}
                />

                <div className="flex h-full">
                    <div className="text-xs text-center relative h-full">
                    <span className="block mt-2">
                        <span> { _.get(this.props.playingSongFile, 'song.name') } - </span>
                        <span className="italic"> { _.get(this.props.playingSongFile, 'song.artist.name') } </span>
                        <span className="font-bold mx-2" > | </span>
                        <span> {this.transformSecsToMins(this.state.progress.playedSeconds)} / {this.state.totalTime} </span>
                    </span>
                        <div className="mt-3">
                            <div style={{ width: 400 }} className="h-1 bg-grey-lighter">
                                <div className="h-1 bg-grey-light" style={{ width: 400 * this.state.progress.loaded }}>
                                    <div style={{ width: 400 * this.state.progress.played  }} className="h-1 bg-red-lighter"></div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute p  in-b flex items-center justify-center w-full mt-8 text-normal" style={{bottom: -20}}>
                            <button className="mb-6 text-grey mr-6 hover:text-grey-dark trans-fast">
                                <i className="icon-rewind text-base"></i>
                            </button>
                            <button
                                className="bg-red-lighter text-white rounded-full w-10 h-10 flex items-center justify-center shadow trans hover:bg-red-light text-xl"
                                style={{boxShadow: '2px 2px 14px rgba(0,0,0,0.15)' }}
                                onClick={() => this.props.setIsPlayingAction(!this.props.isPlaying) }
                            >
                                {
                                    this.props.isPlaying ? (
                                        <i className="icon-pause" style={{ marginLeft: 2 }}></i>
                                    ) : (
                                        <i className="icon-play" style={{ marginLeft: 4 }}></i>
                                    )
                                }
                            </button>
                            <button className="mb-6 text-grey ml-6 hover:text-grey-dark trans-fast">
                                <i className="icon-fast-forward text-base"></i>
                            </button>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        playingSongFile: getPlayingSongFile(state),
        isPlaying: state.songFiles.isPlaying
    }
}

export default connect(mapStateToProps, { setIsPlayingAction })(Player)