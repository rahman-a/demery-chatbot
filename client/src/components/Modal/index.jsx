import React from 'react'
import style from './Modal.module.scss'
import Icon from '../icons'

export const Modal = ({children, toggle, closeHandler, center}) => {
    const modalStyle = {
        top:toggle ? center ? '50%' :'15%' : '-50%',
        opacity:toggle ? '1':'0'
    }

return (
     
    <div style={modalStyle} className={style.overlayCard}>
        <span className={style.close}>
            <Icon name='close-square' 
            width='20' 
            height='20' 
            className={style.overlayCard__close}
            eventHandler={closeHandler}
            />
        </span>
        {children}
    </div> 
 )

}


