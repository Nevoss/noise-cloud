import axios from 'axios'
import { setToken } from "./utilities/index";

const upload = (file, token) => {

    let data = new FormData()
    data.append('file', file.data)
    
    return axios.post(window.route('song-files.store'), data, setToken(token))
}

export default {
    upload
}