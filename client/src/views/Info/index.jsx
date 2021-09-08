import React, {useEffect, useState} from 'react'
import Navbar from '../../components/Navbar'
import style from './style.module.scss'
import Icon from '../../components/icons'
import profileData from '../../data/profile'
import ProfileInfo from '../../components/profileInfo'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
    editWriterInfo, 
    getWriterInfoById,
    controlWriterAccess,
    deleteWriter
} from '../../actions/writerAction'
import {type} from '../../constants/writerConstants' 
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const Profile = () => {
    const [info, setInfo] = useState({})
    const [formError, setFormError] = useState(null)
    const history = useHistory()
    const {id} = useParams()
    const dispatch = useDispatch()
    const {loading:loading_ed, error:error_ed, message} = useSelector(state => state.edit)
    const {loading, error, writer} = useSelector(state => state.infoById)
    const {writer:writerInfo} = useSelector(state => state.info)
    const {message:message_ac} = useSelector(state => state.access)
    const {message:message_dl} = useSelector(state => state.delete)

    const saveAccountHandler = _ => {
        setFormError(null)
        const writerData = Object.keys(info)
        if(writerData.length === 0){
            setFormError('No Data to Update')
            return
        }
       dispatch(editWriterInfo(info, undefined, id))
    }
    const imageUploadHandler = e => {
        const data = new FormData()
        data.append('avatar', e.target.files[0])
        dispatch(editWriterInfo(undefined, data, id))
    }

    const deleteAccountHandler = _ => {
       dispatch(deleteWriter(id))
    }
    const blockAccountHandler = _ => {
       dispatch(controlWriterAccess(id))
    }
    useEffect(() => {
        id && dispatch(getWriterInfoById(id))
        if(message_dl) {
            dispatch({type: type.WRITER_DELETE_RESET})
            history.push('/writers') 
        }
    },[dispatch, id, message_ac, message_dl, history])
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
            error_ed 
            ? <Alert variant='danger'>{error_ed}</Alert>
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
                       {loading_ed && <Loader size='4'/>}
                        <Button 
                        variant='warning' 
                        style={{margin:'0 2rem', width:'10rem',height:'3rem'}}
                        onClick={saveAccountHandler}>
                            Save
                        </Button>
                        <Button 
                        variant='dark' 
                        style={{width:'10rem', height:'3rem', marginRight:'2rem', }}
                        onClick={blockAccountHandler}>
                            {writer?.isActive ? 'Block' : 'Unblock'}
                        </Button>
                        <Button 
                        variant='danger' 
                        style={{width:'10rem',height:'3rem'}}
                        onClick={deleteAccountHandler}>
                            Delete
                        </Button>
                    </div>
                </div>
                {loading 
                ?<Loader size='25' center/>
                :error
                ?<Alert variant='danger'>{error}</Alert>
                :<div className={style.profile__content}>
                    <div className={style.profile__info}>
                        {writer&& profileData.map(p => <ProfileInfo 
                        key={p.id} 
                        type={p.type} 
                        label={p.label} 
                        data={writer[p.name]}
                        name={p.name}
                        setInfo={setInfo}
                        isAdmin={writerInfo.isAdmin}
                        info={info}/>)}
                    </div>
                    <div className={style.profile__photo}>
                        <label htmlFor="profile_photo"></label>
                        <input type="file" id='profile_photo' onChange={(e) => imageUploadHandler(e)}/>
                        <img 
                        src={
                            (writer?.image) 
                            ? `/api/uploads/${writer?.image}` 
                            : '/image/user.png'} 
                            alt="writer" />
                    </div>
                </div>}
            </div>
        </div>
        </>
    )
}

export default Profile
