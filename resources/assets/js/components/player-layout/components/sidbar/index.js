import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UploaderComponent from './components/UploaderComponent'

class Sidebar extends Component {

    render() {
        return (
            <nav className="fixed pin-l py-4 flex justify-between flex-col sidebar" style={{ top: 65, width: 270 }}>
                <ul className="list-reset px-2">
                    <li>
                        <span className="font-light font-serif tracking-wide uppercase pt-8 pb-2 px-4 block text-xs font-semibold"> Library </span>
                        <ul className="list-reset">
                            <li>
                                <Link className="block flex items-center py-4 px-8 mb-1 hover:bg-grey-lighter rounded" to="/music">

                                    <i className="icon-headphones text-grey mr-2 text-lg" style={{width: 20}}></i>
                                    <span className=""> Music </span>
                                </Link>
                            </li>
                            <li>
                                <Link className="block flex items-center py-4 px-8 mb-1 hover:bg-grey-lighter rounded" to="/artists">
                                    <i className="icon-mic text-grey mr-2 text-lg" style={{width: 20}}></i>
                                    <span className=""> Artists </span>
                                </Link>
                            </li>
                            <li>
                                <Link className="block flex items-center py-4 px-8 mb-1 hover:bg-grey-lighter rounded" to="/albums">
                                    <i className="icon-music text-grey mr-2 text-lg" style={{width: 20}}></i>
                                    <span className=""> Albums </span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    {/*<li>*/}
                        {/*<span className="font-light font-serif tracking-wide uppercase pt-8 pb-2 px-4 block text-xs font-semibold"> Playlists </span>*/}
                    {/*</li>*/}
                </ul>

                <UploaderComponent />
            </nav>
        )
    }

}

export default Sidebar