import React from 'react'
import Navbar from '../../components/Navbar'
import style from './profile.module.scss'
import Icon from '../../components/icons'
import profileData from '../../data/profile'
import ProfileInfo from '../../components/profileInfo'

const Profile = () => {
    return (
        <>
        <Navbar/>
        
        <div className={style.profile}>
            <div className="container">
                <Icon name='back-arrow' className={style.profile__back}/>
                <h2 className={style.profile__title}>Account Info</h2>
                <div className={style.profile__content}>
                    <div className={style.profile__info}>
                        {profileData.map(p => <ProfileInfo key={p.id} type={p.type} label={p.label} data={p.data}/>)}
                    </div>
                    <div className={style.profile__photo}>
                        <label htmlFor="profile_photo"></label>
                        <input type="file" id='profile_photo'/>
                        <img src="image/avatar.png" alt="personal" />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
