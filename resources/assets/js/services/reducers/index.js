import { combineReducers } from 'redux'
import { reducer as FormReducer } from 'redux-form'
import authReducer from './auth'
import songsUploaderReducer from './songs-uploader'
import songFilesReducer from './song-files'

export default combineReducers({
    form: FormReducer,
    auth: authReducer,
    songsUploader: songsUploaderReducer,
    songFiles: songFilesReducer
})