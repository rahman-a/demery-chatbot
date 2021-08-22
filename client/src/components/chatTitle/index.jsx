import React from 'react'
import style from './chatTitle.module.scss'
import Icon from '../icons'

const ChatTitle = ({type, name}) => {
    return (
        <div className={style.chatTitle} draggable>
            <span className={style.chatTitle__type}>{type}</span>
            <p className={style.chatTitle__channel}>{name}</p>
            <div className={style.chatTitle__option}>
                <span className={style.chatTitle__edit}>
                    <Icon name='edit' />
                </span>
                <span className={style.chatTitle__delete}>
                    <Icon name='trash' />
                </span>
            </div>
        </div>
    )
}

export default ChatTitle
