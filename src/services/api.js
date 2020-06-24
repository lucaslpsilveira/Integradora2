import axios from "axios";

axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers['crossDomain'] = true;
axios.defaults.headers['withCredentials'] = true;
axios.defaults.headers['use-redirect'] = false;
const api = axios.create({
    baseUrl: process.env.REACT_APP_API_URL
});

export default api;