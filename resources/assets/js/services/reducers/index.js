import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import authReducer from './auth'
import songsUploaderReducer from './songs-uploader'
import songFilesReducer from './song-files'
import playerReducer from './player'

export default combineReducers({
    form: FormReducer,
    router: routerReducer,
    auth: authReducer,
    songsUploader: songsUploaderReducer,
    songFiles: songFilesReducer,
    player: playerReducer
})