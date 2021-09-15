import {type} from '../constants/dialogueConstants'


export const getDialoguesReducer = (state, action) => {
    switch(action.type){
        case type.DIALOGUE_CHECK_REQUEST: 
            return {loading:true, error:null} 
        case type.DIALOGUE_CHECK_SUCCESS: 
            return {loading:false, error:null, block:action.payload} 
        case type.DIALOGUE_CHECK_FAILURE: 
            return {loading:false, error:action.payload}
        default:
          return {...state} 
    }
}