import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import style from './profile.module.scss'
import Icon from '../../components/icons'
import profileData from '../../data/profile'
import ProfileInfo from '../../components/profileInfo'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {editWriterInfo} from '../../actions/writerAction'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const Profile = () => {
    const [info, setInfo] = useState({})
    const [formError, setFormError] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()
    const  {writer} = useSelector(state => state.info)
    const {loading, error, message} = useSelector(state => state.edit)

    const saveAccountHandler = _ => {
        setFormError(null)
        const writerData = Object.keys(info)
        if(writerData.length === 0){
            setFormError('No Data to Update')
            return
        }
       dispatch(editWriterInfo(info))
    }
    
    const imageUploadHandler = e => {
        const data = new FormData()
        data.append('avatar', e.target.files[0])
        dispatch(editWriterInfo(undefined, data))
    }

    return (
        <>

        <Navbar/>
        <div style={{
            textAlign:'center', 
            width:'50rem',
            position:'absolute',
            left:'30%',
            top:'8rem'}}>
            {
            error 
            ? <Alert variant='danger'>{error}</Alert>
            : formError
            ? <Alert variant='danger'>{formError}</Alert>
            : message && <Alert variant='success'>{message}</Alert>
            }
        </div>
        <div className={style.profile}>
            <div className="container">
                <span onClick={() => history.goBack()}>
                    <Icon name='back-arrow' className={style.profile__back}/>
                </span>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h2 className={style.profile__title}>Account Info</h2>
                    <div style={{display:'flex', alignItems:'center'}}>
                       {loading && <Loader size='4'/>}
                        {writer.isAdmin&&<Button 
                        variant='warning' 
                        style={{margin:'0 2rem', width:'10rem',height:'3rem'}}
                        onClick={saveAccountHandler}>
                            Save
                        </Button>}
                    </div>
                </div>
                <div className={style.profile__content}>
                    <div className={style.profile__info}>
                        {writer && profileData.map(p => <ProfileInfo 
                        key={p.id} 
                        type={p.type} 
                        label={p.label} 
                        data={writer[p.name]}
                        name={p.name}
                        setInfo={setInfo}
                        isAdmin={writer.isAdmin}
                        info={info}/>)}
                    </div>
                    <div className={style.profile__photo}>
                        <label 
                        htmlFor="profile_photo"
                        style={{cursor:!(writer.isAdmin) && 'unset'}}></label>
                        <input 
                        type="file" 
                        id='profile_photo'
                        disabled={!(writer.isAdmin)} 
                        onChange={(e) => imageUploadHandler(e)}/>
                        <img 
                        src={
                            (writer?.image) 
                            ? `/api/uploads/${writer?.image}` 
                            : '/image/user.png'} 
                            alt="writer" 
                            />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
