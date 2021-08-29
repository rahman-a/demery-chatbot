import React, {useState} from 'react'
import style from './dashboard.module.scss'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ChatTitles from '../../components/chatTitlesContainer'
import ChatCanvas from '../../components/chatCanvas'
import {ChatBlockProvider} from '../../context/blockData'
import {ChatOpsProvider} from '../../context/blockOps'

const Dashboard = () => {
    const [sideNavToggle, setSideNavToggle] = useState(false)
    return (
        <>
         <Navbar dashboard toggleHandler={() => setSideNavToggle(!sideNavToggle)}/>
         <div className={style.dashboard}>
            <Sidebar toggle={sideNavToggle}/>
            <ChatBlockProvider>
                <ChatOpsProvider>
                    <ChatTitles/>
                    <ChatCanvas/>
                </ChatOpsProvider>
            </ChatBlockProvider>
        </div>   
        </>
    )
}

export default Dashboard
