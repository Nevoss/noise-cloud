import React, { Component } from 'react'

class SubmitBtn extends Component{

    static defaultProps = {
        submitting: false
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className={this.props.className} type="submit" disabled={this.props.submitting}>
                {this.props.submitting && <i className="fas fa-spinner fa-spin mr-2" />}
                {this.props.children}
            </button>
        )
    }
}

export default SubmitBtn