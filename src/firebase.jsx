// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //apiKey: import.meta.env.VITE_FIREBASE_API_KEY, This method is not working 
  // So I Use the apikey directly.
  apiKey:"AIzaSyA3ql3bXnKRxxmCa_Ng4x_IqCcOfkwRTAA",
  authDomain: "hotel-royal-d0b45.firebaseapp.com",
  projectId: "hotel-royal-d0b45",
  storageBucket: "hotel-royal-d0b45.appspot.com",
  messagingSenderId: "549608668161",
  appId: "1:549608668161:web:94cf06a6b5dc6fbed5d400",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
