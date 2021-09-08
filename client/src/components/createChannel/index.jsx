import React from 'react'
import style from './createChannel.module.scss'
import { Overlay } from '../overlay'
import { Modal } from '../Modal'

const CreateChannel = ({toggle, setToggle}) => {
    return (
        <>
         <Overlay toggle={toggle}/>
         <Modal toggle={toggle} closeHandler={() => setToggle(false)} center>
            <div className={style.create}>
            <div className={style.create__edit}>
                <form className={style.create__form}>
                    <div className={style.create__formGroup}>
                        <label htmlFor="create-name">Channel Name</label>
                        <input type="text" name="name" id="create-name"/>
                    </div>
                    <div className={style.create__formGroup}>
                        <label htmlFor="create-description">Channel Description</label>
                        <textarea name="description" id="create-description" cols="30" rows="10"></textarea>
                    </div>
                    <div className={style.create__formGroup}>
                        <button type="submit">Save</button>
                    </div>
                </form>
                <div className={style.create__figure}>
                    <div className={style.create__upload}>
                        <label htmlFor="upload">Click here to upload the image</label>
                        <input type="file" name="image" id="upload" style={{display:'none'}}/>
                    </div>
                    <img src='image/preview.png' alt='preview' />
                </div>
            </div>
            </div>
        </Modal>  
        </>
    )
}

export default CreateChannel
