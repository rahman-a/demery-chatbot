import api from './init'

const service = {
    create(data){
        return api().post('blocks/new', data)
    },
    getAll(channel, keyword){
        const path = keyword 
        ? `blocks/all/${channel}?name=${keyword}`
        :`blocks/all/${channel}`
        return api().get(path)
    }, 
    edit(data){
        return api().put('/blocks/edit', data)
    },
    remove(id){
        return api().delete(`blocks/${id}`)
    }
}

export default service