import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
    loginReducer,
    writerCreateReducer,
    logoutReducer,
    writerInfoReducer,
    writerInfoEditReducer,
    writerAccessReducer,
    listWritersReducer,
    writerInfoByIdReducer,
    writerDeleteReducer
} from './reducers/writerReducer'


const reducer = combineReducers({
    writer:loginReducer,
    writers:listWritersReducer,
    register:writerCreateReducer,
    info:writerInfoReducer,
    edit:writerInfoEditReducer,
    logout:logoutReducer,
    access:writerAccessReducer,
    infoById:writerInfoByIdReducer,
    delete:writerDeleteReducer
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