// apiClient.js
import axios from 'axios';
import { getHeader } from './GetLocalStorageValue';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_URL, 
  // headers: getHeader()
});

// Custom error handler
const handleError = (error) => {
  if (error.response) {
    console.error('Server responded with an error:', error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error setting up request:', error.message);
  }
  throw error;
};

// POST request with custom headers
const postData = async (endpoint, data, headers = {} ) => {
  try {
    const response = await apiClient.post(endpoint, data, { headers } , );
    return response;
  } catch (error) {
    handleError(error);
  }
};

// GET request with custom headers
const getData = async (endpoint, headers = {} , params = {}) => {
    try {
      const response = await apiClient.get(endpoint, { headers , params});
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  
  // PUT request with custom headers
const putData = async (endpoint, data, headers = {}) => {
  try {
    const response = await apiClient.put(endpoint, data, { headers});
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// DELETE request with custom headers
const deleteData = async (endpoint, headers = {}) => {
  try {
    const response = await apiClient.delete(endpoint, { headers});
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
  // Export the postData and getData functions
  export { postData, getData, putData , deleteData };