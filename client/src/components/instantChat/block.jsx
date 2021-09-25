import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import {removeTimedBlock} from '../../actions/timedBlocksAction'
import {useDispatch, useSelector} from 'react-redux'
import {type} from '../../constants/timedBlockConstants'

const BroadcastingBlock = ({block}) => {
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
        <div className={style.instant__block} onClick={showDeleteHandler}>
            <div className={style.instant__delete} style={{display:toggleDelete ?'grid' :'none'}}>
                {loading 
                ? <Loader size='15' center/>
                :error
                && <Alert variant='danger'>{error}</Alert>}
                <div className={style.instant__delete_btn}>
                    <Button variant='danger'onClick={deleteBlockHandler}>Delete</Button>
                    <Button variant='light' onClick={cancelDeleteHandler}>Cancel</Button>
                </div>
            </div>
            <div className={style.instant__block_content}>
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

