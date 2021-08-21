import React from 'react'
import style from './dashboard.module.scss'
import Navbar from '../../components/Navbar'

const Dashboard = () => {
    return (
        <>
         <Navbar dashboard/>
         <div className={style.dashboard}>
            <h1>This is Dashboard</h1>
        </div>   
        </>
    )
}

export default Dashboard
