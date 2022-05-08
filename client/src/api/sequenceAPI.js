import api from './init'

const service = {
    listAll(id) {
        return api().get(`/sequence/${id}`)
    },
    create(info){
        return api().post('/sequence/new', info)
    },
    delete(id){
        return api().delete(`/sequence/${id}`)
    }
}

export default service