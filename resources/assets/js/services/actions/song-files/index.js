import api from '../../api'

export const getSongFilesAction = () => {
    return (dispatch, getState) => {

        const { auth: { token }, songFiles: { filters } } = getState()

        api.songFiles.getAll(filters, token)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}