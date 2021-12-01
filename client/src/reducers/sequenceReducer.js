import {type} from '../constants/sequenceConstant'

export const listSequenceReducer = (state, action) => {
    switch(action.type){
        case type.SEQUENCE_LIST_REQUEST:
            return {loading:true, error:null} 
        case type.SEQUENCE_LIST_SUCCESS: 
            return  {loading:false, error:null, groups:action.payload} 
        case type.SEQUENCE_LIST_FAIL: 
            return {loading:false, error:action.payload} 
        default:
            return {...state}
    }
}

export const createSequenceReducer = (state, action) => {
    switch(action.type){
        case type.SEQUENCE_CREATE_REQUEST:
            return {loading:true, error:null} 
        case type.SEQUENCE_CREATE_SUCCESS: 
            return  {loading:false, error:null, group:action.payload} 
        case type.SEQUENCE_CREATE_FAIL: 
            return {loading:false, error:action.payload} 
        default:
            return {...state}
    }
}

export const deleteSequenceReducer = (state, action) => {
    switch(action.type){
        case type.SEQUENCE_REMOVE_REQUEST:
            return {loading:true, error:null} 
        case type.SEQUENCE_REMOVE_SUCCESS: 
            return  {loading:false, error:null, isRemoved:true} 
        case type.SEQUENCE_REMOVE_FAIL: 
            return {loading:false, error:action.payload} 
        default:
            return {...state}
    }
}

