import axios, { AxiosInstance } from 'axios';
import config from '../../react.config';
const api: AxiosInstance = axios.create({
    baseURL: config.serverUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
function createAxiosInstance(accessToken: string | null = null) {
    return axios.create({
        baseURL: config.serverUrl,
        headers: {
            'accesstoken': `Bearer ${accessToken}`
        }
    });
}
export { createAxiosInstance };
export default api;