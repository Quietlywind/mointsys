import axios from 'axios'
export const operationData = () => {
    return axios.get({
        url:'get_opera_data',
    }).then(res =>res.data)
}

// return axios.request({
//     url: 'get_opera_data',
//     data:params,
//     method: 'post'
//   })