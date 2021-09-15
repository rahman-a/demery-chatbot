import React, {useState, useRef, useEffect, useCallback} from 'react'
import style from './blockCTA.module.scss'
import Icon from '../icons'
import DropdownMenu from '../dropdownMenu'
import {useSelector} from 'react-redux'
import BlockAlert from '../blockAlert'

const BlockCTS = ({
    addCTAHandler, 
    removeCTAHandler, 
    blockIdx, 
    data, 
    isAR,
    getButtonsData,
    buttonsData,
    setSaveGBlock,
    actionBlocks,
    btnID}) => {
    const [panelToggle, setPanelToggle] = useState(false)
    const [isInputSent, setIsInputSent] = useState(false)
    const [callToggle, setCallToggle] = useState(false)
    const [actionType, setActionType] = useState('')
    const [action, setAction] = useState(null)
    const [btnTitle, setBtnTitle] = useState('')
    const [alert, setAlert] = useState('')
    const {blocks} = useSelector(state => state.blocks)
    const listRef = useRef(null)
    const callRef = useRef(null)
    const doneRef = useRef(null)
    
    const panelToggleList = _ => {
        if(panelToggle) {
            listRef.current.style.display = 'none'
            setPanelToggle(false)
        }else {
            listRef.current.style.display = 'block'
            setPanelToggle(true)
        }
    }
    const panelToggleHandler = (e,action) => {
        if(!btnTitle) return setAlert('Please write the button name')
        setSaveGBlock(true)
        setAction('')
        if(action === 'action') {
            setActionType(e.target.innerText)
            doneRef.current.style.display = 'flex'
            setTimeout(() => {
                panelToggleList()
                doneRef.current.style.display = 'none'
            },500)

        }else {
            panelToggleList()
        }
        
    }
    const callToggleHandler = _ => {
        if(!actionType) return setAlert('Please specify the action type')
        if(actionType) {
            if(callToggle) {
                callRef.current.style.display = 'none'
                setCallToggle(false)
            }else {
                callRef.current.style.display = 'block'
                setCallToggle(true)
            }
        }
    }
    const sendActionHandler = useCallback( id => {
        if(!action && !btnTitle) return setAlert('Please provide the action')
        const filteredData = buttonsData.filter(btn => btn._id !== btnID)
        setSaveGBlock(true)
        if((action || id) && actionType) {
            getButtonsData([...filteredData,{
                title:btnTitle,
                type:actionType,
                action:action ? action : id,
                _id:btnID
            }])
            setIsInputSent(true)
            setTimeout(() => {
                setIsInputSent(false)
            }, 1000);
        } 
    
    },[action,actionType, btnTitle])

    // const sendBtnData = useCallback( _ => {
    //     const filteredData = buttonsData.filter(btn => btn._id !== btnID)
    //     if(actionType === 'Subscribe' || actionType === 'Unsubscribe'){
    //         setSaveGBlock(true)
    //         getButtonsData([...filteredData,{
    //             title:btnTitle,
    //             type:actionType,
    //             action:'',
    //             _id:btnID
    //         }]) 
    //     } 
    //     },[actionType, btnTitle])

    const setIncomingDataForEdit = _ => {
        if(buttonsData.length) {
            setBtnTitle(buttonsData[blockIdx]?.title)
            setActionType(buttonsData[blockIdx]?.type)
            setAction(buttonsData[blockIdx]?.action)
        }
    }
    
    useEffect(() => {
        // sendBtnData()
        btnTitle && sendActionHandler()
       !btnTitle && setIncomingDataForEdit()
    },[btnTitle])

    return (
        <div className={style.cta}>
            <BlockAlert alert={alert} setAlert={setAlert}/>
            <input 
            type="text" 
            name='btn-name' 
            placeholder={ isAR ? 'اكتب اسم الزر هنا' :'write the button title'}
            defaultValue = {data ? data.title: ''}
            onChange={(e) => setBtnTitle(e.target.value)}/>
            <div className={style.cta__action}>
                <span className={style.cta__action_btn} onClick={panelToggleHandler}>
                    <Icon name='setting'/>
                </span>
                <span className={style.cta__action_btn} onClick={callToggleHandler}>
                    <Icon name='usb' />
                </span>
                {blockIdx > 0 && <span className={style.cta__action_btn} 
                onClick={() => removeCTAHandler(btnID)}>
                    <Icon name='trash'/>
                </span>}
                <span className={style.cta__action_btn} onClick={addCTAHandler}>
                    <Icon name='plus-square'/>
                </span>
                <ul className={style.cta__panel} ref={listRef}>
                    <li className={style.cta__done} ref={doneRef}>
                        <p>{actionType}</p>
                        <Icon name='check-mark'/>
                    </li>
                    <li onClick={(e) => panelToggleHandler(e,'action')}>Move to Chat Block</li>
                    <li onClick={(e) => panelToggleHandler(e,'action')}>Open Link</li>
                    <li onClick={(e) => panelToggleHandler(e,'action')}>Call Phone</li>
                    <li onClick={(e) => panelToggleHandler(e,'action')}>Subscribe</li>
                    <li onClick={(e) => panelToggleHandler(e,'action')}>Unsubscribe</li>
                </ul>
                <div className={style.cta__call} ref={callRef}>
                    {(actionType === 'Move to Chat Block' 
                    || actionType === 'Subscribe' 
                    || actionType === 'Unsubscribe')
                    ? <DropdownMenu className={style.cta__blocks} 
                    placeholder='choose the block' 
                    value={action&&action.name}>
                        {actionBlocks && actionBlocks.map(block => (
                            <li 
                            key={block._id}
                            onClick={() => {
                                    setAction({name:block.name, _id:block._id})
                                    sendActionHandler(block._id)
                                    setSaveGBlock(true)
                                }}>
                                {block.name}
                            </li>
                        ))}
                        </DropdownMenu>
                    :<div className={style.cta__input}>
                        <input
                        onChange={(e) => setAction(e.target.value)}
                        type="text" 
                        name="action" 
                        placeholder='type the action'/>
                        <button onClick={() => sendActionHandler()}> 
                        <Icon name={isInputSent ?'check-mark' :'plus-square'} width='15' height='15'/> 
                        </button>
                    </div> }
                </div>
            </div>
        </div>
    )
}

export default BlockCTS
