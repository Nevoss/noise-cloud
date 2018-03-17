import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setIsPlayingAction, playPreviousSongAction, playNextSongAction } from "../../../../../../services/actions/player/index"
import { getPlayingSongFile } from "../../../../../../services/selectors/song-files/index"
import ReactPlayer from 'react-player'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import AlbumImage from '../../../../../songs/AlbumImage'

class Player extends Component {

    constructor(props) {
        super(props)

        this.state = {
            totalTime: '00:00',
            volume: 0.8,
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
                    volume={this.state.volume}
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
                    <div className="flex justify-center items-center mr-4 w-10">
                        <AlbumImage songFile={this.props.playingSongFile} size={10}/>
                    </div>
                    <div className="text-xs text-center relative h-full">
                        <span className="block mt-2">
                            {
                                this.props.playingSongFile === null ? (
                                    <div>
                                        <strong> No song was chosen </strong>
                                    </div>
                                ) : (
                                    <div>
                                        <span> { _.get(this.props.playingSongFile, 'song.name', this.props.playingSongFile.original_name) } - </span>
                                        <span className="italic"> { _.get(this.props.playingSongFile, 'song.artist.name', 'Unknown') } </span>
                                        <span className="font-bold mx-2" > | </span>
                                        <span> {this.transformSecsToMins(this.state.progress.playedSeconds)} / {this.state.totalTime} </span>
                                    </div>
                                )
                            }
                        </span>
                        <div className="mt-3">
                            <div style={{ width: 400 }} className="h-1 bg-grey-lighter">
                                <div className="h-1 bg-grey-light" style={{ width: 400 * this.state.progress.loaded }}>
                                    <div style={{ width: 400 * this.state.progress.played  }} className="h-1 bg-red-lighter"></div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute p  in-b flex items-center justify-center w-full mt-8 text-normal" style={{bottom: -20}}>
                            <button className="mb-6 text-grey mr-6 hover:text-grey-dark trans-fast" onClick={this.props.playPreviousSongAction}>
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
                            <button className="mb-6 text-grey ml-6 hover:text-grey-dark trans-fast" onClick={this.props.playNextSongAction}>
                                <i className="icon-fast-forward text-base"></i>
                            </button>
                        </div>
                    </div>
                    <div className="ml-4 w-10 py-3">
                        <Slider
                            vertical
                            min={0}
                            max={1}
                            step={0.01}
                            value={this.state.volume}
                            onChange={value => this.setState({ volume: value })}
                            handleStyle={{
                                height: 4,
                                borderRadius: 0,
                                border: 0,
                                background: '#f9acaa',
                                marginBottom: -3,
                            }}
                            railStyle={{ background: '#f1f5f8' }}
                            trackStyle={{ background: '#dae1e7' }}
                        />
                    </div>
                </div>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        playingSongFile: getPlayingSongFile(state),
        isPlaying: state.player.isPlaying
    }
}

export default connect(mapStateToProps, { setIsPlayingAction, playPreviousSongAction, playNextSongAction  })(Player)