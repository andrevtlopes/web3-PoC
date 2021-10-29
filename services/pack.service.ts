import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/';

const getPublicContent = () => {
    return axios.get(API_URL + 'all');
};

const postOpenPack = () => {
    return axios.post(API_URL + 'packs', {}, { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
};

export default {
    postOpenPack,
};
