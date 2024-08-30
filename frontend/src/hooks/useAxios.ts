import axios from "axios";
import { APP_CONSTANTS } from "../constants/appConstants";

const useAxios = axios.create({
    baseURL: APP_CONSTANTS.API_PROD_URL,
    withCredentials: true,
    
});

export default useAxios;