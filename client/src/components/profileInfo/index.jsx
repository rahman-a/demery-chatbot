import React, {useState, useRef} from 'react'
import style from './profileInfo.module.scss'
import Icon from '../icons'

const ProfileInfo = ({label, data, type}) => {
    const dataRef = useRef(null)
    const [editable, setEditable] = useState(false)
    const [passwordOn, setPasswordOn] = useState(false)
    const [inputValue, setInputValue] = useState(data)

    const editHandler = (type) => {
        if(type === 'edit'){
            setEditable(true)
            dataRef.current.disabled = false
            dataRef.current.focus()
        }else {
            setEditable(false)
            dataRef.current.disabled = true
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
    <div className={style.info}>
        <p className={style.info__label}>{label}</p>
        {type === 'select'
        ? <>
         <input  
         ref={dataRef}  
         list='gender' 
         type='text'
         defaultValue={data}
         disabled/>
        <datalist id="gender">
            <option value="Male">ذكر</option>
            <option value="Female">أنثى</option>
        </datalist>
        </>
        :type === 'password'
        ? <>
        <input 
        type={type} 
        className={style.info__data} 
        defaultValue={inputValue} 
        ref={dataRef} 
        disabled />
        {editable
        &&<span onClick={passwordToggleHandler} style={{cursor:'pointer', position:'absolute', left:'69%', top:'3px'}}>
            <Icon name={passwordOn ? 'eye-close':'eye-open'} width='16' height='16'/>
        </span>}
        </>
        :<input 
        type={type} 
        className={style.info__data} 
        defaultValue={inputValue} 
        ref={dataRef} 
        disabled />}
        <button 
        style={{display:editable ? 'none':'inline'}} 
        onClick={(e) => editHandler('edit')} 
        className={style.info__edit}>
            Edit 
        </button>
        <button 
        style={{display:editable ? 'inline':'none'}} 
        onClick={(e) => editHandler('save')} 
        className={style.info__edit}>
            Save
        </button>
    </div>
    )
}

export default ProfileInfo
