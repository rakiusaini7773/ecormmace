import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
const API = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
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