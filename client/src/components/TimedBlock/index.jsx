import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import {removeTimedBlock,listTimedBlock} from '../../actions/timedBlocksAction'
import {deleteSequence} from '../../actions/sequenceAction'
import {useDispatch, useSelector} from 'react-redux'
import {type} from '../../constants/timedBlockConstants'
import {useTimedDispatch} from '../../context/timed'
import {TIMED_BLOCKS_RESET} from '../../context/actionTypes'
import { useParams } from 'react-router'

const BroadcastingBlock = ({
    block, 
    timed, 
    blocksModal, 
    setGroupId, 
    setGroupsDays}) => {
    const [toggleDelete, setToggleDelete] = useState(false)
    const {loading, error} = useSelector(state => state.timedBlockRemoved)
    const {loading: loading_gr, error: error_gr} = useSelector(state => state.sequenceGroupRemoved)
    const {blocks: dialogueBlocks} = useSelector(state => state.timedDialogueBlocks)
    const {blocks: allTimedBlocks} = useSelector(state => state.timedBlocks)
    const {id} = useParams()
    const dispatch = useDispatch()
    const timedDispatch = useTimedDispatch()
    const showDeleteHandler = _ => {
        setToggleDelete(true)
    }
    const deleteBlockHandler = _ => {
        blocksModal ? dispatch(deleteSequence(block._id))
        :dispatch(removeTimedBlock(block._id, block.messageType))     
    }
    const cancelDeleteHandler = e => {
        e.stopPropagation()
        setToggleDelete(false)
    }
    const fetchSequenceBlocks = _ => {
        (!allTimedBlocks || dialogueBlocks) 
        && dispatch(listTimedBlock(id, 'sequence', block._id))
    }
    const showBlocksModalHandler = _ => {
        timedDispatch({type: TIMED_BLOCKS_RESET})
        fetchSequenceBlocks()
        setGroupId(block._id)
        setGroupsDays(block.days)
        blocksModal(true)
    }
    useEffect(() => {
        error && dispatch({type: type.REMOVE_TIMED_BLOCK_RESET})
        // eslint-disable-next-line
    }, [error])
    return (
        <>
        <div className={style.timedBlock__block} onClick={showDeleteHandler}>
            {
                (timed || block.days) && 
                <div className={style.timedBlock__date}>
                   { timed ? <p>
                        {block.sent ? 'sent' : 'start'} at &nbsp;
                        <span style={{color: block.sent ? 'green':'crimson'}}>
                            {
                            new Date(block.date).toLocaleString()
                            }
                        </span> 
                    </p> 
                    : <p>
                        {block.days.map(day => <span className={style.timedBlock__days}>{day}</span>)}
                    </p>
                    }
                </div>
            }
            <div className={style.timedBlock__delete} style={{display:toggleDelete ?'grid' :'none'}}>
                {(loading || loading_gr) 
                ? <Loader size='8' center/>
                :(error || error_gr)
                && <Alert variant='danger'>{error || error_gr}</Alert>}
                <div className={style.timedBlock__delete_btn}>
                   {blocksModal && <Button 
                    variant='primary' 
                    className='mb-3' 
                    onClick={showBlocksModalHandler}>
                        Blocks
                    </Button>
                    }
                    <Button variant='light' onClick={cancelDeleteHandler}>Cancel</Button>
                    <Button variant='danger'onClick={deleteBlockHandler}>Delete</Button>
                </div>
            </div>
            <div className={style.timedBlock__block_content}
            style={{borderRadius: !(timed || (block.days)) && '1rem'}}>
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

