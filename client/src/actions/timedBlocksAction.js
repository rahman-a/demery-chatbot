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

export const listTimedDialogueBlock = (channel) => async(dispatch) => {
    dispatch({type: type.LIST_TIMED_DIALOGUE_BLOCK_REQUEST})
    try {
        const {data} = await api.listTimedDialogueBlocks(channel)
        dispatch({type: type.LIST_TIMED_DIALOGUE_BLOCK_SUCCESS, payload:data.blocks})
    } catch (error) {
        dispatch({
            type: type.LIST_TIMED_DIALOGUE_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

export const listTimedBlock = (channel, blockType, group) => async(dispatch) => {
    dispatch({type: type.LIST_TIMED_BLOCK_REQUEST})
    try {
        const {data} = await api.listTimedBlocks(channel, blockType, group)
        dispatch({type: type.LIST_TIMED_BLOCK_SUCCESS, payload:data.blocks})
    } catch (error) {
        dispatch({
            type: type.LIST_TIMED_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}

export const toggleTimedBlock = (id, group) => async(dispatch) => {
    dispatch({type: type.TOGGLE_TIMED_BLOCK_REQUEST})
    try {
        const {data} = await api.toggleActivation(id, group)
        dispatch({type: type.TOGGLE_TIMED_BLOCK_SUCCESS, payload:data.blockId})
    } catch (error) {
        dispatch({
            type: type.TOGGLE_TIMED_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}


export const removeTimedBlock = (id, blockType, group) => async(dispatch) => {
    dispatch({type: type.REMOVE_TIMED_BLOCK_REQUEST})
    try {
        const {data} = await api.removeBlock(id, blockType, group)
        dispatch({type: type.REMOVE_TIMED_BLOCK_SUCCESS, payload:data.blockId})
    } catch (error) {
        dispatch({
            type: type.REMOVE_TIMED_BLOCK_FAIL,
            payload:error.response && error.response.data.message 
        })
    }
}
