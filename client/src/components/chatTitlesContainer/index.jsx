import React, {useState, useRef} from 'react'
import style from './chatTitles.module.scss'
import ChatTitle from '../chatTitle'
import {useBlockState, useBlockDispatch} from '../../context/blockData'
import {CHAT_BLOCK_REARRANGE} from '../../context/actionTypes'
import blocks from '../../data/blocks'

const ChatTitles = () => {
    const {chatBlocks} = useBlockState()
    const dispatch = useBlockDispatch()
    const [isDragging, setIsDragging] = useState(false)
    const [isEndDragging, setIsEndDragging] = useState(false)
    const dragBlock = useRef(null)
    const dragRef = useRef(null)
    
    const dragStartHandler = (e, params) => {
        dragRef.current = e.target
        dragBlock.current = params 
        dragRef.current.addEventListener('dragend', dragEndHandler)
        setTimeout(() => {
            setIsDragging(true)
        }, 0);
    }
    
    const dragEnterHandler = (e, params) => {
        const current = dragBlock.current
        e.target.className += 'dragEnter'
        const newBlocks = JSON.parse(JSON.stringify(chatBlocks))
        newBlocks.splice(params.idx, 0, newBlocks.splice(current.idx, 1)[0])
        dragBlock.current = params
        dispatch({type:CHAT_BLOCK_REARRANGE, payload:newBlocks})
    }
    
    const dragEndHandler = _ => {
        dragRef.current.removeEventListener('dragend', dragEndHandler)
        dragRef.current = null
        dragBlock.current = null
        setIsDragging(false)
        setIsEndDragging(true)
    }

    const saveOrderHandler = _ => {
        setTimeout(() => {
            setIsEndDragging(false)
        }, 2000);
    }

    const blockTitleSearchHandler = e => {
        e.preventDefault()
        localStorage.setItem('chatBlocks', JSON.stringify(blocks))
    }

    return (
        <div className={style.chatTitles}>
           <form className={style.chatTitles__search}>
                <input type="text" name='search' placeholder='search by block name'/>
                <button type="submit" onClick={blockTitleSearchHandler}>search</button>
            </form>
            <button 
            onClick={saveOrderHandler} 
            className={style.chatTitles__order}
            style={{visibility: isEndDragging ? 'visible': 'hidden'}}
            >
                Save
            </button>
            <div className={style.chatTitles__blocks}>
                {chatBlocks && chatBlocks.map((b, idx) => (
                <ChatTitle 
                key={b._id} 
                data = {{...b, idx}}
                dragStart = {dragStartHandler}
                dragEnter = {dragEnterHandler}
                isDragging={isDragging}
                dragBlock={dragBlock}
                />
                ))}
            </div>
        </div>
    )
}

export default ChatTitles
