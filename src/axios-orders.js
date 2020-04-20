import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bhome-946b6.firebaseio.com/'
});

export default instance;