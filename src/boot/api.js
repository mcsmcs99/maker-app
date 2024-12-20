import axios from 'axios';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'http://localhost:3097/api' });

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');
  if (token) {

    config.headers.Authorization = `Bearer ${token}`;

  }
  return config;

});

export default { api };
