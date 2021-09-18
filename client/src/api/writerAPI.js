import api from './init'

const service = {
    listWriters(name){
        const path = name ?`writers/all?name=${name}` :'writers/all'
        return api().get(path)
    },
    listChannels(id){
        return api().get(`writers/channels/${id}`)
    },
    login(credential){
        return api().post('writers/login', credential)
    },
    register(data){
        return api().post('writers/register', data)
    },
    isAuth(){
        return api().get('writers/auth')
    },
    getWriterInfo(){
        return api().get('writers/info')
    },
    getWriterInfoById(id) {
        return api().get(`writers/${id}`)
    },
    editWriterInfo(data, id){
        const path = id ? `writers/edit/${id}` : 'writers/edit'
        return api().patch(path, data)
    },
    uploadAvatar(img, id){
        const path = id ? `writers/avatar/${id}` : 'writers/avatar'
        return api().patch(path, img)
    },
    logout() {
        return api().post('writers/logout')
    },
    toggleAccess(id){
        return api().patch(`writers/access/${id}`)
    },
    writerDelete(id){
        return api().delete(`writers/delete/${id}`)
    },
    subscribe(channelId){
        return api().patch('writers/subscribe', {channelId})
    },
    unsubscribe(channelId){
        return api().patch('writers/unsubscribe', {channelId})
    }
}

export default service