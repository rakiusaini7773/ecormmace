// networking/baseAPIManager.js

import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Attach token to every request
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Generic API Manager
const BaseApiManager = {
  get: async (endpoint) => {
    const response = await API.get(endpoint);
    return response.data;
  },

  post: async (endpoint, data, config = {}) => {
    // Don't override Content-Type here, allow Axios to auto-set it (especially for FormData)
    const response = await API.post(endpoint, data, config);
    return response.data;
  },

  put: async (endpoint, data, config = {}) => {
    const response = await API.put(endpoint, data, config);
    return response.data;
  },

  delete: async (endpoint) => {
    const response = await API.delete(endpoint);
    return response.data;
  },
};

export default BaseApiManager;
