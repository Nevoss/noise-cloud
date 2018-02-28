import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllFiles, getUploadingFileData } from "../../../../services/selectors/songs-uploader/index"
import { showProcessBox } from "../../../../services/actions/songs-uploader/index";
import ListItem from './components/ListItem'

class UploadingProcessComponent extends Component {

    constructor(props) {
        super(props)

        this.renderUploadingFileLeftSide.bind(this)
        this.renderUploadingFileRightSide.bind(this)
        this.renderFileList.bind(this)

        this.state = {
            openDetails: false,
        }
    }

    renderUploadingFileLeftSide() {
        return this.props.uploadingFileId ? (
            <div>
                Uploading:
                <b className="font-semibold inline-block ml-2">
                    {this.props.uploadingFileData ? this.props.uploadingFileData.shortName : '' }
                </b>
            </div>
        ) : (
            <div>
                Nothing to upload.
            </div>
        )
    }

    renderUploadingFileRightSide() {
        return this.props.uploadingFileId ? (
            <i className="fas fa-spinner fa-spin px-2" />
        ) : (
            <button className="btn-link px-2" onClick={() => this.props.showProcessBox(false)}>
                <i className="icon-x text-grey-light text-lg"></i>
            </button>
        )
    }

    renderFileList() {
        return (
            <ul className={"list-reset py-2 overflow-auto " + (this.state.openDetails ? '' : 'hidden')} style={{ maxHeight: 208 }}>
                {
                    _.map(this.props.allFiles, (file) => {
                        return (
                            <ListItem file={file} key={file.id}/>
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
                    <div className="flex items-center justify-between">
                        <span className="flex-1 cursor-pointer" onClick={() => this.setState({ openDetails: ! this.state.openDetails })}>
                            { this.renderUploadingFileLeftSide() }
                        </span>
                        {this.renderUploadingFileRightSide()}
                    </div>
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