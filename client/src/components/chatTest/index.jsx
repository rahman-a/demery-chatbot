import React, {useState} from 'react'
import style from './chatTest.module.scss'
import Icon from '../icons'
import ObjectID from 'bson-objectid'

const ChatTest = ({toggle, setToggle}) => {
    const [dialogue, setDialogue] = useState([])
    const [content, setContent] = useState('')
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
                   <p>قناة عالم كرة القدم</p>
                   <img src="image/football.jpg" alt="channel name" />
               </div>
           </div>
           <div className={style.test__body}>
               {dialogue.map((d, i) => (
                   <div style={{direction: i%2 === 0 ? 'ltr' : 'rtl'}}
                   className={style.test__dialogue} 
                   key={d._id}>
                        <img src="image/avatar.png" alt="avatar" />
                        <p>{d.content}</p>
                   </div>
               ))}   
           </div>
           <div className={style.test__send}>
                <input type="text" onKeyDown={(e) => pushTextToChatOnEnter(e)} 
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
