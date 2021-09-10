import api from './init'

const service = {
    create(data){
        return api().post('channels/new', data)
    },
    edit(data, id){
        return api().patch(`channels/edit/${id}`, data)
    }, 
    remove(id){
        return api().delete(`channels/delete/${id}`)
    }
}

export default service