import React, {useState} from 'react'
import style from './dashboard.module.scss'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ChatTitles from '../../components/chatTitlesContainer'

const Dashboard = () => {
    const [sideNavToggle, setSideNavToggle] = useState(false)
    return (
        <>
         <Navbar dashboard toggleHandler={() => setSideNavToggle(!sideNavToggle)}/>
         <div className={style.dashboard}>
            <Sidebar toggle={sideNavToggle}/>
            <ChatTitles/>
        </div>   
        </>
    )
}

export default Dashboard
