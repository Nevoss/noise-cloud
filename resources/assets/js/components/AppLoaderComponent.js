import React from 'react'

export default ({ hide }) => {
    return (
        <div className={'trans-slow' + (hide ? ' opacity-0 invisible' : ' opacity-100 ' )}>
            <div className="flex justify-center items-center h-screen w-full flex-col absolute pin bg-grey-lightest" style={{ paddingBottom: 90, zIndex: 9999 }}>
                <div style={{ width: 200 }}>
                    <img src="/images/logo.svg" alt="logo"/>
                </div>
                <div className="loader">
                    <svg className="circular" viewBox="25 25 50 50">
                        <circle className="path" cx="50" cy="50" r="12" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                </div>
                Loading...
            </div>
        </div>
    )
}