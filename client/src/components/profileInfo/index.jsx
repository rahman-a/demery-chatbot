import React, {useState, useRef} from 'react'
import style from './profileInfo.module.scss'
import Icon from '../icons'

const ProfileInfo = ({label, data, type,name, setInfo, info, isAdmin}) => {
    const dataRef = useRef(null)
    const [editable, setEditable] = useState(false)
    const [inputData, setInputData] = useState({})
    const [passwordOn, setPasswordOn] = useState(false)

    const editHandler = (type) => {
        if(type === 'edit'){
            setEditable(true)
            dataRef.current.disabled = false
            dataRef.current.focus()
        }else {
            setEditable(false)
            dataRef.current.disabled = true
            setInfo({...info, ...inputData})
        }
    }

    const passwordToggleHandler = _ => {
        if(passwordOn){
            setPasswordOn(false)
            dataRef.current.type = 'password'
        }else{
            setPasswordOn(true)
            dataRef.current.type = 'text'
        }
    }
    return (
    <div className={`${style.info} ${!isAdmin ? style.info__writer : ''}`}>
        <p className={style.info__label}>{label}</p>
        {type === 'select'
        ? <>
         <input  
         ref={dataRef}  
         list='gender' 
         type='text'
         name={name}
         defaultValue={data}
         onChange={(e) => setInputData({[e.target.name]:e.target.value})}
         disabled/>
        <datalist id="gender">
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
        </datalist>
        </>
        :type === 'password'
        ? <>
        <input 
        type={type} 
        className={style.info__data} 
        defaultValue={data} 
        ref={dataRef}
        name='password'
        onChange={(e) => setInputData({[e.target.name]:e.target.value})}
        disabled />
        {editable
        &&<span onClick={passwordToggleHandler} style={{cursor:'pointer', position:'absolute', left:'69%', top:'3px'}}>
            <Icon name={passwordOn ? 'eye-close':'eye-open'} width='16' height='16'/>
        </span>}
        </>
        :<input 
        type={type} 
        className={style.info__data} 
        defaultValue={data} 
        ref={dataRef}
        name={name}
        style={{width: !isAdmin && '35rem'}}
        onChange={(e) => setInputData({[e.target.name]:e.target.value})}
        disabled />}
        {isAdmin && <><button 
        style={{display:editable ? 'none':'inline'}} 
        onClick={(e) => editHandler('edit')} 
        className={style.info__edit}>
            Edit 
        </button>
        <button 
        style={{display:editable ? 'inline':'none'}} 
        onClick={(e) => editHandler('update')} 
        className={style.info__edit}>
            Update
        </button></>}
    </div>
    )
}

export default ProfileInfo
