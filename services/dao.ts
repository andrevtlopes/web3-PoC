import notification, { TYPE } from '../utils/notification';
import AuthService from './auth.service';
import authHeader from './auth-header';
// import spinnerWrapper from './utils/spinnerWrapper';

const fetchJson = async (input, init) => {
    if (localStorage.token && new Date(localStorage.tokenExp) < new Date()) {
        AuthService.logout();
        console.log('Token expired!');
        return;
    }

    const response = await fetch(input, {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init?.headers,
            authHeader,
        },
    });

    AuthService?.attemptTokenRenewal();

    if (response.status === 401) {
        AuthService?.logout();
        console.log('Token is invalid!');
        return;
    }

    if (response.status === 403) {
        const responseJson = await response.json();
        if (responseJson?.title) {
            notification({ type: TYPE.ERROR, message: responseJson?.title });
        }
        throw responseJson;
    }

    // NoContent
    if (response.status === 204) {
        return null;
    }

    if (response.status && (response.status < 200 || response.status >= 300)) {
        let responseJson;

        try {
            responseJson = await response.json();
        } catch (e) {
            console.error("Failed to parse json response at fetchJson.");
            console.error(response);
            console.error(e);
            throw response;
        }

        if (responseJson?.title && init?.headers?.['x-action-intent'] !== 'validate') {
            notification({ type: TYPE.ERROR, message: responseJson?.title });
        }

        throw responseJson;
    }

    try {
        return await response.json();
    } catch (e) {
        console.error("Failed to parse json response at fetchJson.")
        console.error(response);
        throw e;
    }
}

const spinnerFetchJson = fetchJson;

export async function daoGet(endpoint, query) {
    const queryString = new URLSearchParams(query);
    return spinnerFetchJson(queryString ? `${endpoint}?${queryString}` : endpoint, {});
}

export async function daoPut(endpoint, data, action = 'execute') {
    const func = action === 'execute' ? spinnerFetchJson : fetchJson;

    return func(endpoint, {
        headers: { 'x-action-intent': action },
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

export async function daoPost(endpoint, data, action = 'execute') {
    const func = action === 'execute' ? spinnerFetchJson : fetchJson;

    return func(endpoint, {
        headers: { 'x-action-intent': action },
        method: 'POST',
        body: JSON.stringify(data),
        action,
    });
}

export async function daoDelete(endpoint, data) {
    return spinnerFetchJson(endpoint, {
        method: 'DELETE',
        body: JSON.stringify(data),
    });
}

export function daoGetFile(endpoint, data) {
    const prefix = window.location.hostname === 'localhost' ? window.location.origin : '/Content';
    return daoGet(prefix + endpoint, data);
}

export async function daoGetFileCached(fileName, endpoint, validThru, data) {
    const cache = JSON.parse(localStorage[fileName] ?? '{}');

    if (endpoint !== cache.endpoint || (validThru && !cache.validThru) || new Date() > new Date(cache.validThru)) {
        const ret = await daoGetFile(endpoint, data);

        localStorage[fileName] = JSON.stringify({
            data: JSON.stringify(ret),
            endpoint: endpoint,
            validThru: validThru,
        });

        return ret;
    }

    return JSON.parse(cache.data);
}
