import React, {useState, useRef, useEffect} from 'react'
import style from './chatTitles.module.scss'
import ChatTitle from '../chatTitle'
import {listBlocks} from '../../actions/blockAction'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Loader from '../../components/Loader'

const ChatTitles = () => {
    const [searchInput, setSearchInput] = useState('')
    const dispatch = useDispatch()
    const {loading, error, blocks} = useSelector(state => state.blocks)
    const {message} = useSelector(state => state.newBlock)
    const {isDeleted} = useSelector(state => state.blockDelete)
    const {message:editMessage} = useSelector(state => state.editBlock)
    const {id} = useParams()
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
        e.target.className += ' dragEnter'
        const newBlocks = JSON.parse(JSON.stringify(blocks))
        newBlocks.splice(params.idx, 0, newBlocks.splice(current.idx, 1)[0])
        dragBlock.current = params
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
        dispatch(listBlocks(id, searchInput))
    }

    useEffect(() => {
        if(id){
            dispatch(listBlocks(id))
        }
    }, [id, dispatch, message, isDeleted, editMessage])

    return (
        <div className={style.chatTitles}>
           <form className={style.chatTitles__search}>
                <input 
                type="text" 
                name='search' 
                placeholder='search by block name'
                onChange={(e) => setSearchInput(e.target.value)}/>
                <button type="submit" onClick={blockTitleSearchHandler}>search</button>
            </form>
            {/* <button 
            onClick={saveOrderHandler} 
            className={style.chatTitles__order}
            style={{visibility: isEndDragging ? 'visible': 'hidden'}}
            >
                Save
            </button> */}
            {loading 
            ? <Loader size='15' center top='20'/>
            : error 
            ? <h2 className={style.chatTitles__error}>{error}</h2>
            :<div className={style.chatTitles__blocks}>
                {blocks && blocks.map((b, idx) => (
                <ChatTitle 
                key={b._id} 
                data = {{...b, idx}}
                dragStart = {dragStartHandler}
                dragEnter = {dragEnterHandler}
                isDragging={isDragging}
                dragBlock={dragBlock}
                />
                ))}
            </div>}
        </div>
    )
}

export default ChatTitles
