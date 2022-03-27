import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 20_000,
});

export { instance };
