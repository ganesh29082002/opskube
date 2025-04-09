import axios from "axios";

import store from '../redux/store/store'

const axiosClient = axios.create({
  baseURL: "http://localhost:5080", // this comes from .env or config as of now i put it static
});


axiosClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth?.loginUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


axiosClient.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirect to login.");
      
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
