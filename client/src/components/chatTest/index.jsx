import React, {useState} from 'react'
import style from './chatTest.module.scss'
import Icon from '../icons'
import ObjectID from 'bson-objectid'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import Alert from 'react-bootstrap/Alert'

const ChatTest = ({toggle, setToggle}) => {
    const [dialogue, setDialogue] = useState([])
    const [content, setContent] = useState('')
    const {channel} = useSelector(state => state.oneChannel)
    const {loading, error, block} = useSelector(state => state.getDialogues)
    
    const chatStyle = {
        bottom:toggle ? '8rem': '3rem',
        opacity:toggle ? '1': 0,
        visibility:toggle ? 'visible': 'hidden'
    }

    const pushTextToChat = _ => {
        setDialogue([...dialogue, {_id:ObjectID().toHexString() ,content}])
        setContent('')
    }

    const pushTextToChatOnEnter = e => {
        if(e.keycode === 13 || e.which === 13) {
            pushTextToChat()
            return
        }
    }

    const resetChatHandler = _ => {
        setDialogue([])
    }
    return (
        <div className={style.test} style={chatStyle}>
           <div className={style.test__header}>
               <div className={style.test__option}>
                   <span onClick={resetChatHandler}>
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
           <div className={style.test__body}>
               {
                   loading 
                   ? <Loader size='20' center/>
                   : error 
                   ? <Alert variant='danger'>{error}</Alert>
                   : block && <div className={style.test__dialogue}>
                       {block.name}
                   </div>
               }
           </div>
           <div className={style.test__send}>
                <input 
                type="text" 
                placeholder='start writing here....'
                onKeyDown={(e) => pushTextToChatOnEnter(e)} 
                onChange={({target:{value}}) => setContent(value)}
                value={content}/>
                <span  onClick={pushTextToChat}>
                    <Icon name='paper-plane'/>
                </span>   
            </div> 
        </div>
    )
}

export default ChatTest


// {dialogue.map((d, i) => (
//     <div style={{direction: i%2 === 0 ? 'ltr' : 'rtl'}}
//     className={style.test__dialogue} 
//     key={d._id}>
//          <img src={`/api/uploads/${channel.image}`} alt="avatar" />
//          <p>{d.content}</p>
//     </div>
// ))}   