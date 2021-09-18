import {type} from '../constants/dialogueConstants'
import api from '../api/dialoguesAPI'

export const getDialogues = (id, dialoguesCount) => async(dispatch) => {
    dispatch({type: type.DIALOGUE_CHECK_REQUEST})
    try {
        const {data} = await api.checkDialogues(id, dialoguesCount)
        dispatch({type: type.DIALOGUE_CHECK_SUCCESS, payload:data.blocks})
    } catch (error) {
        dispatch({
            type: type.DIALOGUE_CHECK_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const dialogueBlock = (ids) => async(dispatch) => {
    dispatch({type: type.DIALOGUE_BLOCK_REQUEST})
    try {
        const {data} = await api.getBlock(ids)
        dispatch({type: type.DIALOGUE_BLOCK_SUCCESS, payload:data.block}) 
    } catch (error) {
        dispatch({
            type: type.DIALOGUE_BLOCK_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const deleteDialogueRecords = (id) => async(dispatch) => {
    dispatch({type: type.DIALOGUE_DELETE_RECORDS_REQUEST})
    try {
        await api.deleteRecords(id)
        dispatch({type: type.DIALOGUE_DELETE_RECORDS_SUCCESS}) 
    } catch (error) {
        dispatch({
            type: type.DIALOGUE_DELETE_RECORDS_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}