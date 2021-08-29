import {
    CHAT_BLOCK_CREATE, 
    CHAT_BLOCK_UPDATE, 
    CHAT_BLOCK_DELETE, 
    CHAT_BLOCK_RESET,
    CHAT_BLOCK_REARRANGE
} from './actionTypes.js'
import {createContext, useContext, useReducer} from 'react'

const chatBlockState = createContext()
const chatBlockDispatch = createContext()

const chatBlockReducer = (state, action) => {
    switch(action.type) {
        case CHAT_BLOCK_CREATE:
            const filtered = state.chatBlocks.filter(block => block._id !== action.payload._id)
            const blocks = [...filtered, action.payload]
            const data = {...state, chatBlocks:blocks}
            localStorage.setItem('chatBlocks', JSON.stringify(data))
            return data
        case CHAT_BLOCK_UPDATE:
            const updatedBlock = action.payload
            const filteredBlocks = state.chatBlocks.filter(block => block.id !== updatedBlock.id)
            const newBlocks = [...filteredBlocks, updatedBlock]
            const newUpdatedData = {...state, chatBlocks:newBlocks}
            localStorage.setItem('chatBlocks', JSON.stringify(newUpdatedData))
            return newUpdatedData
        case CHAT_BLOCK_DELETE:
            const blockId = action.payload
            const filteredNewBlocks = state.chatBlocks.filter(block => block._id !== blockId)
            const newData = {...state, chatBlocks:filteredNewBlocks}
            localStorage.setItem('chatBlocks', JSON.stringify(newData))
            return newData
        case CHAT_BLOCK_REARRANGE:
            const newArrangedBlocks  = {chatBlocks:action.payload}
            localStorage.setItem('chatBlocks', JSON.stringify(newArrangedBlocks))
            return newArrangedBlocks
        case CHAT_BLOCK_RESET:
            localStorage.removeItem('chatBlocks')
            return {chatBlocks:[]}
        default:
            return state
    }
}

const ChatBlockProvider = ({children}) => {
    const initData = localStorage.getItem('chatBlocks') ? JSON.parse(localStorage.getItem('chatBlocks')):{chatBlocks:[]}
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
