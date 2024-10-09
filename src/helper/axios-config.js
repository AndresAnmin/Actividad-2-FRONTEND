import axios from 'axios';

const axiosInstance = axios.create({
   // baseURL: 'http://localhost:4000/'
    baseURL: 'https://cinema-2-hz5g.onrender.com'
});

export {
    axiosInstance
}