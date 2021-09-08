import React, {useState, useEffect} from 'react'
import style from './createAccount.module.scss'
import { Overlay } from '../overlay'
import { Modal } from '../Modal'
import Alert from 'react-bootstrap/Alert'
import Loader from '../Loader'
import {useDispatch, useSelector} from 'react-redux'
import {createWriterAccount} from '../../actions/writerAction'
import {type} from '../../constants/writerConstants'

const CreateAccount = ({toggle, setToggle}) => {
    const [writerData, setWriterData] = useState({})
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formError, setFormError] = useState([])
    const [photoName, setPhotoName] = useState('Upload Personal Photo')
    const dispatch = useDispatch()
    const {loading, error, message} = useSelector(state => state.register)
    
    const getWriterData = e => {
        try {
            setFormError([])
            if(e.target.files && e.target.files.length > 0){
                setPhotoName(e.target.files[0].name)
                setWriterData({...writerData, avatar:e.target.files[0]})
                return
            }
            const data = {[e.target.name]:e.target.value}
            setWriterData({...writerData, ...data})
        } catch (error) {
            setFormError([error.message])
        }
        
    }

    const createAccountHandler = e => {
        e.preventDefault()
        setFormError([])
        const errors = []
        const writerArray = Object.keys(writerData)
        const required = ['userName', 'password', 'email']
        if(writerArray.length === 0) {
            setFormError([`Please provide the required data`])
            return
        }
        required.forEach(d => {
            if(!writerArray.includes(d)) {
                errors.push(`${d} is required`)
            }
        })
        if(errors.length > 0) {
            setFormError(errors)
            return 
        }

        if(writerData['password'] !== confirmPassword){
            setFormError(['password doesn\'t match please try again'])
            return
        }

        const data = new FormData()
        for(let key in writerData) {
            data.append(key, writerData[key])
        }
        dispatch(createWriterAccount(data))
        
        const copyWriterData = {...writerData}
        for(let key in copyWriterData){
            copyWriterData[key] = ''
        }
        
        setWriterData(copyWriterData)
        setConfirmPassword('')
        setPhotoName('Upload Personal Photo')
        
    }
    useEffect(() => {
        !toggle && dispatch({type:type.WRITER_CREATE_RESET})
    },[toggle,dispatch])
    return (
        <>
         <Overlay toggle={toggle}/>
         <Modal toggle={toggle} closeHandler={() => setToggle(false)} center>
            {formError.length > 0 
            && formError.map((err, idx) => (
            <Alert key={idx} variant='danger'>
                {err}
            </Alert>
            ))}
            {loading 
            ? <Loader/>
            : error 
            ? <Alert variant='danger'>{error}</Alert>
            : message && <Alert variant='success'>{message}</Alert>}
            <form className={style.account__form} onSubmit={createAccountHandler}>
                <div className={style.account__block}>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-username">User Name</label>
                        <input 
                        type="text" 
                        name="userName" 
                        id="account-username"
                        value={writerData['userName']}
                        onChange={(e) => getWriterData(e)}
                        placeholder="إسم المستخدم"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-name">Full Name</label>
                        <input 
                        type="text" 
                        name="fullName" 
                        id="account-name"
                        value={writerData['fullName']}
                        onChange={(e) => getWriterData(e)}
                        placeholder="الإسم كاملاً"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-phone">Phone Number</label>
                        <input 
                        type="tel" 
                        name="phone" 
                        id="account-phone"
                        value={writerData['phone']}
                        onChange={(e) => getWriterData(e)} 
                        placeholder="رقم الهاتف"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-pass">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="account-pass"
                        value={writerData['password']}
                        onChange={(e) => getWriterData(e)} 
                        placeholder="كلمةالسر"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <button type="submit">Save</button>
                    </div>
                </div>
                <div className={style.account__block}>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-email">E-mail Address</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="account-email"
                        value={writerData['email']}
                        onChange={(e) => getWriterData(e)}
                        placeholder="البريد الإلكترونى"/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label className={style.account__photo} htmlFor="account-photo">{photoName}</label>
                        <input 
                        onChange={(e) => getWriterData(e)} 
                        type="file" 
                        name="avatar" 
                        id="account-photo" hidden/>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-gender">Gender</label>
                        <input 
                        list='gender' 
                        type="text" 
                        name="gender" 
                        id="account-gender"
                        value={writerData['gender']}
                        onChange={(e) => getWriterData(e)} 
                        placeholder="الجنس"/>
                        <datalist id="gender">
                            <option value="male">ذكر</option>
                            <option value="female">أنثى</option>
                        </datalist>
                    </div>
                    <div className={style.account__formGroup}>
                        <label htmlFor="account-confirm">Confirm Password</label>
                        <input 
                        type="password" 
                        name="confirm"
                        value={confirmPassword} 
                        id="account-confirm"
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="تأكيد كلمة السر"/>
                    </div>
                </div>   
            </form>
        </Modal>   
        </>
    )
}

export default CreateAccount
