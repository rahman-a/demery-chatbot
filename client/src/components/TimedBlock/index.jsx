import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import {removeTimedBlock} from '../../actions/timedBlocksAction'
import {useDispatch, useSelector} from 'react-redux'
import {type} from '../../constants/timedBlockConstants'

const BroadcastingBlock = ({block, timed}) => {
    const [toggleDelete, setToggleDelete] = useState(false)
    const {loading, error} = useSelector(state => state.timedBlockRemoved)
    const dispatch = useDispatch()
    const showDeleteHandler = _ => {
        setToggleDelete(true)
    }
    const deleteBlockHandler = _ => {
        dispatch(removeTimedBlock(block._id))     
    }
    const cancelDeleteHandler = e => {
        e.stopPropagation()
        setToggleDelete(false)
    }
    
    useEffect(() => {
        error && dispatch({type: type.REMOVE_TIMED_BLOCK_RESET})
    }, [error])
    return (
        <>
        <div className={style.timedBlock__block} onClick={showDeleteHandler}>
            {
                timed &&
                <div className={style.timedBlock__date}>
                    <p>
                        {block.sent ? 'sent' : 'start'} at &nbsp;
                        <span style={{color: block.sent ? 'green':'crimson'}}>
                            {
                            new Date(block.date).toLocaleString()
                            }
                        </span> 
                    </p>
                </div>
            }
            <div className={style.timedBlock__delete} style={{display:toggleDelete ?'grid' :'none'}}>
                {loading 
                ? <Loader size='15' center/>
                :error
                && <Alert variant='danger'>{error}</Alert>}
                <div className={style.timedBlock__delete_btn}>
                    <Button variant='danger'onClick={deleteBlockHandler}>Delete</Button>
                    <Button variant='light' onClick={cancelDeleteHandler}>Cancel</Button>
                </div>
            </div>
            <div className={style.timedBlock__block_content}
            style={{borderRadius: !timed && '1rem'}}>
                {block.title 
                && <h3>{block.title}</h3>}
                <p>
                    {block.content}
                </p>
            </div>
        </div></>
    )
}

export default BroadcastingBlock

