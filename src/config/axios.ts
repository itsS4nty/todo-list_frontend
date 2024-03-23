import axios from 'axios';

const mode = import.meta.env.MODE;
let url = 'http://localhost:3030/';

if (mode === 'staging') url = '';
else if (mode === 'production') url = '';
else if (mode === 'alpha') url = '';
else if (mode === 'demo') url = '';

const axiosConfig = axios.create({
    baseURL: url,
});

export default axiosConfig;
