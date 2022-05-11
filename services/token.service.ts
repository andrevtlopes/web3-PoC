import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`;

const getBalance = () => {
    return axios.get<any>(API_URL + 'users/tokenBalance', { headers: authHeader() });
};

export default {
    getBalance,
};
