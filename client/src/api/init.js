import axios from 'axios'

const init = _ => {
    return axios.create({
        baseURL:'/api/',
    })
}

export default init