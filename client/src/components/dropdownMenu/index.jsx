import React, {useRef,useState} from 'react'
import style from  './dropdownMenu.module.scss'
import Icons from '../icons'

const DropdownMenu = ({children, placeholder, value, className}) => {
    const wrapperRef = useRef(null)
    const listRef = useRef(null)
    const [isToggle, setIsToggle] = useState(false)
    const toggleMenuHandler = e => {  
        if(isToggle) {
            wrapperRef.current.style.height = 0
            setIsToggle(false)
        }else {
            const menuHeight = listRef.current.getBoundingClientRect().height 
            wrapperRef.current.style.height = menuHeight + 'px'
            setIsToggle(true)
        }
    }

    return (
        <div className={`${style.dropdown} ${className && className}`}>
            <input value={value} type="text" className={style.dropdown__input} placeholder={placeholder}/>
            <Icons toggleHandler={toggleMenuHandler} name='select' width='18' height='18' className={style.dropdown__icon}/>
                <div className={style.dropdown__wrapper} ref={wrapperRef}>
                    <ul className={style.dropdown__list} ref={listRef}>
                       {children}
                    </ul>
                </div>
            
        </div>
    )
}

export default DropdownMenu
