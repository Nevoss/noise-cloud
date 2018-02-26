import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Music extends Component {

    render() {
        return (
            <div>
                <Link to="/artists"> To artists </Link>
                From Music
            </div>
        )
    }

}

export default Music