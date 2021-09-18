import {type} from '../constants/dialogueConstants'


export const getDialoguesReducer = (state, action) => {
    switch(action.type){
        case type.DIALOGUE_CHECK_REQUEST: 
            return {loading:true, error:null} 
        case type.DIALOGUE_CHECK_SUCCESS: 
            return {loading:false, error:null, blocks:action.payload} 
        case type.DIALOGUE_CHECK_FAILURE: 
            return {loading:false, error:action.payload}
        case type.DIALOGUE_CHECK_RESET: 
            return {loading:false, error:null, blocks:null}
        default:
          return {...state} 
    }
}

export const getDialogueBlock = (state, action) => {
    switch(action.type){
        case type.DIALOGUE_BLOCK_REQUEST: 
            return {loading:true, error:null} 
        case type.DIALOGUE_BLOCK_SUCCESS: 
            return {loading:false, error:null, block:action.payload} 
        case type.DIALOGUE_BLOCK_FAILURE: 
            return {loading:false, error:action.payload}
        case type.DIALOGUE_BLOCK_RESET: 
            return {loading:false, error:null, block:null}
        default:
          return {...state} 
    }
}

export const deleteDialogueRecords = (state, action) => {
    switch(action.type){
        case type.DIALOGUE_DELETE_RECORDS_REQUEST: 
            return {loading:true, error:null}
        case type.DIALOGUE_DELETE_RECORDS_SUCCESS: 
            return {loading:false, error:null, isDeleted:true} 
        case type.DIALOGUE_DELETE_RECORDS_FAILURE: 
            return {loading:false, error:action.payload}
        default:
          return {...state} 
    }
}