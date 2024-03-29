import axios from 'axios'
import auth from './auth'
import songFiles from './song-files'

// Adding some default settings to axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content

export default {
    auth,
    songFiles
}