import React, {useState, useRef, useEffect} from 'react'
import style from './channelDropMenu.module.scss'
import Icon from '../icons'
import {useParams, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ChannelDropMenu = () => {
    const [toggle, setToggle] = useState(false)
    const [activeChannel, setActiveChannel] = useState(null)
    const [nonActiveChannels, setNonActiveChannels] = useState(null)
    const wrapperRef = useRef(null)
    const listRef = useRef(null)
    const {id} = useParams()
    const history = useHistory()
    const {channels} = useSelector(state => state.channels)
    
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
    useEffect(() => {
        console.log(channels);
        if(channels && id) {
            const activeChannel = channels.find(ch => ch._id === id)
            const nonActiveChannels = channels.filter(ch => ch.id !== id)
            console.log(activeChannel);
            console.log(nonActiveChannels);
            setActiveChannel(activeChannel)
            setNonActiveChannels(nonActiveChannels)
        }
    }, [channels, history, id])
    return (
        <div className={style.channelDropMenu}>
            <div className={style.channelDropMenu__input}>
                <img className={style.channelDropMenu__img} src={activeChannel && `/api/uploads/${activeChannel.image}`} alt="channel" />
                <p className={style.channelDropMenu__title}>{`قناة ${activeChannel && activeChannel.name}`}</p>
                <Icon toggleHandler={listToggleHandler} name='select' width='20' height='20' className={style.channelDropMenu__icon}/>
            </div>
            <div className={style.channelDropMenu__wrapper} ref={wrapperRef}>
                <ul className={style.channelDropMenu__list} ref={listRef}>
                    {nonActiveChannels && nonActiveChannels.length > 0 && nonActiveChannels.map((ch, idx) => {
                        return <li key={idx} className={style.channelDropMenu__item}>
                            <img className={style.channelDropMenu__img} src={`/api/uploads/${ch.image}`} alt="channel" />
                            <p className={style.channelDropMenu__title}>{`قناة ${ch.name}`}</p>
                        </li>
                    })}
                </ul>
            </div>
           
        </div>
    )
}

export default ChannelDropMenu
