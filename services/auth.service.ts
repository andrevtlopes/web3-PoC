import axios from 'axios';
import jwtDecode from 'jwt-decode';

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/`;

const register = (publicAddress: string) => {
    return axios.post(API_URL + 'users', {
        publicAddress,
    });
};

interface LoginResponse {
    accessToken: string;
    users: any;
}

const login = (publicAddress: string, signer: any) => {
    return axios
        .get<any>(API_URL + 'users', {
            params: { publicAddress },
        })
        .then((response) => response.data)
        .then((users) => (users.length ? users[0] : register(publicAddress).then(response => response.data)))
        .then((props) => handleSignMessage({ ...props, signer }))
        .then((signature) => handleAuthenticate({ signature, publicAddress }))
        .then((response) => response.data.accessToken)
        .catch((error) => { throw error });
};

const handleSignMessage = ({ nonce, signer }) => {
    return signer.signMessage(`famon.pet signing: ${nonce}`);
};

const handleAuthenticate = ({ signature, publicAddress }) => {
    return axios
        .post<any>(API_URL + 'auth', { publicAddress, signature });
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return jwtDecode(JSON.parse(localStorage.getItem('token')))?.payload ?? null;
};

const attemptTokenRenewal = () => {};

export default {
    login,
    logout,
    getCurrentUser,
    attemptTokenRenewal,
};
