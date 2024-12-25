import axios from 'axios';

const getAuthTokenFromCookie = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("jwt"));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
};
const token = getAuthTokenFromCookie();

const api = axios.create({
    baseURL: 'http://localhost:3000/',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
});

const apiToken = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});

export default {api, apiToken}