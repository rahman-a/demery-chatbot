import React, {useState} from 'react'
import style from './createChannel.module.scss'
import { Overlay } from '../overlay'
import { Modal } from '../Modal'
import {useDispatch, useSelector} from 'react-redux'
import {createChannel} from '../../actions/channelAction'
import Alert from 'react-bootstrap/Alert'
import Loader from '../Loader'

const CreateChannel = ({toggle, setToggle}) => {
    const [channelData, setChannelData] = useState({})
    const [formError, setFormError] = useState([])
    const [imageName, setImageName] = useState('Click here to Upload Image')
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const {loading, error, isCreated} = useSelector(state => state.channel)

    const getChannelData = e => {
        setFormError([])
        if(e.target.files && e.target.files.length > 0){
            setImageName(e.target.files[0].name)
            setImage(URL.createObjectURL(e.target.files[0]))
            setChannelData({...channelData, image:e.target.files[0]})
            return
        }
        const data = {[e.target.name]:e.target.value}
        setChannelData({...channelData, ...data})
    }
    
    const createChannelHandler = e => {
        e.preventDefault()
        const errors = []
        const channelKeys = Object.keys(channelData)
        if(channelKeys.length === 0){
            setFormError('Please Provide the Required Data')
            return
        }

        if(!(channelKeys.includes('name'))) {
            setFormError('Name is Required')
            return
        }
        if(!(channelKeys.includes('description'))) {
            setFormError('Description is Required')
            return
        }

        channelKeys.forEach(d => {
            if(!channelData[d]){
                errors.push(...formError, `${d} is Required`)
            }
        })

        if(errors.length) {
            errors.forEach(err => setFormError([...formError, err]))
            return
        }

        const data = new FormData()
        for(let key in channelData){
            data.append(key, channelData[key])
        }
        dispatch(createChannel(data))
    }

    return (
        <>
         <Overlay toggle={toggle}/>
         <Modal toggle={toggle} closeHandler={() => setToggle(false)} center>
            <div className={style.create}>
                {
                      loading ? <Loader size='20' center/>
                    : error   ? <Alert variant='danger'>{error}</Alert>
                    : formError.length  ? <Alert variant='danger'>{formError}</Alert>
                    : isCreated && <Alert variant='success'>The Channel has created</Alert>
                }
            <div className={style.create__edit}>
                <form className={style.create__form} onSubmit={createChannelHandler}>
                    <div className={style.create__formGroup}>
                        <label htmlFor="create-name">Channel Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        id="create-name"
                        onChange={(e) => getChannelData(e)}/>
                    </div>
                    <div className={style.create__formGroup}>
                        <label htmlFor="create-description">Channel Description</label>
                        <textarea 
                        name="description" 
                        id="create-description" 
                        cols="30" rows="10"
                        onChange={(e) => getChannelData(e)}></textarea>
                    </div>
                    <div className={style.create__formGroup}>
                        <button type="submit">Save</button>
                    </div>
                </form>
                <div className={style.create__figure}>
                    <div className={style.create__upload}>
                        <label htmlFor="upload">{imageName}</label>
                        <input 
                        type="file" 
                        name="image" 
                        id="upload" 
                        style={{display:'none'}}
                        onChange={(e) => getChannelData(e)}/>
                    </div>
                    <img src={image ? image : 'image/preview.png'} alt='preview' />
                </div>
            </div>
            </div>
        </Modal>  
        </>
    )
}

export default CreateChannel
