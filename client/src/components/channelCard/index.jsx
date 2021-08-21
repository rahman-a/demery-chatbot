import React,{useState} from 'react'
import style from './channelCard.module.scss'
import {Overlay} from '../overlay'
import {Modal} from '../Modal'
import {WithContext as ReactTag} from 'react-tag-input'

const keyCode = {
    enter: 13
}

const delimiters = [keyCode.enter]

const ChannelCard = ({data}) => {
    const [toggle, setToggle] = useState(false)
    const [tags, setTags] = useState([])
    const suggestions = []
    
    const handleSubmit = e => {
        e.preventDefault()
        console.log(tags);
    }
    const toggleEditHandler = e => {
        e.stopPropagation()
        setToggle(true)
    }
    const handleAddition = newTag => {
        console.log('newTag');
        const newTags = [...tags, newTag]
        setTags(newTags)
    }
    const handleDelete = idx => {
        const newTags = tags.filter((tag, index) => index !== idx)
        setTags(newTags)
    }
    const handleInputChange = value => {
        // console.log(value);
    }
    return (
        <>
        <Overlay toggle={toggle}/>
        <Modal toggle={toggle} closeHandler={() => setToggle(false)}>
            <div className={style.channel__edit}>
                <form className={style.channel__form} onSubmit={handleSubmit}>
                    <div className={style.channel__formGroup}>
                        <label htmlFor="channel-name">Channel Name</label>
                        <input type="text" name="name" id="channel-name" defaultValue={data.name}/>
                    </div>
                    <div className={style.channel__formGroup}>
                        <label htmlFor="channel-description">Channel Description</label>
                        <textarea defaultValue={data.description} name="description" id="channel-description" cols="30" rows="10"></textarea>
                    </div>
                    <div className={style.channel__formGroup}>
                        <label htmlFor="channel-editor">Role Assign</label>
                        {/* <input type="text" name="editor" id="channel-editor" /> */}
                        <ReactTag
                        inputFieldPosition='bottom'
                        suggestions={suggestions}
                        classNames={{
                            remove:style.ReactTag__remove,
                            tag:style.ReactTag__tag
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
                    <img src={data.image} alt={data.name} />
                </div>
            </div>
        </Modal>
        <div className={style.channel} onClick={() => console.log('Channel Clicked')}>
           <div className={style.channel__setting} onClick={(e) => toggleEditHandler(e)}>
               <span></span><span></span><span></span>
            </div> 
           <div className={style.channel__content}>
               <h3>{data.name}</h3>
               <p>{data.description}</p>
            </div> 
           <figure className={style.channel__image}>
                <img src={data.image} alt={data.name} />
            </figure> 
        </div></>
    )
}

export default ChannelCard
