import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/prismas`;

const get = () => {
    return axios.get<any>(API_URL, { headers: authHeader() });
};

export default {
    get,
};
