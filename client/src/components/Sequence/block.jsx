import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux'
import {removeTimedBlock, toggleTimedBlock} from '../../actions/timedBlocksAction'

const Block = ({data, error, group}) => {
    const [toggle, setToggle] = useState(null)
    const dispatch = useDispatch()
    const {toggle: tg_data} = useSelector(state => state.toggleBlock)

    const removeTimedBlockHandler = _ => {
        dispatch(removeTimedBlock(data._id, data.messageType, group))
    }

    const toggleBlockActivation = _ => {
        dispatch(toggleTimedBlock(data._id, group))
    }
    useEffect(() => {
        setToggle(data.isActive)
    }, [data, tg_data])
    return (
        error ? <p style={{color:'red'}}>{error}</p>
        :<div className={style.sequence__block}>
            <p className={style.sequence__block_day}>{data.day}</p>
            <div className={style.sequence__block_line}>
                <span> </span>
            </div>
            <div className={style.sequence__block_toggle}>
                <div onClick={toggleBlockActivation}> 
                    <span className={toggle 
                        ? style.sequence__block_toggle_on 
                        : style.sequence__block_toggle_off}
                        >
                    </span> 
                </div>
            </div>
            <div className={style.sequence__block_title}>
                {data.title || data.name}
            </div>
            <div className={style.sequence__block_delete}>
                <Button variant='danger' onClick={removeTimedBlockHandler}>Delete</Button>
            </div>
        </div>
    )
}

export default Block