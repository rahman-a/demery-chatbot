import {type} from '../constants/blockConstants'
import api from '../api/blockAPI'

export const createBlock = (info) => async (dispatch) => {
    dispatch({type: type.BLOCK_CREATE_REQUEST})
    try {
        const {data} = await api.create(info)
        dispatch({type: type.BLOCK_CREATE_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type: type.BLOCK_CREATE_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const editBlock = (info) => async (dispatch) => {
    dispatch({type: type.BLOCK_EDIT_REQUEST})
    try {
        const {data} = await api.edit(info)
        dispatch({type: type.BLOCK_EDIT_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type: type.BLOCK_EDIT_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const listBlocks = (id, keyword) => async (dispatch) => {
    dispatch({type: type.BLOCK_LIST_REQUEST})
    try {
        const {data} = keyword 
        ?await api.getAll(id, keyword) 
        :await api.getAll(id)
        dispatch({type: type.BLOCK_LIST_SUCCESS, payload:data.blocks})
    } catch (error) {
        dispatch({
            type: type.BLOCK_LIST_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}


export const deleteBlock = (id) => async (dispatch) => {
    dispatch({type: type.BLOCK_DELETE_REQUEST})
    try {
        await api.remove(id)
        dispatch({type: type.BLOCK_DELETE_SUCCESS})
    } catch (error) {
        dispatch({
            type: type.BLOCK_DELETE_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}