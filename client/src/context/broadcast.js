import {
    BROADCAST_BLOCKS_ADD,
    BROADCAST_BLOCKS_RESET,
    BROADCAST_BLOCK_REMOVE
} from './actionTypes.js'
import {createContext, useContext, useReducer} from 'react'

const broadcastBlockState = createContext()
const broadcastBlockDispatch = createContext()

const broadcastBlockReducer = (state, action) => {
    switch(action.type) {
        case BROADCAST_BLOCKS_ADD:
            console.log('broadcast',action.payload);
            let blocks = null 
            if(action.payload instanceof Array){
                blocks = {broadcast: [...state.broadcast, ...action.payload]}
            }else if(action.payload instanceof Object ) {
                blocks = {broadcast:[...state.broadcast, action.payload]}
            }else {
             blocks = state
            }
            return blocks
        case BROADCAST_BLOCK_REMOVE:
            console.log('remove block',action.payload)
            const  allBlocks = state.broadcast.filter(block => block._id !== action.payload)
            return {broadcast:allBlocks}
        case BROADCAST_BLOCKS_RESET: 
            return {broadcast:[]}
        default:
            return state
    }
}

const BroadcastBlockProvider = ({children}) => {
    const initData = {broadcast:[]}
    const [state, dispatch] = useReducer(broadcastBlockReducer, initData)

    return <broadcastBlockState.Provider value={state}>
        <broadcastBlockDispatch.Provider value={dispatch}>
                {children}
        </broadcastBlockDispatch.Provider>
    </broadcastBlockState.Provider>
}

const useBroadcastState = () => {
    const context = useContext(broadcastBlockState)
    if(context === undefined) throw new Error('useBroadcastState must be used within ChatBlockProvider')
    return context 
}

const useBroadcastDispatch = () => {
    const context = useContext(broadcastBlockDispatch)
    if(context === undefined) throw new Error('useBroadcastDispatch must be used within ChatBlockProvider')
    return context
}

export {BroadcastBlockProvider as default, useBroadcastDispatch, useBroadcastState}
