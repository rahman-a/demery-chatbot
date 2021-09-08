import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar'
import style from './home.module.scss'
import ChannelCard from '../../components/channelCard'
import CreateChannel from '../../components/createChannel'
import CreateAccount from '../../components/createAccount'
import channels from '../../data/channels'
import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
const Home = () => {
    const [createToggle, setCreateToggle] = useState(false)
    const [accountToggle, setAccountToggle] = useState(false)
    const history = useHistory()
    const {isAuth}  = useSelector(state => state.writer)
    const {writer}  = useSelector(state => state.info)
    
    useEffect(() => {
        !isAuth && history.push('/')
    },[isAuth, history])
    return (
        <>
        <Navbar/>
        <CreateChannel toggle={createToggle} setToggle={setCreateToggle}/>
        <CreateAccount toggle={accountToggle} setToggle={setAccountToggle}/>
         <div className={style.home__action}>
             <div className="container">
                {writer.isAdmin&&<><button 
                onClick={() => setCreateToggle(true)} 
                className={style.home__action_btn}>
                    Create Channel
                </button>
                <button 
                onClick={() => setAccountToggle(true)} 
                className={style.home__action_btn}>
                    Create Account
                </button></>}
                <div className={style.home__channels}>
                    {channels.map(ch => <ChannelCard key={ch.id} data={ch}/>)}
                </div>
             </div>
        </div> 
        </>
    )
}

export default Home
