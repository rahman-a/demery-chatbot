import {type} from '../constants/channelConstants'

export const createChannelReducer = (state, action) => {
    switch(action.type) {
        case type.CHANNEL_CREATE_REQUEST: 
            return {loading:true, error:null}
        case type.CHANNEL_CREATE_SUCCESS: 
            return {loading:false, error:null, isCreated:true} 
        case type.CHANNEL_CREATE_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

export const editChannelReducer = (state, action) => {
    switch(action.type) {
        case type.CHANNEL_EDIT_REQUEST: 
            return {loading:true, error:null}
        case type.CHANNEL_EDIT_SUCCESS: 
            return {loading:false, error:null, success:action.payload} 
        case type.CHANNEL_EDIT_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

export const deleteChannelReducer = (state, action) => {
    switch(action.type) {
        case type.CHANNEL_DELETE_REQUEST: 
            return {loading:true, error:null}
        case type.CHANNEL_DELETE_SUCCESS: 
            return {loading:false, error:null, success:action.payload} 
        case type.CHANNEL_DELETE_FAILURE: 
            return {loading:false, error:action.payload}
        case type.CHANNEL_DELETE_RESET: 
            return {loading:false, error:null, success:null}
        default:
            return {...state}
    }
}