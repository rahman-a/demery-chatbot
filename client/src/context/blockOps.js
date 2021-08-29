import {
    CHAT_OPS_CREATE, 
    CHAT_OPS_DELETE, 
    CHAT_OPS_RESET,
    CHAT_OPS_ADD_GALLERY_BLOCK,
    CHAT_OPS_REMOVE_GALLERY_BLOCK
} from './actionTypes'
import {createContext, useContext, useReducer} from 'react'

const chatOpsState = createContext()
const chatOpsDispatch = createContext()

const chatOpsReducer = (state, action) => {
    switch(action.type){
        case CHAT_OPS_CREATE:
            const allBlocks = [...state.blockOps, action.payload]
            const blocks = {...state, blockOps:allBlocks}
            localStorage.setItem('blockOps', JSON.stringify(blocks))
            return blocks
        case CHAT_OPS_DELETE:
            const filteredBlocks = state.blockOps.filter(block => block._id !== action.payload)
            const newBlocks = {...state, blockOps:filteredBlocks}
            localStorage.setItem('blockOps', JSON.stringify(newBlocks))
            return newBlocks
        case CHAT_OPS_ADD_GALLERY_BLOCK:
            const galleryBlocks = {...state}
            const galleryNewBlock = [...state.blockOps[0].gallery, action.payload] 
            galleryBlocks.blockOps[0].gallery = galleryNewBlock
            localStorage.setItem('blockOps', JSON.stringify(galleryBlocks))
            return galleryBlocks
        case CHAT_OPS_REMOVE_GALLERY_BLOCK:
            let galleryAllBlocks = {...state}
            const galleryNewBlocks = state.blockOps[0].gallery.filter(block => block._id !== action.payload)
            if(galleryNewBlocks.length) {
                galleryAllBlocks.blockOps[0].gallery = galleryNewBlocks
            }else {
                galleryAllBlocks = {blockOps:[]}
            }
            
            localStorage.setItem('blockOps', JSON.stringify(galleryAllBlocks))
            return galleryAllBlocks
        case CHAT_OPS_RESET:
            localStorage.removeItem('blockOps')
            return {blockOps:[]}
        default:
            return state
    }
}

const ChatOpsProvider = ({children}) => {
    const initState = localStorage.getItem('blockOps') ? JSON.parse(localStorage.getItem('blockOps')) : {blockOps:[]}
    const [state, dispatch] = useReducer(chatOpsReducer, initState)

    return <chatOpsState.Provider value={state}>
        <chatOpsDispatch.Provider value={dispatch}>
            {children}
        </chatOpsDispatch.Provider>
    </chatOpsState.Provider>
}

const useChatOpsState = _ => {
    const context = useContext(chatOpsState)
    if(context === undefined)  throw new Error('useChatOpsState must be used within ChatOpsProvider')
    return context
}

const useChatOpsDispatch = _ => {
    const context = useContext(chatOpsDispatch)
    if(context === undefined)  throw new Error('useChatOpsDispatch must be used within ChatOpsProvider')
    return context
}

export {ChatOpsProvider, useChatOpsDispatch, useChatOpsState}