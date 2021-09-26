import React, {useRef, useEffect} from 'react'
import style from './chatTest.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import {subscribeTOChannel} from '../../actions/writerAction'
import {dialogueBlock} from '../../actions/dialogueAction'
import {useParams} from 'react-router-dom'


const ChatBlock = ({block}) => {
    const dispatch = useDispatch()
    const {channel} = useSelector(state => state.oneChannel)
    const chatRef = useRef(null)
    const {id} = useParams()
    
    const blockActionHandler = (type, action) => {
        switch(type){
            case 'Move to Chat Block':
                dispatch(dialogueBlock({block:action, channel:id}))
                break;
            case 'Open Link':
                window.open(action, "_blank")
                break;
            case 'Call Phone':
                return 'Call Phone'
            case 'Subscribe':
                dispatch(subscribeTOChannel(id))
                dispatch(dialogueBlock({block:action, channel:id}))
                break;
            case 'Unsubscribe':
                return 'Unsubscribe'
            default:
                return
        }
    }

    useEffect(() => {
       chatRef.current.scrollIntoView({behavior:'smooth'})
    }, [])

    return (
        <div className={style.test__dialogue} ref={chatRef}>
           <>
            <figure>
                <img src={channel && `/api/uploads/${channel.image}`} alt="" />
            </figure>
            <div>
                {block.image 
                && <figure><img src={`/api/uploads/${block.image}`} alt={block.name} /></figure>}
                {block.title 
                && <h3>{block.title}</h3>}
                <p>
                  <pre style={{direction: block.isArabic ? 'rtl': 'ltr', 
                  fontFamily:'sans-serif',
                  fontSize:'1.3rem'}}>
                  {block.content}
                </pre>  
                </p>
                {block.buttons 
                && block.buttons.map(button => (
                <button 
                key={button._id} 
                onClick={() => blockActionHandler(button.type, button.action)}
                >
                    {button.title}
                </button>))}
            </div>
            </>
        </div>
    )
}

export default ChatBlock
