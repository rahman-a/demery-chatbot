import api from './init'

const service = {
    checkDialogues(channelId, dialoguesCount){
        return api().get(`dialogues/${channelId}?skip=${dialoguesCount}`)
    },
    getBlock({block, channel}){
        return api().get(`dialogues/block/${block}/${channel}`)
    },
    deleteRecords(channelId){
        return api().delete(`dialogues/${channelId}`)
    }
}

export default service