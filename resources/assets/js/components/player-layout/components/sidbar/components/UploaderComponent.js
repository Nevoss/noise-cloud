import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { uploadSongsAction } from '../../../../../services/actions/songs-uploader'


class UploaderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            error: null
        }
    }

    onDrop(acceptedFiles) {

        this.setState({
            error: null
        })

        this.props.uploadSongsAction(acceptedFiles)
    }

    onDropRejected() {
        let error = (
            <span>
                Please make sure that all the files are audio files.
            </span>
        )

        this.setState({
            error
        })

        setTimeout(() => this.setState({ error: null }), 11000)
    }

    renderError() {
        return (
            <span className={'text-xs text-red-light block mb-2 w-full break-words trans text-center ' + (this.state.error ? 'opacity-100' : 'opacity-0') }>
                <span className="mr-1"> * </span>
                {this.state.error}
            </span>
        )
    }

    render() {
        return (
            <div className="p-4 pb-0">
                {this.renderError()}
                <Dropzone
                    multiple={true}
                    accept="audio/*"
                    style={{ width: '100%', height: 100 }}
                    onDropRejected={this.onDropRejected.bind(this)}
                    onDrop={this.onDrop.bind(this)}
                >
                    <span
                        className="
                            h-full w-full block flex items-center justify-center flex-col border border-dashed border-grey-light text-grey-darker text-sm uppercase cursor-pointer rounded trans hover:bg-white
                        ">
                        Upload a Song.
                        <i className="icon-upload-cloud block text-lg mt-2 text-grey"></i>
                    </span>
                </Dropzone>
            </div>
        )
    }

}

export default connect(null, { uploadSongsAction })(UploaderComponent)