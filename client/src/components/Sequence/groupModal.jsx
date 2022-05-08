import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Loader from '../Loader'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import {createSequence} from '../../actions/sequenceAction'
import { useParams } from 'react-router-dom'

const options = [
    {label:'Saturday', value:'saturday'},
    {label:'Sunday', value:'sunday'},
    {label:'Monday', value:'monday'},
    {label:'Tuesday', value:'tuesday'},
    {label:'Wednesday', value:'wednesday'},
    {label:'Thursday', value:'thursday'},
    {label:'Friday', value:'friday'}
]

const GroupModal = ({groupModal, setGroupModal}) => {
    const [groupData, setGroupData] = useState({})
    const [selectedDays, setSelectedDays] = useState([])
    const [formError, setFormError] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)
    const {id} = useParams()
    const dispatch = useDispatch()
    const {group, loading, error} = useSelector(state => state.sequenceGroup)
    
    const getGroupDataHandler = e => {
        const value = {[e.target.name]: e.target.value}
        setGroupData({...groupData, ...value})
    }
    
    const createSequenceGroup = _ => {
        const days = selectedDays.map(day => day.value)
        const data = {...groupData, days, channel:id}
        if(!(data.title) || data['title'] === ''){
            setFormError('Please Write The Group Name')
            return 
        }
        if(data.days.length < 1){
            setFormError('Please choose at lease one day')
            return 
        }
        setFormError(null)
        dispatch(createSequence(data))
    }

    const closeModalHandler = _ => {
        setSuccessMsg(null)
        setFormError(null)
        setGroupModal(false)
    }

    useEffect(() => {
        error && setFormError(error)
        group && setSuccessMsg('Group Has Been Created')
    }, [error, group])

    return (
        <Modal 
        show={groupModal} 
        onHide={() => setGroupModal(false)}
        size="lg"
        aria-labelledby="Create Group with Sequence Blocks"
        centered>
            <Modal.Header closeButton>
                <Modal.Title>Create New Sequence Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                   formError
                   ? <Alert 
                      variant='danger' 
                      onClose={() => setFormError(null)}
                      dismissible>
                          {formError}
                    </Alert>
                    : successMsg 
                    && <Alert variant='success' onClose={() => setSuccessMsg(null)} dismissible>
                        {successMsg}
                    </Alert>
                }
                {
                    loading && <Loader center size='8'/>
                }
                 <Form style={{position:'relative'}}>
                    {/* <div className={style.sequence__overlay}></div> */}
                    <Form.Group className='mb-3'>
                        <Form.Label>Enter the Group Name</Form.Label>
                        <Form.Control 
                        type='text' 
                        placeholder='Group Name'
                        name='title'
                        onChange={(e) => getGroupDataHandler(e)}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Enter the Group Description</Form.Label>
                        <Form.Control 
                        as='textarea' 
                        rows={3} 
                        placeholder='Group Description'
                        name='content'
                        onChange={(e) => getGroupDataHandler(e)}/>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Choose Week Days</Form.Label>
                        <Select options={options} isMulti onChange={setSelectedDays}/>
                    </Form.Group>
                 </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" 
                onClick={closeModalHandler}
                size='lg'>
                    Close
                </Button>
                <Button variant="primary" size='lg' onClick={createSequenceGroup}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GroupModal
