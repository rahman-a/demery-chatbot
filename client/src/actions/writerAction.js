import {type} from '../constants/writerConstants'
import api from '../api/writerAPI'


export const listAllWriters = () => async(dispatch) => {
    dispatch({type: type.WRITERS_LIST_REQUEST})
    try {
        const {data} = await api.listWriters()
        dispatch({type: type.WRITERS_LIST_SUCCESS, payload:data.writers})
    } catch (error) {
        dispatch({
            type: type.WRITER_BLOCK_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const userLogin = (credential) => async (dispatch) => {
    dispatch({type:type.WRITER_LOGIN_REQUEST})
    try {
        const {data} = await api.login(credential)
        localStorage.setItem('writer', JSON.stringify(data.writerData))
        localStorage.setItem('expiryAt', JSON.stringify(data.expireAt))
        dispatch({type: type.WRITER_INFO_SUCCESS, payload:data.writerData})
        dispatch({type:type.WRITER_LOGIN_SUCCESS, payload:true})
    } catch (error) {
        dispatch({
            type:type.WRITER_LOGIN_FAILURE, 
            payload:error.response && error.response.data.message
        })
    }
}


export const createWriterAccount = (info) => async(dispatch) => {
   
    dispatch({type:type.WRITER_CREATE_REQUEST})
    try {
        const {data} = await api.register(info)
        console.log('Create copy writer account', info);
        dispatch({type:type.WRITER_CREATE_SUCCESS, payload:data.message})
    } catch (error) {
        console.log(error.response);
        dispatch({
            type:type.WRITER_CREATE_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const getWriterInfo = () => async(dispatch) => {
    dispatch({type:type.WRITER_INFO_REQUEST})
    try {
        const {data} = await api.getWriterInfo()
        dispatch({type: type.WRITER_INFO_BY_ID_RESET})
        dispatch({type: type.WRITER_INFO_SUCCESS, payload: data.writer})
    } catch (error) {
        dispatch({
            type:type.WRITER_INFO_FAILURE,
            payload: error.response && error.response.data.message
        })
    }
}

export const getWriterInfoById = (id) => async(dispatch) => {
    dispatch({type:type.WRITER_INFO_BY_ID_REQUEST})
    try {
        const {data} = await api.getWriterInfoById(id)
        dispatch({type: type.WRITER_INFO_BY_ID_SUCCESS, payload: data.writer})
    } catch (error) {
        dispatch({
            type:type.WRITER_INFO_BY_ID_FAILURE,
            payload: error.response && error.response.data.message
        })
    }
}


export const editWriterInfo = (info, image, id) => async(dispatch) => {
    dispatch({type:type.WRITER_EDIT_REQUEST})
    try {
        let message = ''
        if(info){
            if(id) {
                const {data} = await api.editWriterInfo(info, id)
                message = data.message
            }else {
                const {data} = await api.editWriterInfo(info)
                localStorage.setItem('writer', JSON.stringify(data.writerData))
                message = data.message
            }
          
        }else {
            if(id) {
                const {data} = await api.uploadAvatar(image, id)
                message = data.message
            }else{
                const {data} = await api.uploadAvatar(image)
                localStorage.setItem('writer', JSON.stringify(data.writerData))
                message = data.message
            }
        }
        dispatch({type: type.WRITER_EDIT_SUCCESS, payload:message})
    } catch (error) {
        dispatch({
            type:type.WRITER_EDIT_FAILURE,
            payload: error.response && error.response.data.message
        })
    }
}


export const controlWriterAccess = (id) => async(dispatch) => {
    dispatch({type: type.WRITER_BLOCK_REQUEST})
    try {
        const {data} = await api.toggleAccess(id)
        dispatch({type: type.WRITER_BLOCK_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type: type.WRITER_BLOCK_FAILURE,
            payload: error.response && error.response.data.message
        })
    }
}

export const writerLogout = () => async (dispatch) => {
    dispatch({type: type.WRITER_LOGOUT_REQUEST})
    try {
        await api.logout()
        localStorage.removeItem('writer')
        localStorage.removeItem('expiryAt')
        dispatch({type: type.WRITER_LOGIN_SUCCESS, payload:false})
        dispatch({type: type.WRITER_LOGOUT_SUCCESS})
    } catch (error) {
        dispatch({
            type:type.WRITER_LOGOUT_FAILURE,
            payload:error.response && error.response.data.message
        })
    }
}

export const deleteWriter = (id) => async (dispatch) => {
    dispatch({type:type.WRITER_DELETE_REQUEST})
    try {
        const {data} = await api.writerDelete(id)
        dispatch({type: type.WRITER_DELETE_SUCCESS, payload:data.message})
    } catch (error) {
        dispatch({
            type:type.WRITER_DELETE_FAILURE,
            payload:error.response && error.response.data.message 
        })
    }
}