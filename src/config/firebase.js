// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Ad2x1rBeIk1I0wuOPp4vcj1eU8Gy2AM",
  authDomain: "vite-firebase-contact-35f66.firebaseapp.com",
  projectId: "vite-firebase-contact-35f66",
  storageBucket: "vite-firebase-contact-35f66.appspot.com",
  messagingSenderId: "4552532465",
  appId: "1:4552532465:web:09900ff5851d6effe52450",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
