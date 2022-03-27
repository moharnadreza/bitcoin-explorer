import axios from 'axios';
import { EXPLORER_BASE_URL } from '.';

const explorerInstance = axios.create({
  baseURL: EXPLORER_BASE_URL,
  timeout: 20_000,
});

export { explorerInstance };
