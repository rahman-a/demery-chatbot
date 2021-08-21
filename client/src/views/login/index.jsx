import React,{useState} from 'react'
import style from './login.module.scss'
import {Overlay} from '../../components/overlay'
import {Modal} from '../../components/Modal'
import Icon from '../../components/icons'

const Login = () => {
    const [formData, setFormData] = useState({})
    const [email, setEmail] = useState(' ') // this email for reset password
    const [forgetPassword, resetForgetPassword] = useState(false)
    const submitHandler = e => {
        e.preventDefault()
    }
    const setFormDataHandler = e => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    const resetPasswordHandler = _ => {
        console.log(email);
        setEmail(' ')
    }
    return (
        <>
        <Overlay toggle={forgetPassword}/>
        <Modal toggle={forgetPassword} closeHandler={() => resetForgetPassword(false)}>
            <div className={style.login__formGroup} style={{display:'flex'}}>
                <label htmlFor="email" className={style.login__label}>Enter your E-mail Address</label>
                <input onChange={({target:{value}}) => setEmail(value)} 
                type="email" 
                name="email" 
                id="email"
                value={email}
                placeholder="Enter your E-mail Address"
                style={{borderRadius:'1.6rem', paddingLeft:'1rem'}}/>
                <button style={{marginTop:'2rem', textAlign:'center', borderRadius:'1.6rem'}} className={style.login__submit} onClick={resetPasswordHandler}>Send</button>
            </div>
            <p style={{color:'#656565', fontWeight:'300'}}>The Reset Link will be sent to your E-mail within two hours and it will be valid for only 24hrs</p>
        </Modal>
        <div className={style.login}>
            <div className={style.login__logo}>
                <Icon name='chatbot' width="70" height='70' className={style.login__icon}/>
                <h1 className={style.login__header}>Chatbot Dashboard</h1>
            </div>
            <form className={style.login__form} onSubmit={submitHandler}>
                <div className={style.login__formGroup}>
                    <label htmlFor="username" className={style.login__label}>Username or E-mail Address</label>
                    <input onChange={(e) => setFormDataHandler(e)} 
                    type="text" 
                    name="username" 
                    id="username"
                    placeholder="Username or E-mail Address"/>
                </div>
                <div className={style.login__formGroup}>
                    <label htmlFor="password" className={style.login__label}>Password</label>
                    <input onChange={(e) => setFormDataHandler(e)} 
                    type="password" 
                    name="password" 
                    id="password"
                    placeholder="Password"/>
                </div>
                <div className={style.login__btn}>
                    <input type="submit" value="login"  className={style.login__submit}/>
                    <button onClick={() => resetForgetPassword(true)}>Forget Password?</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login
