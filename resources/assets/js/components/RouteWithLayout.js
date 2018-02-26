import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Route } from "react-router-dom"

class RouteWithLayout extends Component {

    static defaultProps = {
        mustAuth: false,
        mustGuest: false
    }

    render() {
        const { component: TheComponent, mustAuth, mustGuest, layout: Layout, ...rest } = this.props

        if (mustAuth && !this.props.isAuthenticated) {
            return <Redirect to="/login"/>
        }

        if (mustGuest && this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

        return (
            <Route {...rest} render={props => (
                <Layout>
                    <TheComponent {...props} />
                </Layout>
            )} />
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(RouteWithLayout)
