import axios from 'axios';



const axiosAlgo = axios.create({
  baseURL: "http://localhost:5100",
  headers: { "Access-Control-Allow-Origin": "*" , "Content-Type" : "application/json" , "Accept" : "application/json"},
  withCredentials: false,
});



export default axiosAlgo;
