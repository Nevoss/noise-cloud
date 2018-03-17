import axios from 'axios'
import { setToken } from "./utilities/index";

const upload = (file, token) => {

    let data = new FormData()
    data.append('file', file.data)
    
    return axios.post(window.route('song-files.store'), data, setToken(token))
}

const getAll = (filters, token) => {
    return axios.get(window.route('song-files.index'), setToken(token))
}

export default {
    upload, getAll
}