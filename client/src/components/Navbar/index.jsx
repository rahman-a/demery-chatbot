import React, {useState, useEffect} from 'react'
import style from './navbar.module.scss'
import Icon from '../icons'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {writerLogout} from '../../actions/writerAction'
import Loader from '../Loader'

const Navbar = ({dashboard, toggleHandler}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [toggle, setToggle] = useState(false)
    const {loading, error} = useSelector(state => state.logout)
    const {writer} = useSelector(state => state.info)
    const {channel} = useSelector(state => state.oneChannel)
    
    const logoutHandler = _ => {
        dispatch(writerLogout())
    }
    return (
        <div className={style.navbar}>
            {dashboard 
            && <span onClick={toggleHandler} className={style.navbar__ham}>
                <Icon name='ham-menu' width='50' height='50' className={style.navbar__ham_icon}/>
            </span>}
            <div className='container'>
                <div className={style.navbar__wrapper}>
                    <div className={style.navbar__logo} onClick={() => history.push('/home')}>
                        <Icon className={style.navbar__icon} name='chatbot'/>
                    </div>
                    <div className={style.navbar__search}>
                        {dashboard
                        ? channel
                        ?<div className={style.navbar__channel}>
                            <p>{channel.name}</p>
                            <img src={`/api/uploads/${channel.image}`} alt='book'/>
                        </div>
                        : ''
                        :<form>
                            <input type="text" name='search'/>
                            <button type="submit" onClick={(e) => e.preventDefault()}>search</button>
                        </form>}
                    </div>
                    <div className={style.navbar__avatar}>
                        <img 
                        src={
                            writer.image 
                            ? `/api/uploads/${writer.image}`
                            : 'image/user.png'
                        } 
                        alt="avatar" onClick={() => setToggle(!toggle)}/>
                        {toggle && <ul className={style.navbar__list}>
                            <li><Link to='/profile'>Profile</Link></li>
                            {writer.isAdmin&&<li><Link to='/writers'>Writers</Link></li>}
                            <li onClick={logoutHandler}> 
                                {loading 
                                ? <Loader/>
                                : error 
                                ? <span style={{color:'red'}}>{error}</span>
                                :'Logout'}
                            </li>
                        </ul>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
