import React from 'react'

export default props => {
    return (
        <div className="flex">
            <div className="w-3/5 h-screen bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("/images/backgrounds/auth-bg.png")' }}>
            </div>
            <div className="px-4 w-2/5 h-screen flex items-center justify-center border-l border-grey-lighter flex-col">
                <div style={{ width: 200 }} className="mb-6">
                    <img src="/images/logo.svg" alt="logo"/>
                </div>
                {props.children}
            </div>
        </div>
    )
}