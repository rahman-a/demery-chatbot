import {type} from '../constants/sequenceConstant'
import api from '../api/sequenceAPI'


export const listSequence = (id) => async (dispatch) => {
    dispatch({type:type.SEQUENCE_LIST_REQUEST})
    try {
        const {data} = await api.listAll(id)
        dispatch({type: type.SEQUENCE_LIST_SUCCESS, payload:data.groups})
    } catch (error) {
        dispatch({
            type: type.SEQUENCE_LIST_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

export const createSequence = (info) => async (dispatch) => {
    dispatch({type:type.SEQUENCE_CREATE_REQUEST})
    try {
        const {data} = await api.create(info)
        dispatch({type: type.SEQUENCE_CREATE_SUCCESS, payload:data.group})
    } catch (error) {
        dispatch({
            type: type.SEQUENCE_CREATE_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}

export const deleteSequence = (id) => async (dispatch) => {
    dispatch({type:type.SEQUENCE_REMOVE_REQUEST})
    try {
        await api.delete(id)
        dispatch({type: type.SEQUENCE_REMOVE_SUCCESS})
    } catch (error) {
        dispatch({
            type: type.SEQUENCE_REMOVE_FAIL,
            payload: error.response && error.response.data.message
        })
    }
}