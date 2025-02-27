import axios from "axios"
import  API_BASE_URL from "./apiConfig"

const tokenAcces = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "jwt-token": tokenAcces || ""
  },
});

export default axiosInstance;