import React, {useState, useRef, useEffect} from 'react'
import style from './style.module.scss'
import Icons from '../icons'
import Modal from 'react-bootstrap/Modal'
import Loader from '../Loader'
import Block from './block'
import { useSelector, useDispatch } from 'react-redux'
import {
    addTimedBlock,
    listTimedBlock
} from '../../actions/timedBlocksAction'
import {
    useTimedState,
    useTimedDispatch
} from '../../context/timed'
import {
    TIMED_BLOCKS_ADD,
    TIMED_BLOCK_REMOVE,
    TIMED_BLOCK_TOGGLE,
    TIMED_BLOCKS_RESET
} from '../../context/actionTypes'
import { type } from '../../constants/timedBlockConstants'
import { useParams } from 'react-router'
import { Alert } from 'react-bootstrap'
import {defineWeekDay} from '../../utils'


const BlocksModal = ({blocksModal, setBlocksModal, group, days}) => {
    const [createNew, setCreateNew] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [filteredBlocks, setFilteredBlocks] = useState([])
    const listRef = useRef(null)
    const suggestionRef = useRef(null)
    const dispatch = useDispatch()
    const timedDispatch = useTimedDispatch()
    const { blocks } = useSelector((state) => state.blocks)
    const {loading, error, blocks: allTimedBlocks} = useSelector(state => state.timedBlocks)
    const {loading: add_loading,error: add_error, block} = useSelector((state) => state.timedBlockAdded)
    const {loading:tg_loading, error:tg_error, toggle} = useSelector(state => state.toggleBlock)
    const {loading:rm_loading, error:rm_error, isRemoved} = useSelector(state => state.timedBlockRemoved)
    const { timedBlocks } = useTimedState()
    const {id} = useParams()

    const toggleSuggestionHandler = (action) => {
        const listHeight = listRef.current.getBoundingClientRect().height
        action === 'show'
          ? (suggestionRef.current.style.height = listHeight + 'px')
          : (suggestionRef.current.style.height = 0)
    }

    const setItemsHandler = (e) => {
        toggleSuggestionHandler('show')
        const value = e.target.value
        setInputValue(value)
        const filteredBlocks = blocks.filter((block) => block.name.includes(value))
        setFilteredBlocks(filteredBlocks)
    }

    const defineBlockOrder = blocks => {
        return blocks.map(block => block.order)
                     .sort((a,b) => a - b)
                     [blocks.length - 1] + 1 
                     || 1
    }
    
    const addTimedBlockHandler = (blockId) => {
        console.log({timedBlocks});
        setCreateNew(false)
        setInputValue('')
        const info = {
          channel: id,
          block: blockId,
          type: 'sequence',
          day:defineWeekDay(timedBlocks, days),
          order:defineBlockOrder(timedBlocks),
          group
        }           
        dispatch(addTimedBlock(info))
    }

    const displayTimedBlocks = (_) => {
        console.log({allTimedBlocks});
        timedDispatch({type: TIMED_BLOCKS_RESET})
        timedDispatch({ type: TIMED_BLOCKS_ADD, payload: allTimedBlocks })
        dispatch({ type: type.LIST_TIMED_BLOCK_RESET })
      }
    
      const displayOneTimedBlock = (_) => {
        console.log({block});
        timedDispatch({ type: TIMED_BLOCKS_ADD, payload: block })
        dispatch({ type: type.ADD_TIMED_BLOCK_RESET })
        error && dispatch({ type: type.LIST_TIMED_BLOCK_RESET })
      }
    
      const removeBlockFromUI = (blockId) => {
        dispatch({ type: type.REMOVE_TIMED_BLOCK_RESET })
        timedDispatch({ type: TIMED_BLOCK_REMOVE, payload: blockId })
        timedBlocks.length === 1 && dispatch(listTimedBlock(id, 'sequence', group))
    }

    const toggleBlockActivation = toggleId => {
        dispatch({ type: type.TOGGLE_TIMED_BLOCK_RESET })
        timedDispatch({ type: TIMED_BLOCK_TOGGLE, payload: toggleId })
    }
    
    useEffect(() => {
        allTimedBlocks
        ? displayTimedBlocks()
        : block && displayOneTimedBlock()
        isRemoved && removeBlockFromUI(isRemoved)
        toggle && toggleBlockActivation(toggle)
        // eslint-disable-next-line
    }, [block, allTimedBlocks, isRemoved, toggle])
    return (
        <Modal show={blocksModal} 
        onHide={() => setBlocksModal(false)}
        size="lg"
        aria-labelledby="Create Sequence Blocks"
        centered>
            {(tg_loading || rm_loading) && <Loader size='8' top='15' center/>}
            <div className={style.sequence__wrapper} style={{margin:'5rem', zIndex:'99999999'}}>
                <span className={style.sequence__modal_close}
                onClick={() => setBlocksModal(false)}>
                    <Icons name='close-square' width='20' height='20'/> 
                </span>
                {(tg_error || rm_error) && <Alert variant='danger'>{tg_error || rm_error}</Alert>}
                <div className={style.sequence__create}>
                    <div
                        className={style.sequence__create_box}
                        style={{ display: createNew ? 'none' : 'grid' }}
                        onClick={() => setCreateNew(true)}
                    >
                        <Icons name='plus-square' width='15' height='15' />
                    </div>
                    <div
                        className={style.sequence__create_search}
                        style={{ display: createNew ? 'block' : 'none' }}
                    >
                        <span onClick={() => setCreateNew(false)}>&#x02190;</span>
                        <input
                        type='text'
                        placeholder='search by block name'
                        onBlur={toggleSuggestionHandler}
                        onChange={(e) => setItemsHandler(e)}
                        value={inputValue}
                        />
                        <div
                        className={style.sequence__create_suggestions}
                        ref={suggestionRef}
                        >
                        <ul className={style.sequence__create_list} ref={listRef}>
                            {filteredBlocks &&
                            filteredBlocks.map((block) => (
                                <li
                                key={block._id}
                                className={style.sequence__create_item}
                                onClick={() => addTimedBlockHandler(block._id)}
                                >
                                {block.name}
                                </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
                <div className={style.sequence__blocks}>
                    {
                        loading ? <Loader size='8' center/>
                        : error ? <h2 style={{left:'27%'}} className={style.sequence__error}>{error}</h2>
                        :timedBlocks && timedBlocks.map(block => <Block key={block._id} data={block} group={group}/>)
                    }
                    {add_loading ? (
                        <Loader size='5' />
                    ) : (
                    add_error && <Block error={add_error} />
                    )}
                </div>
            </div>     
        </Modal>
    )
}

export default BlocksModal
