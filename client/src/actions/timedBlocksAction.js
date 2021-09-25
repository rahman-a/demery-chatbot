import {type} from '../constants/timedBlockConstants'
import api from '../api/timedAPI'

export const addTimedBlock = (info) => async(dispatch) => {
    dispatch({type: type.ADD_TIMED_BLOCK_REQUEST})
    try {
        const {data} = await api.addBlock(info)
        dispatch({type: type.ADD_TIMED_BLOCK_SUCCESS, payload:data.block})
    } catch (error) {
        dispatch({
            type: type.ADD_TIMED_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

export const listTimedBlock = (channel) => async(dispatch) => {
    dispatch({type: type.LIST_TIMED_BLOCK_REQUEST})
    try {
        const {data} = await api.listTimedBlocks(channel)
        dispatch({type: type.LIST_TIMED_BLOCK_SUCCESS, payload:data.blocks})
    } catch (error) {
        dispatch({
            type: type.LIST_TIMED_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

export const listBroadcastBlock = (channel, blockType) => async(dispatch) => {
    dispatch({type: type.LIST_BROADCAST_BLOCK_REQUEST})
    try {
        const {data} = await api.listBroadcast(channel, blockType)
        dispatch({type: type.LIST_BROADCAST_BLOCK_SUCCESS, payload:data.blocks})
    } catch (error) {
        dispatch({
            type: type.LIST_BROADCAST_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

export const removeTimedBlock = (id) => async(dispatch) => {
    dispatch({type: type.REMOVE_TIMED_BLOCK_REQUEST})
    try {
        const {data} = await api.removeBlock(id)
        dispatch({type: type.REMOVE_TIMED_BLOCK_SUCCESS, payload:data.blockId})
    } catch (error) {
        dispatch({
            type: type.REMOVE_TIMED_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}
