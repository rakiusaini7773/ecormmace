import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const API = axios.create({
  baseURL: API_BASE_URL, // ✅ Base URL automatically add hoga
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Token ko har request me attach karne ke liye Interceptor ka use karein
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // 🔹 Token sessionStorage se le raha hai
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Common API Methods
const BaseApiManager = {
  get: async (endpoint) => {
    try {
      const response = await API.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const response = await API.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      const response = await API.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("PUT Error:", error);
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const response = await API.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  },
};

export default BaseApiManager;