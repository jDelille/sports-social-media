import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhMBIySL7Addi1Xh0iow4N1_S0EpRQoIY",
  authDomain: "huddle-images.firebaseapp.com",
  projectId: "huddle-images",
  storageBucket: "huddle-images.appspot.com",
  messagingSenderId: "146191544999",
  appId: "1:146191544999:web:7d9677b2a5ae2e4836e182"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };