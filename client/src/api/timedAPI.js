import api from './init'

const services = {
    addBlock(data){
        return api().post('/timed/new', data)
    },
    listTimedBlocks(channel, type){
        return api().get(`timed/${channel}?type=${type}`)
    },
    listTimedDialogueBlocks(channel){
        return api().get(`timed/blocks/${channel}`)
    },
    removeBlock(block){
        return api().delete(`timed/${block}`)
    }
}

export default services