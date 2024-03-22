/* eslint-disable prefer-const */
export let USER_TOKEN = '';
let tokenUser = localStorage.getItem('token');
if (tokenUser) {
    USER_TOKEN = tokenUser;
}

export function updateTokenUser(token: string) {
    if (token) {
        USER_TOKEN = token;
    }
}

export const API_URL = import.meta.env.VITE_API_URL;
export const APP_URL = import.meta.env.VITE_APP_URL;

