import axios from 'axios';
import { MODE } from './constants';

let url = 'http://localhost:3030/';

if(MODE === 'staging') url = '';
else if(MODE === 'production') url = 'https://todo-list-backend-inky.vercel.app/';
else if(MODE === 'alpha') url = '';
else if(MODE === 'demo') url = '';

const axiosConfig = axios.create({
    baseURL: url,
});

export default axiosConfig;
