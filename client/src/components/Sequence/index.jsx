import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Icons from '../icons'
import Loader from '../Loader'
import GroupModal from './groupModal'
import BlocksModal from './blocksModal'
import GroupBlock from '../TimedBlock'
import { useDispatch, useSelector } from 'react-redux'
import {listSequence} from '../../actions/sequenceAction'

const Sequence = () => {
    const [groupModal, setGroupModal] = useState(false)
    const [blocksModal, setBlocksModal] = useState(false)
    const [groupId, setGroupId] = useState(null)
    const [groupDays, setGroupsDays] = useState([])
    const dispatch = useDispatch()
    const {loading, error, groups} = useSelector(state => state.sequenceGroups)
    const {group} = useSelector(state => state.sequenceGroup)
    const {isRemoved} = useSelector(state => state.sequenceGroupRemoved)

    useEffect(() => {
        dispatch(listSequence())
    }, [dispatch, group, isRemoved])
    return (
        <>
            <GroupModal groupModal={groupModal} setGroupModal={setGroupModal}/>
            <BlocksModal 
            blocksModal={blocksModal} 
            setBlocksModal={setBlocksModal}
            group={groupId}
            days={groupDays}/>
            <div className={style.sequence}>
                <div className={style.sequence__wrapper}>
                    <div className={style.schedule__create}
                    onClick={() => setGroupModal(true)}
                    title='create sequence group'>
                        <div className={style.sequence__create_box}>
                            <Icons name='plus-square' width='15' height='15' />
                        </div>
                    </div>
                    <div className={style.sequence__groups}>
                        {
                            loading ? <Loader size='25' center />
                            : error ? <h2 className={style.sequence__error}>{error}</h2>
                            :groups 
                            && groups.map(group => <GroupBlock 
                                key={group._id} 
                                block={group} 
                                blocksModal={setBlocksModal}
                                setGroupId={setGroupId}
                                setGroupsDays={setGroupsDays}
                                />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sequence
