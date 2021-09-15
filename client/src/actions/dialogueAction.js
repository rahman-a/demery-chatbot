import {type} from '../constants/dialogueConstants'
import api from '../api/dialoguesAPI'

export const getDialogues = (ids) => async(dispatch) => {
    dispatch({type: type.DIALOGUE_CHECK_REQUEST})
    try {
        const {data} = await api.checkDialogues(ids)
        dispatch({type: type.DIALOGUE_CHECK_SUCCESS, payload:data.block})
    } catch (error) {
        dispatch({
            type: type.DIALOGUE_CHECK_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}