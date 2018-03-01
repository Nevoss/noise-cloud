import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListItem extends Component {

    static propTypes = {
        file: PropTypes.object
    }

    renderFileState() {
        if (!this.props.file.uploaded) {
            return (
                <span className="text-grey flex items-center">
                    <i className="icon-clock2 text-grey-light mr-2"></i> Waiting
                </span>
            )
        }

        if (this.props.file.error) {
            return (
                <span className="text-red-light flex items-center">
                    <i className="icon-x mr-2"></i> Failed
                </span>
            )
        } else {
            return (
                <span className="text-green-light flex items-center">
                    <i className="icon-check mr-2"></i> Success
                </span>
            )
        }
    }

    renderError() {
        if (!this.props.file.error) {
             return null
        }

        return (
            <div className="absolute pin w-full h-full bg-white text-xs text-red-light flex items-center px-4 trans-fast invisible opacity-0 group-hover:opacity-100 group-hover:visible">
                * {this.props.file.error}
            </div>
        )
    }

    render() {
        return (
            <li className="group p-4 flex items-center justify-between relative">
                <span>
                    {this.props.file.shortName}
                </span>
                <span>
                    {this.renderFileState()}
                </span>
                {this.renderError()}
            </li>
        )
    }
}

export default ListItem