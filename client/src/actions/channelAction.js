import {type} from '../constants/channelConstants'
import api from '../api/channelAPI'

export const createChannel = (info) => async (dispatch) => {
    dispatch({type: type.CHANNEL_CREATE_REQUEST})
    try {
        const {data} = await api.create(info)
        dispatch({type: type.CHANNEL_CREATE_SUCCESS, payload:data.channel})
    } catch (error) {
        dispatch({
            type: type.CHANNEL_CREATE_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const getOneChannel = (id) => async (dispatch) => {
    dispatch({type: type.CHANNEL_GET_REQUEST})
    try {
        const {data} = await api.get(id)
        dispatch({type: type.CHANNEL_GET_SUCCESS, payload:data.channel})
    } catch (error) {
        dispatch({
            type: type.CHANNEL_GET_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const editChannel = (info, id) => async (dispatch) => {
    dispatch({type: type.CHANNEL_EDIT_REQUEST})
    try {
        const {data} = await api.edit(info, id)
        dispatch({type: type.CHANNEL_EDIT_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type: type.CHANNEL_EDIT_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const removeChannel = (id) => async (dispatch) => {
    dispatch({type: type.CHANNEL_DELETE_REQUEST})
    try {
        const {data} = await api.remove(id)
        console.log('delete', data);
        dispatch({type: type.CHANNEL_DELETE_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type: type.CHANNEL_DELETE_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}