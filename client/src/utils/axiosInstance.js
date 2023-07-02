import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  withCredentials: false,
});

export default axiosInstance;