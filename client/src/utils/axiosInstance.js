import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { logOut } from '../state(kiv)';


const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api/v1",
  headers: { "Access-Control-Allow-Origin": "*" },
  withCredentials: false,
});

axiosInstance.interceptors.response.use(response => 
    {
        return response
    }, 
    // error => {
    
    // if (error.response.status >= 400 &&  error.response.status < 500){
    //    // redirect to 403 page
    //    console.log("errror is handled")
    
    //    localStorage.clear();
    //    window.location = '/login/start'
    // }
    );

// either we loggout for every request on 403 error or we do this but idk how to clear everything

export default axiosInstance;
