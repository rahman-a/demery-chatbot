import api from './init'

const service = {
    listAll() {
        return api().get('/sequence')
    },
    create(info){
        return api().post('/sequence/new', info)
    },
    delete(id){
        return api().delete(`/sequence/${id}`)
    }
}

export default service