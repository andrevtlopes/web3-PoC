import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

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
    return signer.signMessage(`I am signing my one-time nonce: ${nonce}`);
};

const handleAuthenticate = ({ signature, publicAddress }) => {
    return axios
        .post<any>(API_URL + 'auth', { publicAddress, signature });
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('token'));
};

const attemptTokenRenewal = () => {};

export default {
    login,
    logout,
    getCurrentUser,
    attemptTokenRenewal,
};
