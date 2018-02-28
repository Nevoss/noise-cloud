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

    render() {
        return (
            <li className="p-4 flex items-center justify-between">
                <span>
                    {this.props.file.shortName}
                </span>
                <span>
                    {this.renderFileState()}
                </span>
            </li>
        )
    }
}

export default ListItem