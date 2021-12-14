import {
    CHAT_BLOCKS_ADD,
    CHAT_BLOCKS_RESET
} from './actionTypes.js'
import {createContext, useContext, useReducer} from 'react'

const chatBlockState = createContext()
const chatBlockDispatch = createContext()

const chatBlockReducer = (state, action) => {
    switch(action.type) {
        case CHAT_BLOCKS_ADD:
            let blocks = null 
            if(action.payload instanceof Array){
                blocks = {allBlocks: [...state.allBlocks, ...action.payload]}
            }else if(action.payload instanceof Object ) {
                blocks = {allBlocks:[...state.allBlocks, action.payload]}
            }else {
             blocks = state
            }
            return blocks
        case CHAT_BLOCKS_RESET: 
            return {allBlocks:[]}
        default:
            return state
    }
}

const ChatBlockProvider = ({children}) => {
    const initData = {allBlocks:[]}
    const [state, dispatch] = useReducer(chatBlockReducer, initData)

    return <chatBlockState.Provider value={state}>
        <chatBlockDispatch.Provider value={dispatch}>
                {children}
        </chatBlockDispatch.Provider>
    </chatBlockState.Provider>
}

const useBlockState = () => {
    const context = useContext(chatBlockState)
    if(context === undefined) throw new Error('userBlockState must be used within ChatBlockProvider')
    return context 
}

const useBlockDispatch = () => {
    const context = useContext(chatBlockDispatch)
    if(context === undefined) throw new Error('userBlockDispatch must be used within ChatBlockProvider')
    return context
}

export {ChatBlockProvider, useBlockDispatch, useBlockState}

// action.payload instanceof Array 
// ? blocks = {allBlocks: [...state.allBlocks, ...action.payload]}
// : action.payload instanceof Object 
// ? blocks = {allBlocks:[...state.allBlocks, action.payload]}
// : blocks = state
// return blocks