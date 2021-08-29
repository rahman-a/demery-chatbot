import React from 'react'
import style from './blockAlert.module.scss'
import Icon from '../icons'

const BlockAlert = ({alert, setAlert}) => {
    return (
        <div className={style.alert} 
        style={{top:alert ?'1rem' : '-4rem', visibility: alert ? 'visible' :'hidden'}}>
            <p>{alert}</p>
            <span style={{position:'absolute', right:'1.5rem', cursor:'pointer'}}
            onClick={() => setAlert('')}>
                <Icon name='close-square' width='15' height='15'/>
            </span>
        </div>
    )
}

export default BlockAlert
