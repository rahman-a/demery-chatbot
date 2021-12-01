import {type} from '../constants/timedBlockConstants'

export const addTimedBlockReducer = (state, action) => {
    switch(action.type){
        case type.ADD_TIMED_BLOCK_REQUEST: 
            return {loading:true, error:null} 
        case type.ADD_TIMED_BLOCK_SUCCESS: 
            return {loading:false, error:null, block:action.payload}
        case type.ADD_TIMED_BLOCK_RESET: 
            return {loading:false, error:null, block:null}
        case type.ADD_TIMED_BLOCK_FAIL: 
            return {loading:false, error:action.payload} 
        default:
            return {...state}
    }
}

export const listTimedBlocksReducer = (state, action) => {
    switch(action.type){
        case type.LIST_TIMED_BLOCK_REQUEST: 
            return {loading:true, error:null} 
        case type.LIST_TIMED_BLOCK_SUCCESS: 
            return {loading:false, error:null, blocks:action.payload}
        case type.LIST_TIMED_BLOCK_RESET: 
            return {loading:false, error:null, blocks:null}
        case type.LIST_TIMED_BLOCK_FAIL: 
            return {loading:false, error:action.payload} 
        default:
            return {...state}
    }
}

export const listTimedDialogueReducer = (state, action) => {
    switch(action.type){
        case type.LIST_TIMED_DIALOGUE_BLOCK_REQUEST: 
            return {loading:true, error:null} 
        case type.LIST_TIMED_DIALOGUE_BLOCK_SUCCESS: 
            return {loading:false, error:null, blocks:action.payload}
        case type.LIST_TIMED_DIALOGUE_BLOCK_RESET: 
            return {loading:false, error:null, blocks:null}
        case type.LIST_TIMED_DIALOGUE_BLOCK_FAIL: 
            return {loading:false, error:action.payload} 
        default:
            return {...state}
    }
}

export const toggleTimedBlockReducer = (state, action) => {
    switch(action.type){
        case type.TOGGLE_TIMED_BLOCK_REQUEST: 
            return {loading:true, error:null} 
        case type.TOGGLE_TIMED_BLOCK_SUCCESS: 
            return {loading:false, error:null, toggle:action.payload} 
        case type.TOGGLE_TIMED_BLOCK_FAIL: 
            return {loading:false, error:action.payload} 
        case type.TOGGLE_TIMED_BLOCK_RESET: 
            return {loading:false, error:null, toggle:null}
        default:
            return {...state}
    }
}

export const removeTimedBlockReducer = (state, action) => {
    switch(action.type){
        case type.REMOVE_TIMED_BLOCK_REQUEST: 
            return {loading:true, error:null} 
        case type.REMOVE_TIMED_BLOCK_SUCCESS: 
            return {loading:false, error:null, isRemoved:action.payload} 
        case type.REMOVE_TIMED_BLOCK_FAIL: 
            return {loading:false, error:action.payload} 
        case type.REMOVE_TIMED_BLOCK_RESET: 
            return {loading:false, error:null, isRemoved:false}
        default:
            return {...state}
    }
}