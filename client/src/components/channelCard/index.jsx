import React,{useState,useEffect} from 'react'
import style from './channelCard.module.scss'
import {Overlay} from '../overlay'
import {Modal} from '../Modal'
import {WithContext as ReactTag} from 'react-tag-input'
import {useHistory} from 'react-router-dom'
import {listAllWriters} from '../../actions/writerAction'
import {editChannel, removeChannel} from '../../actions/channelAction'
import {type} from '../../constants/channelConstants'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Icons from '../icons'


const ChannelCard = ({data}) => {
    const [toggle, setToggle] = useState(false)
    const [tags, setTags] = useState([])
    const [channelData, setChannelData] = useState({})
    const [channelImage, setChannelImage] = useState(null)
    const [formError, setFormError] = useState([])
    const [suggestions, setSuggestion] = useState([])
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [channelImageName, setChannelImageName] = useState('Click here to change photo')
    const dispatch = useDispatch()
    const {loading, error, success} = useSelector(state => state.channelEdit)
    const {loading:loading_wr, error:error_wr, writers} = useSelector(state => state.writers)
    const {loading:loading_dl, error:error_dl, success:success_dl} = useSelector(state => state.channelDelete)
    const {writer} = useSelector(state => state.info)
    const history = useHistory()
    
    const keyCode = {
        enter: 13
    }
    
    const delimiters = [keyCode.enter]

    const handleSubmit = e => {
        e.preventDefault()
        const errors = []
        const channelKeys = Object.keys(channelData)
        channelKeys.forEach(d => {
            if(!channelData[d]){
                errors.push(...formError, `${d} is Required`)
            }
        })

        if(errors.length) {
            errors.forEach(err => setFormError([...formError, err]))
            return
        }

        const editData = new FormData()
        for(let key in channelData){
            editData.append(key, channelData[key])
        }
        const writers = tags.map(tag => tag.id)
        editData.append('writers', writers)
        dispatch(editChannel(editData, data._id))
    }
    const toggleEditHandler = e => {
        e.stopPropagation()
        setToggle(true)
    }
    const handleAddition = newTag => {
        const newTags = [...tags, newTag]
        setTags(newTags)
    }
    const handleDelete = idx => {
        const newTags = tags.filter((tag, index) => index !== idx)
        setTags(newTags)
    }
    const handleInputChange = value => {
        dispatch(listAllWriters(value))
    }
    const getFormData = e => {
        const data = {[e.target.name]:e.target.value}
        setChannelData({...channelData, ...data})
    }
    const getImageHandler = e => {
        const img = e.target.files[0]
        setChannelImageName(img.name)
        setChannelImage(URL.createObjectURL(img))
        setChannelData({...channelData, image:img})
    }

    const deleteChannelHandler = e => {
      dispatch(removeChannel(data._id))
    }
    useEffect(() => {
            if(writers){
                setSuggestion(writers)
            }else if(loading_wr){
                setSuggestion([{id:'searching...', name:'searching...'}])
            }else if(error_wr){
                setSuggestion([{id:error_wr, name:error_wr}])
            }
            success_dl && console.log(success_dl)
    }, [writers,loading_wr,error_wr, success, loading, error, success_dl])
    return (
        <>
        <Overlay toggle={toggle || confirmDelete}/>
        <Modal toggle={confirmDelete} no_close closeHandler={() => setConfirmDelete(false)}>
            <div className={style.channel__delete}>
                {loading_dl 
                ? <Loader size='5'/>
                :error_dl
                ?<Alert variant='danger'>{error_dl}</Alert>
                : success_dl
                ? <Alert variant='success'>{success_dl}</Alert>
                :<h2>{`Delete The Channel ${data.name}`}</h2>}
                <div className={style.channel__delete_btn}>
                    <Button variant='danger' onClick={deleteChannelHandler}>Delete</Button>
                    <Button variant='light' onClick={() => {
                        dispatch({type: type.CHANNEL_DELETE_RESET})
                        setConfirmDelete(false)}
                        }>Cancel</Button>
                </div>
            </div>
        </Modal>
        <Modal toggle={toggle} closeHandler={() => setToggle(false)} center>
            {
                loading
                ? <Loader size='10'/>
                : error ? <Alert variant='danger'>{error}</Alert>
                : formError.length > 0 ? <Alert variant='danger'>{formError}</Alert>
                : success && <Alert variant='success'>{success}</Alert>
            }
            <div className={style.channel__edit}>
                <form className={style.channel__form} onSubmit={handleSubmit}>
                    <div className={style.channel__formGroup}>
                        <label htmlFor="channel-name">Channel Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="channel-name"
                        onChange={(e) => getFormData(e)} 
                        defaultValue={data.name}/>
                    </div>
                    <div className={style.channel__formGroup}>
                        <label htmlFor="channel-description">Channel Description</label>
                        <textarea 
                        defaultValue={data.description} 
                        name="description" 
                        id="channel-description"
                        onChange={(e) => getFormData(e)}  
                        cols="30" rows="10"></textarea>
                    </div>
                    <div className={style.channel__formGroup}>
                        <label htmlFor="channel-editor">Role Assign</label>
                        {/* <input type="text" name="editor" id="channel-editor" /> */}
                        <ReactTag
                        inputFieldPosition='bottom'
                        suggestions={suggestions}
                        classNames={{
                            remove:style.ReactTag__remove,
                            tag:style.ReactTag__tag,
                            suggestions:style.ReactTag__suggestions
                        }}
                        placeholder='أضف المحررين المصرح لهم'
                        labelField={'name'}
                        tags={tags}
                        delimiters={delimiters}
                        handleAddition={handleAddition}
                        handleDelete={handleDelete}
                        handleInputChange={handleInputChange}
                        />
                    </div>
                    <div className={style.channel__formGroup}>
                        <button className={style.channel__formGroup_btn} type="submit">Save</button>
                    </div>
                </form>
                <div className={style.channel__figure}>
                <div className={style.channel__upload}>
                        <label htmlFor="channel_upload">{channelImageName}</label>
                        <input 
                        type="file" 
                        name="image" 
                        id="channel_upload"
                        onChange={(e) => getImageHandler(e)}
                        />
                    </div>
                    <img src={
                        channelImage 
                        ? channelImage 
                        : data?.image 
                        ? `/api/uploads/${data.image}`
                        :'image/preview.png'} alt='' />
                </div>
            </div>
        </Modal>
        <div className={style.channel}
        style={{width: !(writer.isAdmin) && '43rem'}}
        onClick={() => history.push('/dashboard')}>
           {writer.isAdmin && <div className={style.channel__setting} onClick={(e) => toggleEditHandler(e)}>
               <Icons name='trash' eventHandler={(e) => {
                   e.stopPropagation()
                   setConfirmDelete(true)
                   }}/>
               <span></span><span></span><span></span>
            </div>} 
           <div className={style.channel__content} style={{marginRight: !(writer.isAdmin) && '2rem'}}>
               <h3>{data.name}</h3>
               <p>{data.description}</p>
            </div> 
           <figure className={style.channel__image}>
                <img src={
                    data?.image 
                    ?`/api/uploads/${data.image}`
                    :'image/preview.png'
                    } alt={data.name} />
            </figure> 
        </div></>
    )
}

export default ChannelCard
