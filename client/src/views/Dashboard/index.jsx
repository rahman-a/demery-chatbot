import React, {useState, useEffect} from 'react'
import style from './dashboard.module.scss'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ChatTitles from '../../components/chatTitlesContainer'
import ChatCanvas from '../../components/chatCanvas'
import {ChatBlockProvider} from '../../context/blockData'
import {ChatOpsProvider} from '../../context/blockOps'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {getOneChannel} from '../../actions/channelAction'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'

const Dashboard = () => {
    const [sideNavToggle, setSideNavToggle] = useState(false)
    const {id} = useParams()
    const dispatch = useDispatch()
    const {loading, error} = useSelector(state => state.oneChannel)

    useEffect(() => {
        if(id){
            dispatch(getOneChannel(id))
        }
    }, [id, dispatch])
    return (
        <>
         <Navbar dashboard toggleHandler={() => setSideNavToggle(!sideNavToggle)}/>
        <div className={style.dashboard}>
            <Sidebar toggle={sideNavToggle}/>
            {loading
            ? <Loader size='25' center/>
            : error 
            ? <Alert variant='danger'>{error}</Alert>
            :<ChatBlockProvider>
                <ChatOpsProvider>
                    <ChatTitles/>
                    <ChatCanvas/>
                </ChatOpsProvider>
            </ChatBlockProvider>}
        </div>
        </>
    )
}

export default Dashboard
