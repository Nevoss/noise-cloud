import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class GuestComponent extends Component {

    render () {
        if (this.props.isAuthenticated) {
            return (
                <Redirect to="/" />
            )
        }

        return this.props.children
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(GuestComponent)