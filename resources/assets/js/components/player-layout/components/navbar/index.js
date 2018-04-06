import React, { Component } from 'react'
import Player from "./components/player"

class Navbar extends Component {

    constructor(props) {
        super(props)


        this.state = {
            isUserSubMenuShown: false
        }


    }

    toggleSubMenu(event) {
        event.preventDefault()

        this.setState({
            isUserSubMenuShown: !this.state.isUserSubMenuShown
        })
    }

    render() {
        return (
            <nav className="fixed bg-white px-8 pin-x w-full shadow flex justify-between items-center navbar">
                <div className="py-2 w-1/5">
                    <img src="/images/logo.svg" alt="logo" style={{ width: 170 }}/>
                </div>

                <Player/>

                <div className="h-full w-1/5">
                    <ul className="flex w-full list-reset h-full justify-end">
                        <li className="h-full relative">

                            <a
                                href="#"
                                onClick={this.toggleSubMenu.bind(this)}
                                className="h-full flex items-center px-4 hover:bg-grey-lighter cursor-pointer"
                            >
                                <div className="h-8 w-8 bg-grey-light rounded-full overflow-hidden">
                                    <img src={this.props.user.avatars.small} alt=""/>
                                </div>
                                <i className="fas fa-chevron-down ml-3 text-xs"></i>
                            </a>

                            <ul
                                className={'absolute list-reset bg-white py-2 pin-r shadow ' + (this.state.isUserSubMenuShown ? '' : 'hidden')}
                                style={{ top: 75, width: 230 }}
                            >
                                {/*<li className="p-4 px-6 rounded">*/}
                                    {/*<i className="icon-user2 text-grey-light mr-3"></i>*/}
                                    {/*Profile*/}
                                {/*</li>*/}
                                <li className="p-4 px-6 hover:bg-grey-lightest cursor-pointer rounded" onClick={this.props.logoutAction}>
                                    <i className="icon-log-out text-grey-light mr-3"></i>
                                    Logout
                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar