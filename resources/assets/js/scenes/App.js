import React, { Component }from 'react'
import localForage from 'localforage'
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { meAction, setTokenAction, setIsAuthenticatedAction } from "../services/actions/auth"
import { AUTH_TOKEN_NAME } from '../services/actions/auth/constants'
import RouteWithLayout from '../components/RouteWithLayout'
import AuthLayout from './auth/components/auth-layout'
import PlayerLayout from '../components/player-layout'
import AppLoader from '../components/AppLoaderComponent'
import Login from './auth/scenes/login'
import Register from "./auth/scenes/register"
import Home from './home'
import Music from "./music"
import Artists from "./artists"
import Albums from "./albums"

class App extends Component {

    constructor(props) {
        super(props)

        this.checkAuthToken.bind(this)

        this.checkAuthToken()

    }

    checkAuthToken() {

        const waitPromise = new Promise((resolve) => {
            setTimeout(resolve, 0)
        })

        return Promise.all([localForage.getItem(AUTH_TOKEN_NAME), waitPromise])
            .then(values => {
                const token = values[0]

                if (token) {
                    this.props.meAction(token)
                    return
                }

                this.props.setIsAuthenticatedAction(false)
            })
    }

    render() {
        return (
            <div>
                <AppLoader hide={this.props.isAuthenticated !== null} />
                {
                    this.props.isAuthenticated !== null && (
                        <Switch>
                            <RouteWithLayout path="/login" component={Login} layout={AuthLayout} mustGuest={true}/>
                            <RouteWithLayout path="/register" component={Register} layout={AuthLayout} mustGuest={true}/>
                            <RouteWithLayout path="/music" component={Music} layout={PlayerLayout} mustAuth={true}/>
                            <RouteWithLayout path="/artists" component={Artists} layout={PlayerLayout} mustAuth={true}/>
                            <RouteWithLayout path="/albums" component={Albums} layout={PlayerLayout} mustAuth={true}/>
                            <RouteWithLayout exact path="/" component={Home} layout={PlayerLayout} mustAuth={true}/>
                        </Switch>
                    )
                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps, { meAction, setTokenAction, setIsAuthenticatedAction })(App))