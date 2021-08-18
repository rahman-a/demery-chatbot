import React from 'react'
import style from './overlayCard.module.scss'
import Icon from '../icons'

export const OverlayCard = ({children, toggle, closeHandler}) => {

return (
     
    <div style={{top: toggle ? '50%': '-50%' }} className={style.overlayCard}>
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


