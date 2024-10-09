import axios from 'axios';

const axiosInstance = axios.create({
   // baseURL: 'http://localhost:4000/'
     baseURL: 'https://cinema-2-4lxh.onrender.com/'
});

export {
    axiosInstance
}