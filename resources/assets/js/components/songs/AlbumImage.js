import React from 'react'
import _ from 'lodash'

export default ({ songFile }) => {
    let image = (
        <div className="w-8 h-8 bg-grey-light flex items-center justify-center text-white text-md">
            <i className="icon-music"></i>
        </div>
    )

    if (_.get(songFile, 'song.album.image')) {
        image = <img src={_.get(songFile, 'song.album.image')} alt={_.get(songFile, 'song.album.name', songFile.original_name)}/>
    }

    return (
        <div className="rounded-full w-8 h-8 overflow-hidden">
            {image}
        </div>
    )
}