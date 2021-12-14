import React, {useState, useEffect, useRef} from 'react'
import style from './chatTest.module.scss'
import Icon from '../icons'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader'
import Alert from 'react-bootstrap/Alert'
import ChatTestBlock from './chatTestBlock'
import {useBlockDispatch, useBlockState} from '../../context/blockData'
import {CHAT_BLOCKS_ADD} from '../../context/actionTypes'
import {type} from '../../constants/dialogueConstants'
import {type as timed} from '../../constants/timedBlockConstants'
import DotPulse from '../DotPulse'
import {useParams} from 'react-router-dom'
import {deleteDialogueRecords} from '../../actions/dialogueAction'
import {listTimedDialogueBlock} from '../../actions/timedBlocksAction'
import Notify from '../../sound/notify.mp3'

const ChatTest = ({toggle, setToggle, setChatNotification, dialoguesInit}) => {
    const [content, setContent] = useState('')
    const scrollDivToView = useRef(null)
    const chatBodyScrollBar = useRef(null)
    const {channel} = useSelector(state => state.oneChannel)
    const {loading, error, blocks} = useSelector(state => state.getDialogues)
    const {loading:loading_bk, error:error_bk, block} = useSelector(state => state.dialogueBlock)
    const {blocks:timedDialogueBlocks} = useSelector(state => state.timedDialogueBlocks)
    const dispatch = useDispatch()
    const chatDispatch = useBlockDispatch()
    const {allBlocks} = useBlockState()
    const {id} = useParams()
    
    const chatStyle = {
        bottom:toggle ? '8rem': '3rem',
        opacity:toggle ? '1': 0,
        visibility:toggle ? 'visible': 'hidden'
    }

    const displayOneDialogueBlock =_ => {
        chatDispatch({type:CHAT_BLOCKS_ADD, payload:block})
        dispatch({type: type.DIALOGUE_BLOCK_RESET})
    }

    const playNotificationSound = _ => {
        const audio = new Audio(Notify)
        audio.play()
    }
    
    const displayDialogueBlocks = _ => {
        if(blocks) {
            chatDispatch({type:CHAT_BLOCKS_ADD, payload:blocks})
            dispatch({type: type.DIALOGUE_CHECK_RESET})
        }else if(timedDialogueBlocks) {
            !dialoguesInit && chatDispatch({type:CHAT_BLOCKS_ADD, payload:timedDialogueBlocks})
            setChatNotification(prev => prev + timedDialogueBlocks.length)
            playNotificationSound()
            dispatch({type: timed.LIST_TIMED_DIALOGUE_BLOCK_RESET})

        }
    }

    const scrollToBottomOnLoading = _ => {
        scrollDivToView.current.scrollIntoView({behavior:'smooth'})
        
    }
    const clearChatHandler = _ => {
        dispatch(deleteDialogueRecords(id))
        dispatch({type: timed.LIST_TIMED_DIALOGUE_BLOCK_RESET})
    }


    useEffect(() => {
        (blocks || timedDialogueBlocks) ? displayDialogueBlocks() 
        : block && displayOneDialogueBlock()
        loading_bk && scrollToBottomOnLoading()
        const interval = setInterval(() => {
            dispatch(listTimedDialogueBlock(id))
        }, 1000 * 30)
        return () => clearInterval(interval)
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[blocks, block, loading_bk, timedDialogueBlocks])
    return (
        <div className={style.test} style={chatStyle}>
           <div className={style.test__header}>
               <div className={style.test__option}>
                   <span onClick={clearChatHandler}>
                       <Icon name='refresh' />
                    </span>
                   <span onClick={() => setToggle(false)}>
                       <Icon name='close-square'/>
                    </span>
               </div>
               <div className={style.test__channel}>
                   <p>{channel && channel.name}</p>
                   <img src={channel && `/api/uploads/${channel.image}`} alt="channel name" />
               </div>
           </div>
           <div className={style.test__body} ref={chatBodyScrollBar}>
               {loading 
                ? <Loader size='20' center/>
                : error 
                && <Alert variant='danger'>{error}</Alert>}
                {allBlocks 
                && allBlocks.length > 0 
                && allBlocks.map(b => <ChatTestBlock 
                    key={b._id} 
                    block={b} 
                    />)
               }
               {
                   loading_bk ? <DotPulse/>
                   : error_bk  && <Alert variant='danger'>{error_bk}</Alert>
               }
               <div ref={scrollDivToView}></div>
           </div>
           <div className={style.test__send}>
                <input 
                type="text" 
                placeholder='start typing....' 
                onChange={({target:{value}}) => setContent(value)}
                value={content}/>
                <span>
                    <Icon name='paper-plane'/>
                </span>   
            </div> 
        </div>
    )
}

export default ChatTest
