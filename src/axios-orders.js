import axios from 'axios'; 

const instance = axios.create ({
    baseURL: 'https://react-my-burger-c9843.firebaseio.com/'
})

export default instance; 