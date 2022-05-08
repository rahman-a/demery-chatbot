import React, { useRef, useState, useEffect } from 'react'
import style from './style.module.scss'
import Icons from '../icons'
import TimedBlock from '../TimedBlock'
import {
  addTimedBlock,
  listTimedBlock,
} from '../../actions/timedBlocksAction'
import { useDispatch, useSelector } from 'react-redux'
import {
 useTimedState,
 useTimedDispatch
} from '../../context/timed'
import {
  TIMED_BLOCKS_ADD,
  TIMED_BLOCK_REMOVE,
  TIMED_BLOCKS_RESET
} from '../../context/actionTypes'
import { type } from '../../constants/timedBlockConstants'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const Schedule = () => {
  const suggestionRef = useRef(null)
  const listRef = useRef(null)
  const [createNew, setCreateNew] = useState(false)
  const [dateModal, setDateModal] = useState(false)
  const [blockId, setBlockId] = useState('')
  const [date, setDate] = useState()
  const [inputValue, setInputValue] = useState('')
  const [filteredBlocks, setFilteredBlocks] = useState([])
  const { id } = useParams()
  const dispatch = useDispatch()
  const timedDispatch = useTimedDispatch()
  const { blocks } = useSelector((state) => state.blocks)
  const {
    loading: add_loading,
    error: add_error,
    block,
  } = useSelector((state) => state.timedBlockAdded)
  const { isRemoved } = useSelector((state) => state.timedBlockRemoved)
  const {
    loading: bc_loading,
    error: bc_error,
    blocks: allTimedBlocks,
  } = useSelector((state) => state.timedBlocks)
  const {blocks: dialogueBlocks} = useSelector(state => state.timedDialogueBlocks)
  const { timedBlocks } = useTimedState()
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
  const setDateHandler = e => {
    console.log(e.target.value);
    const date =  new Date(e.target.value).toLocaleString("en-us", {timeZone:"EET"})
    console.log('Date', date);
    setDate(new Date(date))
  }
  const adjustBlockTimeHandler = id => {
    setBlockId(id)
    setCreateNew(false)
    setInputValue('')
    setDateModal(true)
  }
  const addTimedBlockHandler = _ => {
    setDateModal(false)
    const info = {
      channel: id,
      block: blockId,
      type: 'schedule',
      date: date,
    }
    dispatch(addTimedBlock(info))
  }

  const displayTimedBlocks = (_) => {
    timedDispatch({type: TIMED_BLOCKS_RESET})
    timedDispatch({ type: TIMED_BLOCKS_ADD, payload: allTimedBlocks })
    dispatch({ type: type.LIST_TIMED_BLOCK_RESET })
  }

  const displayOneTimedBlock = (_) => {
    timedDispatch({ type: TIMED_BLOCKS_ADD, payload: block })
    dispatch({ type: type.ADD_TIMED_BLOCK_RESET })
    bc_error && dispatch({ type: type.LIST_TIMED_BLOCK_RESET })
  }

  const removeBlockFromUI = (id) => {
    dispatch({ type: type.REMOVE_TIMED_BLOCK_RESET })
    timedDispatch({ type: TIMED_BLOCK_REMOVE, payload: id })
    timedBlocks.length === 1 && dispatch(listTimedBlock(id, 'schedule'))
  }

  useEffect(() => {
  (!allTimedBlocks || dialogueBlocks) && dispatch(listTimedBlock(id, 'schedule'))
    return () => {
        timedDispatch({type: TIMED_BLOCKS_RESET})
    }
    // eslint-disable-next-line
  }, [id, dialogueBlocks])

  useEffect(() => {
    allTimedBlocks
      ? displayTimedBlocks()
      : block && displayOneTimedBlock()
    isRemoved && removeBlockFromUI(isRemoved)
    // eslint-disable-next-line
  }, [block, allTimedBlocks, isRemoved])
  return (
    <>
    <Modal show={dateModal} onHide={() => setDateModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Define the Block Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input type="datetime-local" 
            name="date" 
            id="date" 
            onChange={(e) => setDateHandler(e)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={addTimedBlockHandler}>
            Add the Block
          </Button>
        </Modal.Footer>
    </Modal>
    <div className={style.schedule}>
      <div className={style.schedule__wrapper}>
        <div className={style.schedule__create}>
          <div
            className={style.schedule__create_box}
            style={{ display: createNew ? 'none' : 'grid' }}
            onClick={() => setCreateNew(true)}
          >
            <Icons name='plus-square' width='15' height='15' />
          </div>
          <div
            className={style.schedule__create_search}
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
              className={style.schedule__create_suggestions}
              ref={suggestionRef}
            >
              <ul className={style.schedule__create_list} ref={listRef}>
                {filteredBlocks &&
                  filteredBlocks.map((block) => (
                    <li
                      key={block._id}
                      className={style.schedule__create_item}
                      onClick={() => adjustBlockTimeHandler(block._id)}
                    >
                      {block.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={style.schedule__blocks}>
          {bc_loading ? (
            <Loader size='25' center />
          ) : bc_error ? (
            <h2 className={style.schedule__error}>{bc_error}</h2>
          ) : (
            timedBlocks &&
            timedBlocks.map((block) => (
              <TimedBlock block={block} key={block._id} timed/>
            ))
          )}
          {add_loading ? (
            <Loader size='10' />
          ) : (
            add_error && <TimedBlock block={{ content: add_error }} />
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Schedule
