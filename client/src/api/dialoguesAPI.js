import api from './init'

const service = {
    checkDialogues(data){
        return api().post('dialogues', data)
    },
    getBlock(id){
        return api().get(`dialogues/blocks/${id}`)
    },
}

export default service