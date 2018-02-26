import React, { Component } from 'react'

class BasicField extends Component{

    static defaultProps = {
        type: 'text',
        placeholder: '',
        label: ''
    }

    constructor(props) {
        super(props)
    }

    renderErrors(meta) {
        if (!meta.error) {
            return null;
        }

        return (
            <div className="text-xs text-red-light"> * {meta.error} </div>
        )
    }

    render() {
        return (
            <div className="mb-6">
                <div className="flex justify-between">
                    <label className="form-label"> {this.props.label} </label>
                    {this.renderErrors(this.props.meta)}
                </div>
                <input
                    type={this.props.type}
                    className="form-control"
                    placeholder={this.props.placeholder}
                    { ...this.props.input }
                />
            </div>
        )
    }
}

export default BasicField