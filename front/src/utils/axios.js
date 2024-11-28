import axios from 'axios';

const baseURL= 'http://localhost:3000';

axios.defaults.baseURL = baseURL;


export const privateAxios = axios.create({
  baseURL,
});