import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Artists extends Component {

    render() {
        return (
            <div>
                <Link to="/music"> To Music </Link>
                From artists
            </div>
        )
    }

}

export default Artists