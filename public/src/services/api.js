// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://megaeth-app.onrender.com", // backend root
});

// attach token if exists
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getProfile = () => API.get("/auth/profile");

export const generateQuestion = () => API.get("/quiz/generate-question");
export const checkAnswer = (data) => API.post("/quiz/check-answer", data);

export const getLeaderboard = () => API.get("/leaderboard");
