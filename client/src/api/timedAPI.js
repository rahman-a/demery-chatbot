import api from './init'

const services = {
    addBlock(data){
        return api().post('/timed/new', data)
    },
    listBroadcast(channel, type){
        return api().get(`timed/${channel}?type=${type}`)
    },
    listTimedBlocks(channel){
        return api().get(`timed/blocks/${channel}`)
    },
    removeBlock(block){
        return api().delete(`timed/${block}`)
    }
}

export default services