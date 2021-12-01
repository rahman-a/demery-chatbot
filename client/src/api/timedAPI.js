import api from './init'

const services = {
    addBlock(data){
        return api().post('/timed/new', data)
    },
    listTimedBlocks(channel, type, group){
        return group ? api().get(`timed/${channel}?type=${type}&group=${group}`)
        :api().get(`timed/${channel}?type=${type}`)
    },
    listTimedDialogueBlocks(channel){
        return api().get(`timed/blocks/${channel}`)
    },
    toggleActivation(id, group){
        return api().patch(`timed/${id}?group=${group}`)
    },
    removeBlock(block, type, group){
        return group ? api().delete(`timed/${block}?type=${type}&group=${group}`)
        :api().delete(`timed/${block}?type=${type}`)
    }
}

export default services