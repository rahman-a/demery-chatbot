import React, {useState,useEffect} from 'react'
import style from './chatBlock.module.scss'
import BlockCTS from '../blockCTA'
import Icon from '../icons'
import ObjectID  from 'bson-objectid'
import {useDrag} from 'react-use-gesture'
import {useChatOpsDispatch} from '../../context/blockOps'
import {CHAT_OPS_CREATE, CHAT_OPS_ADD_GALLERY_BLOCK, CHAT_BLOCK_CREATE} from '../../context/actionTypes'
import {useBlockDispatch} from '../../context/blockData'
import BlockAlert from '../blockAlert'

const ChatBlock = ({blocks, idx, deleteHandler,data, type}) => {
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
    const [imageSRC, setImageSRC] = useState('image/preview.png')
    const dispatch = useChatOpsDispatch()
    const blockDispatch = useBlockDispatch()
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
        blocks.find(block => block.buttons) 
        ? dispatch({type:CHAT_OPS_ADD_GALLERY_BLOCK, payload:{_id:ObjectID().toHexString(), type:'Gallery'}})
        : dispatch({type:CHAT_OPS_CREATE, payload:{_id:ObjectID().toHexString(), type:'Gallery'}})
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
            if(e.target.files){
                setImageSRC(URL.createObjectURL(e.target.files[0]))
                // const image = e.target.files[0]
                const image = URL.createObjectURL(e.target.files[0])
                setBlockData({...blockData,image})
            }else {
                const inputData = {[e.target.name] : e.target.value}
                setBlockData({...blockData,...inputData})
            }
        }

    const saveBlockDataHandler = _ => {  
        const allAbbr = {
            Text:'TX',
            Card:'CD',
            Interactive:'IX',
            Gallery:'GL'
        }
        const chatData =  {
            ...blockData,
            buttons:actionBtns,
            _id: blockData._id ? blockData._id : ObjectID().toHexString(),
            type,
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
                    if(key !== 'title' && chatData[key] === ''){
                        key === 'image' 
                        ? setAlert(`please upload an image`) 
                        :setAlert(`please fill the ${key} input`)
                        return
                    }
                    break;
                case 'Gallery':
                    break;
                default:
                    break;
            }
                
        }
        if(!(type === 'Text') &&!(chatData.buttons.length)) {
            setAlert(`please create at least one button`)
            return
        }
        console.log('save Block', chatData);
        blockDispatch({type:CHAT_BLOCK_CREATE, payload:chatData})
        deleteHandler(undefined ,chatData._id)
    }

    useEffect(() => {
        if(data.buttons) { 
            setCTAs(data.buttons)
            setActionBtns(data.buttons)
            setBlockData(data)
        }
    },[data,blocks])
    
    
    return (
        <>
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
               onChange={(e) => getBlockDataHandler(e)}/>
               
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
                   <img src="image/avatar.png" style={{width:'3rem'}} alt="" />
                   <button onClick={langChangeHandler} className={style.chatBlock__lang}>{langName}</button>
                   <span className={style.chatBlock__remove} onClick={(e) => deleteHandler(e)}>
                       <Icon name='trash'/>
                   </span>
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
                       <img src={data && (data.abbr === 'CD' || data.abbr === 'GL') 
                       ? data.image 
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
                        removeCTAHandler={removeCTA} 
                        addCTAHandler={addNewCTA}
                        getButtonsData={setActionBtns}
                        buttonsData={actionBtns}/>)
                       }
                   </div>
               </div>}
           </div>
        </div>
        </>
    )
}

export default ChatBlock
