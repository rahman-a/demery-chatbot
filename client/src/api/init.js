import axios from 'axios'

const init = _ => {
    console.log('init axios',process.env);
    return axios.create({
        baseURL:'/api/',
        headers:{
            apikey:process.env.REACT_APP_API_KEY
        }
    })
}

export default init