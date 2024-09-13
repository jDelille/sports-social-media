import axios from "axios";
import { APP_CONSTANTS } from "../constants/appConstants";
import { showErrorToast } from "../utils/toastUtils"; // Import the error toast function

let isToastShown = false; // Flag to track if the toast is already shown

const useAxios = axios.create({
  baseURL: APP_CONSTANTS.API_BASE_URL,
  withCredentials: true,
});

useAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      if (!isToastShown) {
        // Show the toast and set the flag to prevent further toasts
        showErrorToast("Session expired. Please sign back in.");
        isToastShown = true;

        // After showing the toast, you can optionally redirect the user
        setTimeout(() => {
        }, 3000); // Adjust the delay to allow the user to see the toast
      }
    }

    return Promise.reject(error);
  }
);

// Optional: Reset the flag when navigating back to the app after login
export const resetToastFlag = () => {
  isToastShown = false;
};

export default useAxios;