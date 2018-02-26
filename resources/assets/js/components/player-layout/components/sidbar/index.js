import React, { Component } from 'react'
import UploaderComponent from './components/UploaderComponent'

class Sidebar extends Component {

    render() {
        return (
            <nav className="fixed pin-l py-4 flex justify-between flex-col sidebar" style={{ top: 65, width: 270 }}>
                <ul className="list-reset px-2">
                    <li>
                        <span className="font-light font-serif tracking-wide uppercase py-6 px-4 block font-semibold text-sm"> Library </span>
                        <ul className="list-reset">
                            <li>
                                <a className="block flex items-center py-4 px-8 mb-1 hover:bg-grey-lighter rounded" href="#">
                                    <i className="icon-music text-grey-dark mr-2 text-sm" style={{width: 20}}></i>
                                    <span className=""> Music </span>
                                </a>
                            </li>
                            <li>
                                <a className="block flex items-center py-4 px-8 mb-1 hover:bg-grey-lighter rounded" href="#">
                                    <i className="fas fa-microphone text-grey-dark mr-2 text-sm" style={{width: 20}}></i>
                                    <span className=""> Artists </span>
                                </a>
                            </li>
                            <li>
                                <a className="block flex items-center py-4 px-8 mb-1 hover:bg-grey-lighter rounded" href="#">
                                    <i className="fas fa-music text-grey-dark mr-2 text-sm" style={{width: 20}}></i>
                                    <span className=""> Albums </span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span className="font-light font-serif tracking-wide uppercase py-6 px-4 block font-semibold text-sm"> Playlists </span>
                    </li>
                </ul>

                <UploaderComponent />
            </nav>
        )
    }

}

export default Sidebar