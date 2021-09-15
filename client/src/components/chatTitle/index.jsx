import React from 'react'
import style from './chatTitle.module.scss'
import Icon from '../icons'
import {useChatOpsDispatch, useChatOpsState} from '../../context/blockOps'
import {CHAT_OPS_CREATE} from '../../context/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import {deleteBlock} from '../../actions/blockAction'

const ChatTitle = ({data, dragStart, dragEnter, isDragging, dragBlock}) => {
    const pushDispatch = useChatOpsDispatch()
    const deleteDispatch = useDispatch()
    const {blocks} = useSelector(state => state.blocks)
    const {blockOps} = useChatOpsState()
    const indexOfBlock = blocks.findIndex(block => block._id === data._id)
    
    const getStyle = _ => {
        if(dragBlock.current.id === data._id){
            return `${style.chatTitle} ${style.chatTitle__drag}`
        }
        return style.chatTitle
    }
    
    const editTitleHandler = _ => {
       if(data.type === 'Gallery' && !(blockOps.length)) pushDispatch({type:CHAT_OPS_CREATE, payload:data})
       else if (!(data.type === 'Gallery')) {
            const isExist = blockOps.find(block => block._id === data._id)
            const isGalleryExist = blockOps.find(block => block.type === 'Gallery')
            !isExist && !isGalleryExist && pushDispatch({type:CHAT_OPS_CREATE, payload:data})
       } 
    }
    const deleteTitleHandler = _ => {
        deleteDispatch(deleteBlock(data._id))
    }
    return (
        <div 
        className={isDragging ? getStyle():style.chatTitle}
        onDragStart={(e) => dragStart(e, {idx:indexOfBlock, id:data._id})}
        onDragEnter={(e) => dragEnter(e, {idx:indexOfBlock, id:data._id})}
        draggable
        >
            <span className={style.chatTitle__type}>{data.abbr}</span>
            <p style={{textAlign:'center', margin:'0'}} className={style.chatTitle__channel}>{data.name}</p>
            <div className={style.chatTitle__option}>
                <span className={style.chatTitle__edit}  onClick={editTitleHandler}>
                    <Icon name='edit'/>
                </span>
                <span className={style.chatTitle__delete} onClick={deleteTitleHandler}>
                    <Icon name='trash'/>
                </span>
            </div>
        </div>
    )
}

export default ChatTitle
