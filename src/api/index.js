
import axios from 'axios';

export const instance = axios.create({
    baseURL: "http://localhost:3001",
    withcredentials : true,
    headers : {
        'content-type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
})