import axios from 'axios';

export const api = axios.create(
    {
        baseURL: `http://192.168.1.62:8000/api`,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }
);