import axios from "axios";
import { APP_CONSTANTS } from "../constants/appConstants";

const useAxios = axios.create({
    baseURL: APP_CONSTANTS.API_BASE_URL,
    withCredentials: true,
    
});

useAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 403) {
        // Trigger a modal or popup when token is invalid
        alert("Session expired. Please sign back in.");
        console.log(error)
        // You could also programmatically open a custom modal or redirect to a login page
        window.location.href = '/login'; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

export default useAxios;