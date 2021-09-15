import {type} from '../constants/blockConstants'

export const createBlockReducer = (state, action) => {
    switch(action.type){
        case type.BLOCK_CREATE_REQUEST: 
            return  {loading: true, error:null}
        case type.BLOCK_CREATE_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case type.BLOCK_CREATE_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

export const editBlockReducer = (state, action) => {
    switch(action.type){
        case type.BLOCK_EDIT_REQUEST: 
            return  {loading: true, error:null}
        case type.BLOCK_EDIT_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case type.BLOCK_EDIT_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}


export const ListBlocksReducer = (state, action) => {
    switch(action.type){
        case type.BLOCK_LIST_REQUEST: 
            return  {loading: true, error:null}
        case type.BLOCK_LIST_SUCCESS: 
            return {loading:false, error:null, blocks:action.payload} 
        case type.BLOCK_LIST_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

export const deleteBlockReducer = (state, action) => {
    switch(action.type){
        case type.BLOCK_DELETE_REQUEST: 
            return  {loading: true, error:null}
        case type.BLOCK_DELETE_SUCCESS: 
            return {loading:false, error:null, isDeleted:true} 
        case type.BLOCK_DELETE_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}


