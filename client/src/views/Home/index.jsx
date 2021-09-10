import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar'
import style from './home.module.scss'
import ChannelCard from '../../components/channelCard'
import CreateChannel from '../../components/createChannel'
import CreateAccount from '../../components/createAccount'
import {useDispatch, useSelector} from 'react-redux'
import {listChannels} from '../../actions/writerAction'
import {useHistory} from 'react-router-dom'
import Loader from '../../components/Loader'

const Home = () => {
    const [createToggle, setCreateToggle] = useState(false)
    const [accountToggle, setAccountToggle] = useState(false)
    const dispatch = useDispatch()
    const {loading, error, channels} = useSelector(state => state.channels)
    const {success} = useSelector(state => state.channelEdit)
    const {success:success_dl} = useSelector(state => state.channelDelete)
    const {isCreated} = useSelector(state => state.channel)

    const history = useHistory()
    const {isAuth}  = useSelector(state => state.writer)
    const {writer}  = useSelector(state => state.info)
    
    useEffect(() => {
        !isAuth && history.push('/')
        dispatch(listChannels(writer._id))
    },[isAuth, history, dispatch, writer, isCreated, success_dl, success])
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
                {loading
                ? <Loader size='25' center/>
                : error 
                ? <h1 className={style.home__none}>{error}</h1>
                :<div className={style.home__channels}>
                    {channels && channels.map(ch => <ChannelCard key={ch._id} data={ch}/>)}
                </div>}
             </div>
        </div> 
        </>
    )
}

export default Home
