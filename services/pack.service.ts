import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`;

const getPublicContent = () => {
    return axios.get(API_URL + 'all');
};

const postOpenPack = () => {
    return axios.post(API_URL + 'packs', {}, { headers: authHeader() });
};

const postCreateTransaction = (transaction: string, quantity: number) => {
    return axios.post(API_URL + 'packs', { transaction, quantity }, { headers: authHeader() });
};

const getPrice = () => {
    return axios.get<any>(API_URL + 'packs/price', { headers: authHeader() });
};

const getSold = () => {
    return axios.get<any>(API_URL + 'packs/sold', { headers: authHeader() });
};

export default {
    postOpenPack,
    postCreateTransaction,
    getPrice,
    getSold,
};
