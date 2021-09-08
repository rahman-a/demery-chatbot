import {type} from '../constants/writerConstants'



export const listWritersReducer = (state, action) =>{
    switch(action.type) {
        case type.WRITERS_LIST_REQUEST: 
            return {loading:true, error:null}
        case type.WRITERS_LIST_SUCCESS: 
            return {loading:false, error:null, writers:action.payload}
        case type.WRITERS_LIST_FAILURE: 
            return {loading: false, error:action.payload}
        default:
            return {...state}
    }
}

export const loginReducer = (state, action) => {
    switch(action.type) {
        case type.WRITER_LOGIN_REQUEST: 
            return {loading:true, error:null}
        case type.WRITER_LOGIN_SUCCESS: 
            return {loading:false, error:null, isAuth:action.payload}
        case type.WRITER_LOGIN_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state} 
    }
}


export const writerCreateReducer = (state, action) => {
    switch(action.type){
        case type.WRITER_CREATE_REQUEST: 
            return {loading:true, error:null} 
        case type.WRITER_CREATE_SUCCESS: 
            return {loading:false, error:null, message:action.payload} 
        case type.WRITER_CREATE_FAILURE: 
            return {loading:false, error:action.payload}
        case type.WRITER_CREATE_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}

export const writerInfoReducer = (state, action) => {
    switch(action.type){
        case type.WRITER_INFO_REQUEST: 
            return {loading:true, error:null} 
        case type.WRITER_INFO_SUCCESS: 
            return {loading:false, error:null, writer:action.payload} 
        case type.WRITER_INFO_FAILURE: 
            return {loading:false, error:action.payload}
        case type.WRITER_INFO_RESET: 
            return {loading:false, error:null, writer:null}
        default:
            return {...state}
    }
}

export const writerInfoByIdReducer = (state, action) => {
    switch(action.type){
        case type.WRITER_INFO_BY_ID_REQUEST: 
            return {loading:true, error:null} 
        case type.WRITER_INFO_BY_ID_SUCCESS: 
            return {loading:false, error:null, writer:action.payload} 
        case type.WRITER_INFO_BY_ID_FAILURE: 
            return {loading:false, error:action.payload}
        case type.WRITER_INFO_BY_ID_RESET: 
            return {loading:false, error:null, writer:null}
        default:
            return {...state}
    }
}

export const writerInfoEditReducer = (state, action) => {
    switch(action.type){
        case type.WRITER_EDIT_REQUEST:
            return {loading:true, error:null}
        case type.WRITER_EDIT_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case type.WRITER_EDIT_FAILURE:
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}

export const logoutReducer = (state, action) => {
    switch(action.type){  
        case type.WRITER_LOGOUT_REQUEST: 
            return {loading:true, error:null} 
        case type.WRITER_LOGOUT_SUCCESS: 
            return {loading:false, error:null} 
        case type.WRITER_LOGOUT_FAILURE: 
            return {loading:false, error:action.payload}
        default:
            return {...state}
    }
}


export const writerAccessReducer = (state, action) => {
    switch(action.type){
        case type.WRITER_BLOCK_REQUEST: 
            return {loading:true, error:null}
        case type.WRITER_BLOCK_SUCCESS: 
            return {loading:false, error:null, message:action.payload}
        case type.WRITER_BLOCK_FAILURE: 
            return {loading: false, error:action.payload} 
        default:
            return {...state}
    }
}

export const writerDeleteReducer = (state, action) => {
    switch(action.type){
        case type.WRITER_DELETE_REQUEST:
            return {loading:true, error:null} 
        case type.WRITER_DELETE_SUCCESS:
            return {loading:false, error:null, message:action.payload} 
        case type.WRITER_DELETE_FAILURE:
            return {loading:false, error:action.payload}
        case type.WRITER_DELETE_RESET: 
            return {loading:false, error:null, message:null}
        default:
            return {...state}
    }
}