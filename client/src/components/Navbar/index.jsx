import React, {useRef} from 'react'
import style from './navbar.module.scss'
import Icon from '../icons'
import ChannelDropMenu from '../channelDropMenu'
import channels from '../../data/channels'

const Navbar = ({dashboard, toggleHandler}) => {
    const listRef = useRef(null)
    // eslint-disable-next-line no-script-url
    const url = 'javascript:void(0)'
    const toggleList = _ => {
        if(parseInt(listRef.current.style.opacity) === 0 || isNaN(parseInt(listRef.current.style.opacity))) {
            listRef.current.style.opacity = '1'
        }else {
            listRef.current.style.opacity = 0 
        }
    }
    return (
        <div className={style.navbar}>
            {dashboard 
            && <span onClick={toggleHandler}>
                <Icon name='ham-menu' width='50' height='50' className={style.navbar__ham}/>
            </span>}
            <div className='container'>
                <div className={style.navbar__wrapper}>
                    <div className={style.navbar__logo}>
                        <Icon className={style.navbar__icon} name='chatbot'/>
                    </div>
                    <div className={style.navbar__search}>
                        { dashboard 
                        ? <ChannelDropMenu channels={channels} activeChannelId={1}/>
                        :<form>
                            <input type="text" name='search'/>
                            <button type="submit" onClick={(e) => e.preventDefault()}>search</button>
                        </form>}
                    </div>
                    <div className={style.navbar__avatar}>
                        <img src="image/avatar.png" alt="avatar" onClick={toggleList}/>
                        <ul className={style.navbar__list} ref={listRef}>
                            <li><a href={url}>Profile</a></li>
                            <li>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
