import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const AUTH_TOKEN_STORAGE_KEY = "datapulseToken";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStoredToken = () => window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const setStoredToken = (token) => {
  if (!token) {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
};

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const registerUser = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data.user;
};

export const getApiErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.code === "ERR_NETWORK") {
    return `Unable to reach the backend service at ${API_BASE_URL}.`;
  }

  return "Unable to load posts right now.";
};

export default api;
