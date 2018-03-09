import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutAction } from "../../services/actions/auth/index"
import Navbar from './components/navbar'
import Sidebar from './components/sidbar'
import UploadingProcess from './components/uploading-process'

class PlayerLayout extends Component {

    render() {
        return (
            <div>
                <Navbar user={this.props.user} logoutAction={this.props.logoutAction} />
                <Sidebar />
                <div className="mainContainer container mx-auto">
                    <div className="mt-8">
                        { this.props.children }
                    </div>
                </div>
                <UploadingProcess />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { logoutAction })(PlayerLayout)
