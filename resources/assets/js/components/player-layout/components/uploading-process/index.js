import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllFiles, getUploadingFileData } from "../../../../services/selectors/songs-uploader/index"
import { showProcessBox } from "../../../../services/actions/songs-uploader/index";

class UploadingProcessComponent extends Component {

    constructor(props) {
        super(props)

        this.renderUploadingFile.bind(this)
        this.renderFileList.bind(this)
    }

    renderUploadingFile() {
        if (this.props.uploadingFileId) {
            return (
                <div className="flex items-center justify-between">
                    <span>
                        Uploading:
                        <b className="font-semibold inline-block ml-2">
                            {this.props.uploadingFileData ? this.props.uploadingFileData.shortName : '' }
                        </b>
                    </span>
                    <i className="fas fa-spinner fa-spin ml-2" />
                </div>
            )
        } else {
            return (
                <div className="flex items-center justify-between">
                    <span>
                        Nothing to upload.
                    </span>
                    <button className="btn-link" onClick={() => this.props.showProcessBox(false)}>
                        X
                    </button>
                </div>
            )
        }
    }

    renderFileList() {
        return (
            <ul className="list-reset py-2">
                {
                    _.map(this.props.allFiles, (file) => {
                        return (
                            <li className="p-4" key={file.id}>
                                {file.shortName}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div
                className={"uploadingProcess fixed pin-b pin-r bg-white shadow mr-4 mb-4 text-sm " + (this.props.showUploadingProcessBox ? 'active' : '')}
                style={{ width: 350 }}
            >
                <div className="p-4">
                    {this.renderUploadingFile()}
                </div>
                {this.renderFileList()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allFiles: getAllFiles(state),
        showUploadingProcessBox: state.songsUploader.showProcessBox,
        uploadingFileData: getUploadingFileData(state),
        uploadingFileId: state.songsUploader.uploading
    }
}

export default connect(mapStateToProps, {
    showProcessBox
})(UploadingProcessComponent)