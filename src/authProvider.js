// in src/authProvider.js
import decodeJwt from 'jwt-decode';
import {showNotification} from "react-admin";

export default {
    login: ({ username, password }) => {
        const request = new Request(`${process.env.REACT_APP_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                localStorage.setItem('token', token);
                localStorage.setItem('permissions', decodedToken.permissions);
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    checkError: error => {
        showNotification(error, 'error')
        console.error(error);
    },
    checkAuth: () => {
        if (localStorage.getItem('token') == null) {
            return Promise.reject()
        }
        const decodedToken = decodeJwt(localStorage.getItem('token'));
        new Date(decodedToken.exp * 1000)
        return new Date(decodedToken.exp * 1000) > new Date() ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};