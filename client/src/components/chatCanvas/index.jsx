import React, {useState, useEffect} from 'react'
import style from './chatCanvas.module.scss'
import ObjectId from 'bson-objectid'
import ChatBlock from '../chatBlock'
import {useChatOpsDispatch, useChatOpsState} from '../../context/blockOps'
import {CHAT_OPS_CREATE, 
    CHAT_OPS_DELETE,
     CHAT_OPS_REMOVE_GALLERY_BLOCK ,
     CHAT_OPS_RESET
} from '../../context/actionTypes'
import { useSelector } from 'react-redux'

const ChatCanvas = () => {
    const [galleryBlocks, setGalleryBlocks] = useState([])
    const [collectGalleryData, setCollectGalleryData] = useState([])
    const [galleryName, setGalleryName] = useState('')
    const {blocks} = useSelector(state => state.blocks)
    const [actionBlocks, setActionBlocks] = useState([])
    const {blockOps} = useChatOpsState()
    const dispatch = useChatOpsDispatch()
    
        const createNewBlockHandler = (e, block) => {
            const type = e.target.textContent 
            
            if(!type && !block) return
                
            if(type === 'Gallery' && blockOps.length && !block) return

            if(!block && galleryBlocks.length) return

            const newBlock = block 
            ? {_id:ObjectId().toHexString(), type:block}
            : {_id:ObjectId().toHexString(), type:type}
            dispatch({type:CHAT_OPS_CREATE, payload:newBlock})
        }

        const actionsBlocksHandler = data => {
            const block = actionBlocks.find(b => b._id === data._id)
            if(!block){
                setActionBlocks([...actionBlocks, data])
                return
            }
            console.log('filtered');
            const filteredBlocks = actionBlocks.filter(b => b._id !== data._id)
            setActionBlocks([...filteredBlocks, data])
        }

        const deleteChatBlock = (e, id) => {
            e?.stopPropagation()
            galleryBlocks.length 
            ? dispatch({type:CHAT_OPS_REMOVE_GALLERY_BLOCK, payload:id})  
            :dispatch({type:CHAT_OPS_DELETE, payload:id})
            if(collectGalleryData.length) {
                const newBlocks = collectGalleryData.filter(b => b._id !== id)
                setCollectGalleryData(newBlocks)
            }
        }

        const clearCanvasHandler = _ => {
            dispatch({type:CHAT_OPS_RESET})
           setGalleryName('')
        }

    useEffect(() => {
        if(blockOps) {
            setGalleryBlocks(blockOps.filter(b => b.gallery?.length))
            if(blockOps.length && blockOps[0].gallery) {
                setCollectGalleryData(blockOps[0].gallery)
                setGalleryName(blockOps[0].name)
            }
        }
        if(blocks){
            if(actionBlocks.length){
                setActionBlocks(actionBlocks)
            }else {
                setActionBlocks(blocks)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[blockOps, blocks])
    return (
        <div className={style.chatCanvas}>
            <ul className={style.chatCanvas__create}>
                {/* <li onClick={(e) => createNewBlockHandler(e)}>Text</li> */}
                <li onClick={(e) => createNewBlockHandler(e)}>Interactive</li>
                <li onClick={(e) => createNewBlockHandler(e)}>Card</li>
                {/* <li onClick={(e) => createNewBlockHandler(e)}>Gallery</li> */}
            </ul>
            {(galleryBlocks.length > 0 || blockOps[0]?.type === 'Gallery') && <div className={style.chatCanvas__gallery}>
                <input type="text" 
                onChange={({target:{value}}) => setGalleryName(value)} 
                defaultValue={galleryName}
                placeholder='write the gallery title'/>
            </div>}
            <div className={style.chatCanvas__clear}>
                <button onClick={clearCanvasHandler}>Clear the Canvas</button>
            </div>
            <div className={style.chatCanvas__blocks}>
                {
                    blockOps && !(galleryBlocks.length)
                    ? blockOps.map((block, idx) => {
                        return <ChatBlock
                        key={block._id} 
                        data={block}
                        idx = {idx}
                        type={block.type}
                        galleryName={galleryName}
                        setGalleryName={setGalleryName}
                        blocks={blockOps}
                        actionBlocks={actionBlocks}
                        setActionBlocks={actionsBlocksHandler}
                        setCollectGalleryData={setCollectGalleryData}
                        collectGalleryData={collectGalleryData}
                        deleteHandler={(e) => deleteChatBlock(e, block._id)}/>
                    }) 
                    :blockOps && galleryBlocks.map((block) => {
                        return block.gallery.map((gal, idx) => {
                            return <ChatBlock
                            blockId={block._id}
                            key={gal._id}
                            idx={idx}
                            data={gal}
                            type={block.type}
                            blocks={block.gallery}
                            actionBlocks={actionBlocks}
                            setActionBlocks={actionsBlocksHandler}
                            galleryName={galleryName}
                            setGalleryName={setGalleryName}
                            setCollectGalleryData={setCollectGalleryData}
                            collectGalleryData={collectGalleryData}
                            deleteHandler={(e) => deleteChatBlock(e, gal._id)}
                            />
                        })
                    })
                }
            </div>         
        </div>
    )
}

export default ChatCanvas
