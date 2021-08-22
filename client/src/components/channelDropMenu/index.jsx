import React, {useState, useRef} from 'react'
import style from './channelDropMenu.module.scss'
import Icon from '../icons'
const ChannelDropMenu = ({channels, activeChannelId}) => {
    const [toggle, setToggle] = useState(false)
    const wrapperRef = useRef(null)
    const listRef = useRef(null)
    const activeChannel = channels.find(ch => ch.id === activeChannelId)
    const nonActiveChannels = channels.filter(ch => ch.id !== activeChannelId)
    const listToggleHandler = _ => {
        const listHeight = listRef.current.getBoundingClientRect().height
        if(toggle){
            wrapperRef.current.style.height = 0
            setToggle(false)
        }else {
            wrapperRef.current.style.height = listHeight + 'px'
            setToggle(true)
        }
    }
    return (
        <div className={style.channelDropMenu}>
            <div className={style.channelDropMenu__input}>
                <img className={style.channelDropMenu__img} src={activeChannel.image} alt="channel" />
                <p className={style.channelDropMenu__title}>{`قناة ${activeChannel.name}`}</p>
                <Icon toggleHandler={listToggleHandler} name='select' width='20' height='20' className={style.channelDropMenu__icon}/>
            </div>
            <div className={style.channelDropMenu__wrapper} ref={wrapperRef}>
                <ul className={style.channelDropMenu__list} ref={listRef}>
                    {nonActiveChannels.map((ch, idx) => {
                        return <li key={idx} className={style.channelDropMenu__item}>
                            <img className={style.channelDropMenu__img} src={ch.image} alt="channel" />
                            <p className={style.channelDropMenu__title}>{`قناة ${ch.name}`}</p>
                        </li>
                    })}
                </ul>
            </div>
           
        </div>
    )
}

export default ChannelDropMenu
