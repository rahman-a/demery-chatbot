import {
    TIMED_BLOCKS_ADD,
    TIMED_BLOCKS_RESET,
    TIMED_BLOCK_TOGGLE,
    TIMED_BLOCK_REMOVE
} from './actionTypes.js'
import {createContext, useContext, useReducer} from 'react'

const timedBlockState = createContext()
const timedBlockDispatch = createContext()

const timedBlockReducer = (state, action) => {
    switch(action.type) {
        case TIMED_BLOCKS_ADD:
            let blocks = null 
            if(action.payload instanceof Array){
                blocks = {timedBlocks: [...state.timedBlocks, ...action.payload]}
            }else if(action.payload instanceof Object ) {
                blocks = {timedBlocks:[...state.timedBlocks, action.payload]}
            }else {
             blocks = state
            }
            return blocks
        case TIMED_BLOCK_REMOVE:
            const  allBlocks = state.timedBlocks.filter(block => block._id !== action.payload)
            return {timedBlocks:allBlocks}
        case TIMED_BLOCK_TOGGLE: 
            const allSequenceBlocks = [...state.timedBlocks]
            allSequenceBlocks.forEach(block => {
                if(block._id === action.payload){
                    block.isActive = !block.isActive
                }
            })
            return {timedBlocks:allSequenceBlocks}
        case TIMED_BLOCKS_RESET: 
            return {timedBlocks:[]}
        default:
            return state
    }
}

const TimedBlockProvider = ({children}) => {
    const initData = {timedBlocks:[]}
    const [state, dispatch] = useReducer(timedBlockReducer, initData)

    return <timedBlockState.Provider value={state}>
        <timedBlockDispatch.Provider value={dispatch}>
                {children}
        </timedBlockDispatch.Provider>
    </timedBlockState.Provider>
}

const useTimedState = () => {
    const context = useContext(timedBlockState)
    if(context === undefined) throw new Error('useTimedState must be used within TimedBlockProvider')
    return context 
}

const useTimedDispatch = () => {
    const context = useContext(timedBlockDispatch)
    if(context === undefined) throw new Error('useTimedDispatch must be used within TimedBlockProvider')
    return context
}

export {TimedBlockProvider as default, useTimedDispatch, useTimedState}
