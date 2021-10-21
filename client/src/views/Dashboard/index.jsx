import React, { useState, useEffect } from 'react'
import style from './dashboard.module.scss'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import ChatTitles from '../../components/chatTitlesContainer'
import ChatCanvas from '../../components/chatCanvas'
import TimedChat from '../../components/TimedChat'
import StatChat from '../../components/StatChat'
import KeywordChat from '../../components/KeywordChat'
import { useBlockDispatch } from '../../context/blockData'
import { ChatOpsProvider } from '../../context/blockOps'
import { CHAT_BLOCKS_RESET } from '../../context/actionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getOneChannel } from '../../actions/channelAction'
import { getDialogues } from '../../actions/dialogueAction'
import Loader from '../../components/Loader'
import Alert from 'react-bootstrap/Alert'
import ChatTest from '../../components/chatTest'
import Icon from '../../components/icons'

const Dashboard = () => {
  const [sideNavToggle, setSideNavToggle] = useState(false)
  const [isChatBlock, setIsChatBlock] = useState(false)
  const [dialoguesInit, setDialoguesInit] = useState(true)
  const [chatNotification, setChatNotification] = useState(0)
  const [dashType, setDashType] = useState('canvas')
  const { isDeleted } = useSelector((state) => state.deleteRecords)
  const { id } = useParams()
  const dispatch = useDispatch()
  const blockDispatch = useBlockDispatch()
  const { loading, error } = useSelector((state) => state.oneChannel)

  const startDialogueHandler = (_) => {
    setIsChatBlock(!isChatBlock)
    setDialoguesInit(false)
    setChatNotification(0)
    if (dialoguesInit) {
      dispatch(getDialogues(id, 0))
    }
  }
  useEffect(() => {
    if (isDeleted) {
      dispatch(getDialogues(id, 0))
      blockDispatch({ type: CHAT_BLOCKS_RESET })
    }
  }, [isDeleted, blockDispatch, dispatch, id])
  useEffect(() => {
    if (id) {
      dispatch(getOneChannel(id))
    }
    setDashType(localStorage.getItem('dashType'))
  }, [id, dispatch])
  return (
    <>
      <Navbar
        dashboard
        toggleHandler={() => setSideNavToggle(!sideNavToggle)}
      />
      <div className={style.dashboard}>
        <Sidebar toggle={sideNavToggle} setDashType={setDashType} />
        {loading ? (
          <Loader size='25' center />
        ) : error ? (
          <Alert variant='danger'>{error}</Alert>
        ) : (
          <ChatOpsProvider>
            <ChatTitles />
            <ChatTest
              toggle={isChatBlock}
              setToggle={setIsChatBlock}
              setChatNotification={setChatNotification}
              dialoguesInit={dialoguesInit}
            />
            <div className={style.dashboard__chat}>
              <span
                className={style.dashboard__chat_icon}
                onClick={startDialogueHandler}
              >
                <span
                  className={style.dashboard__chat_notification}
                  style={{ display: chatNotification > 0 ? 'inline' : 'none' }}
                >
                  {chatNotification}
                </span>
                <Icon name='chat-test' />
              </span>
            </div>
            {dashType === 'canvas' ? (
              <ChatCanvas />
            ) : dashType === 'timed' ? (
              <TimedChat />
            ) : dashType === 'stat' ? (
              <StatChat />
            ) : (
              dashType === 'keyword' && <KeywordChat />
            )}
          </ChatOpsProvider>
        )}
      </div>
    </>
  )
}

export default Dashboard
