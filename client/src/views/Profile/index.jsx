import React from 'react'
import Navbar from '../../components/Navbar'
import style from './profile.module.scss'
import Icon from '../../components/icons'

const Profile = () => {
    return (
        <>
        <Navbar/>
        
        <div className={style.profile}>
            <div className="container">
                <Icon width='30' height='30' name='back-arrow' className={style.profile__back}/>
            </div>
        </div>
        </>
    )
}

export default Profile
