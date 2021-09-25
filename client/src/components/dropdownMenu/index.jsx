import React, {useRef,useState, useEffect} from 'react'
import style from  './dropdownMenu.module.scss'
import Icons from '../icons'

const DropdownMenu = ({children, placeholder, value, className, list, ...props}) => {
    const [inputValue, setInputValue] = useState('')
    const [inputItems, setInputItems] = useState([])
    const wrapperRef = useRef(null)
    const listRef = useRef(null)
    const [isToggle, setIsToggle] = useState(false)
    const toggleMenuHandler = slide => {  
        if(slide === 'up' || isToggle) {
            wrapperRef.current.style.height = 0
            setIsToggle(false)
        }else if(slide === 'down' || !isToggle){
            const menuHeight = listRef.current.getBoundingClientRect().height 
            wrapperRef.current.style.height = menuHeight + 'px'
            setIsToggle(true)
        }
    }
    const filterItemsHandler = e => {
        const item = e.target.value
        setInputValue(item)
        const items = list.filter(it => it.name.includes(item))
        setInputItems(items)
    } 
    useEffect(() => {
      setInputValue(value)
      setInputItems(list)
    }, [value, list])
    return (
        <div className={`${style.dropdown} ${className && className}`}>
            <input 
            value={inputValue} 
            type="text" 
            className={style.dropdown__input} 
            placeholder={placeholder}
            onChange={(e) => filterItemsHandler(e)}
            onFocus={() => toggleMenuHandler('down')}/>
            <Icons toggleHandler={toggleMenuHandler} name='select' width='18' height='18' className={style.dropdown__icon}/>
                <div className={style.dropdown__wrapper} ref={wrapperRef}>
                    <ul className={style.dropdown__list} ref={listRef}>
                       {list ? inputItems.map(item => <li key={item._id} 
                       onClick={() => {
                        props.setAction({name:item.name, _id:item._id})
                        props.sendActionHandler(item._id)
                        props.setSaveGBlock(true)
                        toggleMenuHandler('up')
                       }}>
                           {item.name}</li>)
                       :children}
                    </ul>
                </div>
            
        </div>
    )
}

export default DropdownMenu
