import React, {useRef, useEffect} from 'react'
import style from './sidebar.module.scss'
import Icon from '../icons'

const Sidebar = ({toggle, setDashType}) => {
    const sideRef = useRef(null)
    const nameRefs = useRef([])

    const setDashUI = type => {
        localStorage.setItem('dashType', type)
        setDashType(type)
    }
    useEffect(() => {
        if(toggle){
            sideRef.current.style.width = '15rem';
            setTimeout(() => {
                nameRefs.current.forEach(el => el.style.opacity = 1)
            },400);
        }else {
            setTimeout(() => {
                sideRef.current.style.width = 0;
            },200);
            nameRefs.current.forEach(el => el.style.opacity = 0)
        }
    },[toggle])
    return (
        <div className={style.sidebar}>
            <div className={style.sidebar__nav}>
                <div className={style.sidebar__block} onClick={() => setDashUI('canvas')}>
                    <Icon name='chat-block' className={style.sidebar__icon}/>
                </div>
                <div className={style.sidebar__block} onClick={() => setDashUI('timed')}>
                    <Icon name='hour-glass' className={style.sidebar__icon}/>
                </div>
                <div className={style.sidebar__block} onClick={() => setDashUI('stat')}>
                    <Icon name='chat-stats' className={style.sidebar__icon}/>
                </div>
                <div className={style.sidebar__block} onClick={() => setDashUI('keyword')}>
                    <Icon name='searching' className={style.sidebar__icon}/>
                </div>
            </div>
            <div className={style.sidebar__title} ref={sideRef}>
                <p 
                    className={style.sidebar__name} 
                    ref={el => nameRefs.current[0] = el}
                    onClick={() => setDashUI('canvas')}>
                    Chat Blocks
                </p>
                <p 
                    className={style.sidebar__name} 
                    ref={el => nameRefs.current[1] = el}
                    onClick={() => setDashUI('timed')}>
                    Timed Messages
                </p>
                <p 
                    className={style.sidebar__name} 
                    ref={el => nameRefs.current[2] = el}
                    onClick={() => setDashUI('stat')}>
                    Statistics
                </p>
                <p 
                    className={style.sidebar__name} 
                    ref={el => nameRefs.current[3] = el}
                    onClick={() => setDashUI('keyword')}>
                    Keywords
                </p>
            </div>
            
        </div>
    )
}

export default Sidebar
