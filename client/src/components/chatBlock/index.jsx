import React, {useState,useEffect} from 'react'
import style from './chatBlock.module.scss'
import BlockCTS from '../blockCTA'
import Icon from '../icons'
import ObjectID  from 'bson-objectid'
import {useDrag} from 'react-use-gesture'
import {useChatOpsDispatch, useChatOpsState} from '../../context/blockOps'
import {
    CHAT_OPS_CREATE, 
    CHAT_OPS_ADD_GALLERY_BLOCK, 
    CHAT_OPS_RESET
} from '../../context/actionTypes'
import BlockAlert from '../blockAlert'
import { useSelector,useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import {createBlock, editBlock} from '../../actions/blockAction'
import Loader from '../Loader'

const ChatBlock = ({
    blocks, 
    idx, 
    deleteHandler,
    data, 
    type,
    collectGalleryData,
    setCollectGalleryData,
    galleryName,
    setGalleryName,
    blockId,
    actionBlocks,
    setActionBlocks
}) => {
    const [blockData, setBlockData] = useState({
        name:'',
        image:'',
        title:'',
        content:'',
    })
    const [actionBtns, setActionBtns] = useState([])
    const [CTAs,setCTAs] = useState([{_id:ObjectID().toHexString()}])
    const [langName, setLangName] = useState('AR')
    const [blockPos, setBlockPos] = useState({x:0, y:0})
    const [isAR, setIsAR] = useState(true)
    const [alert, setAlert] = useState('')
    const [initOn, setInitOn] = useState(false)
    const {id}  = useParams()
    const {writer} = useSelector(state => state.info)
    const [imageSRC, setImageSRC] = useState('/image/preview.png')
    const [saveGBlock, setSaveGBlock] = useState(false)
    const dispatch = useChatOpsDispatch()
    const {blockOps} = useChatOpsState()
    const blockDispatch = useDispatch()
    const {channel} = useSelector(state => state.oneChannel)
    const {loading, error} = useSelector(state => state.newBlock)
    const moveChatBlock = useDrag(params => {
        setBlockPos({
            x:params.offset[0],
            y:params.offset[1]
        })
    })
    
    const langChangeHandler = _ => {
        if(isAR) {
            setLangName('EN')
            setIsAR(false)
        }else {
            setLangName('AR')
            setIsAR(true)
        }
    }

    const createNextBlockHandler = _ => {
        if(!saveGBlock) {
            blocks.find(block => block.buttons) 
            ? dispatch({type:CHAT_OPS_ADD_GALLERY_BLOCK, payload:{_id:ObjectID().toHexString(), type:'Gallery'}})
            : dispatch({type:CHAT_OPS_CREATE, payload:{_id:ObjectID().toHexString(), type:'Gallery'}})
        }else {
            setAlert(isAR ?'اضغط على حفظ اولا قبل الضغط على التالى' : 'click save first before click next')
        }
    }

    const addNewCTA = _ => {
        const newCTAs = [...CTAs, {_id:ObjectID().toHexString()}]
        setCTAs(newCTAs)
    }
    const removeCTA = id => {
        if(CTAs.length > 1){
            const newCTA = CTAs.filter(ct => ct._id !== id)
            const btnData = actionBtns.filter(action => action._id !== id)
            setCTAs(newCTA)
            setActionBtns(btnData)
        }
    }

    const getBlockDataHandler = e => {
            setSaveGBlock(true)
            if(e.target.files){
                try {
                    setImageSRC(URL.createObjectURL(e.target.files[0]))  
                } catch (error) {
                    setAlert(isAR ? 'حدث خطأ ما من فضلك حاول مجددا' : 'something happened please try again')
                }
                const image = e.target.files[0]
                setBlockData({...blockData,image})
            }else {
                const inputData = {[e.target.name] : e.target.value}
                setBlockData({...blockData,...inputData})
            }
        }


    const saveGalleryBlockHandler = _ => {
        const chatData = collectBlockDataHandler()
        if(chatData){
            const chatBlockGalleryData = collectGalleryData.filter(block => block._id !== chatData._id)
            setCollectGalleryData([...chatBlockGalleryData, chatData])
            setSaveGBlock(false) 
        }
    }

    const saveBlockDataHandler = _ => {
        const chatData = collectBlockDataHandler()
        if(chatData) {
            if(type === 'Gallery') {
                if(!galleryName) {
                    setAlert(isAR ?'من فضلك اكتب اسم الجاليرى' : 'please write the gallery name')
                    return
                }
                if(!saveGBlock) {
                    const galleryData = {
                        _id:blockId ? blockId :ObjectID().toHexString(),
                        type:'Gallery',
                        name:galleryName,
                        abbr:'GL',
                        creator:writer._id,
                        channel:id,
                        gallery:collectGalleryData
                    }
                    // blockDispatch({type:CHAT_BLOCK_CREATE, payload:galleryData})
                    setCollectGalleryData([])
                    dispatch({type:CHAT_OPS_RESET})
                    setGalleryName('')
                }else {
                    setAlert(isAR ?'اضغط على حفظ اولا قبل الضغط على تم' : 'click save first before click done')
                }
            }else {
                const JSONData = new FormData()
                for(let key in chatData){
                    if(key === 'buttons'){
                        JSONData.append(key, JSON.stringify(chatData[key]))
                    }else{
                        JSONData.append(key, chatData[key])
                    }
                }
                const block = blockOps.find(block => block._id === chatData._id)
                if(block.buttons){
                    console.log(JSONData);
                    blockDispatch(editBlock(JSONData))
                }else {
                    blockDispatch(createBlock(JSONData))
                }
                deleteHandler(undefined ,chatData._id)
            }
        }
        
    }

    const collectBlockDataHandler = _ => { 
        const allAbbr = {
            Text:'TX',
            Card:'CD',
            Interactive:'IX',
            Gallery:'GL'
        }
        const chatData =  {
            ...blockData,
            buttons:actionBtns,
            _id: blockData._id ? blockData._id : data._id,
            type,
            creator:writer._id,
            channel:id,
            role: initOn ? 'init':'',
            abbr:allAbbr[type]
        }
        for(let key in chatData) {
            switch(type) {
                case 'Text':
                case 'Interactive':
                    if((key === 'name' || key === 'content') && chatData[key] === '') {
                        return setAlert(`please fill the ${key} input`)
                    }
                    break;
                case 'Card':
                case 'Gallery':
                    if(key !== 'title' 
                    && key !== 'role' 
                    && chatData[key] === '')
                    {
                        key === 'image' 
                        ? setAlert(`please upload an image`) 
                        :setAlert(`please fill the ${key} input`)
                        return
                    }
                    break;
                default:
                    break;
            }
                
        }
        if(!(type === 'Text') &&!(chatData.buttons.length)) {
            setAlert(`please create at least one button`)
            return
        }
        return chatData
    }

    useEffect(() => {
        if(data.buttons) { 
            setCTAs(data.buttons)
            setActionBtns(data.buttons)
            setBlockData(data)
        }
    },[data,blocks,galleryName])

    
    return (
        <>
        {
            loading 
            ? <Loader size='35' center/>
            : error && setAlert(error)
        }
        <div 
        className={`${style.chatBlock} ${isAR ?style.chatBlock__change_lang : ''}`}
        {...moveChatBlock()}
        style={{
            top:blockPos.y > - 20 ? blockPos.y : -20,
            left:blockPos.x > - 15 ? blockPos.x : -15
        }}>
           <BlockAlert alert={alert} setAlert={setAlert}/>
           <div className={style.chatBlock__name} >
               <input 
               type="text" 
               name='name' 
               placeholder={isAR ?'أكتب اسم البلوك هنا':'write the block name'} 
               defaultValue={data ? data.name : ''}
               onChange={(e) => {
                   getBlockDataHandler(e)
                   setActionBlocks({_id:data._id, type, name:e.target.value})
                }}/>

               {data.type === 'Gallery' 
               && !(idx === blocks.length - 1) 
               && <span 
               className={style.chatBlock__order}>
                   Card {idx + 1}
                </span>}
               
               {data.type === 'Gallery' 
               && (idx === blocks.length - 1)
               && <button 
               className={style.chatBlock__done}
               onClick={createNextBlockHandler}>
                   {isAR ? 'التالى':'Next'}
                </button>}
               
               {data.type === 'Gallery' 
               ? idx === 0 ? '' 
               :idx === blocks.length - 1 
               ? <button 
               className={style.chatBlock__done} 
               onClick={saveBlockDataHandler}>
                   {isAR ?'تم' :'Done'}
                </button>
               :''
               :<button 
               className={style.chatBlock__done} 
               onClick={saveBlockDataHandler}>
                   {isAR ?'تم' :'Done'}
               </button>}
           </div>

           <div className={style.chatBlock__block}>
               <figure 
               className={`${style.chatBlock__avatar} ${data.type === 'Text' ? style.chatBlock__msg : ''}`}>
                   <img src={channel ? `/api/uploads/${channel.image}` :'/image/user.png'} 
                   style={{width:'3rem', clipPath:'circle()'}} alt="" />
                   <button onClick={langChangeHandler} className={style.chatBlock__lang}>{langName}</button>
                   <span className={style.chatBlock__remove} onClick={(e) => deleteHandler(e)}>
                       <Icon name='trash'/>
                   </span>
                   <p
                   onClick={() => setInitOn(!initOn)}
                   className={`${style.chatBlock__init} ${initOn ? style.chatBlock__init_on : ''}`}>
                       INIT
                    </p>
                   { data.type === 'Gallery' 
                    && saveGBlock &&
                        <button 
                        className={style.chatBlock__save}
                        onClick={saveGalleryBlockHandler}>
                            {isAR ? 'حفظ':'Save'}
                        </button>
                    }
               </figure>

               {data.type === 'Text' 
               ? <div className={style.chatBlock__message}>
                   <input 
                   type="text" 
                   name='content' 
                   placeholder={isAR ? 'أكتب الرسالة هنا':'write your message'}
                   defaultValue={data && data.abbr === 'TX' ? data.content: ''}
                   onChange={(e) => getBlockDataHandler(e)}/>
                   </div>
               :<div className={style.chatBlock__content}>
                   {!(data.type === 'Interactive') && <figure className={style.chatBlock__img}>
                       <div className={style.chatBlock__upload}>
                           <label htmlFor={`upload-${idx}`}>{ isAR ?'اضغط هنا لرفع الصورة':'click to upload image'}</label>
                           <input type="file" id={`upload-${idx}`} 
                           onChange={(e) => getBlockDataHandler(e)}/>
                       </div>
                       <img src={data && data.image && (data.abbr === 'CD' || data.abbr === 'GL') 
                       ? `/api/uploads/${data.image}` 
                       :imageSRC} 
                       alt="preview"/>
                   </figure>}

                   <div className={style.chatBlock__title}>
                       <input 
                       type="text" 
                       name='title' 
                       placeholder={isAR ?'اكتب العنوان هنا':'write the title'}
                       defaultValue={data && !(data.abbr === 'TX') ? data.title: ''}
                       onChange={(e) => getBlockDataHandler(e)}/>
                   </div>

                   <div className={style.chatBlock__desc}>
                       <textarea 
                       name='content' 
                       placeholder={isAR ? 'اكتب المحتوى هنا' :'write the content'}
                       defaultValue={data && !(data.abbr === 'TX') ? data.content: ''}
                       onChange={(e) => getBlockDataHandler(e)}></textarea>
                   </div>

                   <div className={style.chatBlock__btns}>
                       {
                       CTAs.map((action, idx) => <BlockCTS 
                        key={action._id}
                        blockIdx = {idx}
                        data={action}
                        isAR={isAR}
                        btnID={action._id}
                        actionBlocks={actionBlocks}
                        removeCTAHandler={removeCTA} 
                        addCTAHandler={addNewCTA}
                        getButtonsData={setActionBtns}
                        buttonsData={actionBtns}
                        setSaveGBlock={setSaveGBlock}/>)
                       }
                   </div>
               </div>}
           </div>
        </div>
        </>
    )
}

export default ChatBlock
