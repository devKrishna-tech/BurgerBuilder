import axios from 'axios'

const instance = axios.create ({
    baseURL: 'https://my-react-burger-ap-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

export default instance