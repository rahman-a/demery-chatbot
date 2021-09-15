import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    loginReducer,
    writerCreateReducer,
    listChannelsReducer,
    logoutReducer,
    writerInfoReducer,
    writerInfoEditReducer,
    writerAccessReducer,
    listWritersReducer,
    writerInfoByIdReducer,
    writerDeleteReducer
} from './reducers/writerReducer'

import {
    createChannelReducer,
    getChannelReducer,
    editChannelReducer,
    deleteChannelReducer
} from './reducers/channelReducer'

import {
    createBlockReducer,
    ListBlocksReducer,
    editBlockReducer,
    deleteBlockReducer
} from './reducers/blockReducer'

import {
    getDialoguesReducer
} from './reducers/dialogueReducer'

const reducer = combineReducers({
    // Writer Reducer
    writer:loginReducer,
    writers:listWritersReducer,
    channels:listChannelsReducer,
    register:writerCreateReducer,
    info:writerInfoReducer,
    edit:writerInfoEditReducer,
    logout:logoutReducer,
    access:writerAccessReducer,
    infoById:writerInfoByIdReducer,
    delete:writerDeleteReducer,

    // Channel Reducer
    channel:createChannelReducer,
    oneChannel: getChannelReducer,
    channelEdit:editChannelReducer,
    channelDelete:deleteChannelReducer,

    // Block Reducer 
    newBlock:createBlockReducer,
    editBlock:editBlockReducer,
    blocks:ListBlocksReducer,
    blockDelete:deleteBlockReducer,
    
    // Dialogue Reducer
    getDialogues:getDialoguesReducer,
})


const middleware = [thunk] 

const writerLocalStorage = localStorage.getItem('writer') ?JSON.parse(localStorage.getItem('writer')) : {}

const isWriterAuth = _ => {
    if(Object.keys(writerLocalStorage).length > 0){
        const today = new Date()
        const expiryLocalStorage = JSON.parse(localStorage.getItem('expiryAt'))
        const expiryDate = new Date(expiryLocalStorage)
        if(today < expiryDate) {
            return true
        }else {
            localStorage.removeItem('writer')
            localStorage.removeItem('expiryAt')
            return false
        }
    }else {
        return false
    }
}

const initState = {
    info:{writer:writerLocalStorage},
    writer:{isAuth:isWriterAuth()}
}
const store = createStore(
    reducer, 
    initState, 
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store