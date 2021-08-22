import React from 'react'
import style from './chatTitles.module.scss'
import ChatTitle from '../chatTitle'
import blocks from '../../data/blocks'

const ChatTitles = () => {
    return (
        <div className={style.chatTitles}>
           <form className={style.chatTitles__search}>
                <input type="text" name='search' placeholder='search by block name'/>
                <button type="submit" onClick={(e) => e.preventDefault()}>search</button>
            </form>
            <div className={style.chatTitles__blocks}>
                {blocks.map(b => <ChatTitle key={b.id} type={b.type} name={b.name}/>)}
            </div>
        </div>
    )
}

export default ChatTitles
