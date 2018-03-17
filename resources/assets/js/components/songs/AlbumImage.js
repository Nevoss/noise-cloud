import React from 'react'
import _ from 'lodash'

export default ({ songFile, size }) => {

    size = size ? size : 8

    let image = (
        <div className={'bg-grey-light flex items-center justify-center text-white text-md ' + `w-${size} h-${size}`}>
            <i className="icon-music"></i>
        </div>
    )

    if (_.get(songFile, 'song.album.image')) {
        image = <img src={_.get(songFile, 'song.album.image')} alt={_.get(songFile, 'song.album.name', songFile.original_name)}/>
    }

    return (
        <div className={"rounded-full overflow-hidden " + `w-${size} h-${size}`}>
            {image}
        </div>
    )
}