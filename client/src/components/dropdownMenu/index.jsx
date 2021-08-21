import React, {useRef} from 'react'
import style from  './dropdownMenu.module.scss'
import Icons from '../icons'

const DropdownMenu = ({children, placeholder, value}) => {
    const wrapperRef = useRef(null)
    const listRef = useRef(null)
    const toggleMenuHandler = e => {
        if(parseInt(wrapperRef.current.style.height) <= 0) {
            const menuHeight = listRef.current.getBoundingClientRect().height 
            wrapperRef.current.style.height = menuHeight + 'px'
        }else {
            wrapperRef.current.style.height = 0
        }
    }
    return (
        <div className={style.dropdown}>
            <input defaultValue={value} type="text" className={style.dropdown__input} placeholder={placeholder}/>
            <Icons toggleHandler={toggleMenuHandler} name='select' width='20' height='20' className={style.dropdown__icon}/>
                <div className={style.dropdown__wrapper} ref={wrapperRef}>
                    <ul className={style.dropdown__list} ref={listRef}>
                       {children}
                    </ul>
                </div>
            
        </div>
    )
}

export default DropdownMenu
