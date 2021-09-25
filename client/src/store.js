import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import globalReducerObject from './reducers'



// Main Reducer
const reducer = combineReducers(globalReducerObject)


const middleware = [thunk] 

const writerLocalStorage = localStorage.getItem('writer') 
? JSON.parse(localStorage.getItem('writer')) 
: null

const isWriterAuth = _ => {
    if(writerLocalStorage){
        const today = new Date()
        const expiryLocalStorage = JSON.parse(localStorage.getItem('expiryAt'))
        const expiryDate = new Date(expiryLocalStorage)
        if(today < expiryDate) {
            return true
        }
    }
    localStorage.removeItem('writer')
    localStorage.removeItem('expiryAt')
    return false
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