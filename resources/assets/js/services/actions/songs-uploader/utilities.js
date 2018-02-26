import moment from 'moment'
import _ from 'lodash'

const makeFileShortName = file => {
    
    let ext = file.name.split('.').pop()
    let fileName = file.name
        .slice(0, -1 * (ext.length + 1))
        .trunc(15)

    return `${fileName} .${ext}`
}

export const mapUploadingFiles = (files) => {

    return _.map(_.keys(files), (key) => {
        return {
            id: `${moment().format('x')}_${key}`,
            shortName: makeFileShortName(files[key]),
            data: files[key],
            error: null
        }
    })
}