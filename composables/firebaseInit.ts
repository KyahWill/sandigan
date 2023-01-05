// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD20tTWEAVPSR9Qg5qrxuKmL1_S2WlC89s",
  authDomain: "sandigan-production.firebaseapp.com",
  projectId: "sandigan-production",
  storageBucket: "sandigan-production.appspot.com",
  messagingSenderId: "409594639089",
  appId: "1:409594639089:web:b67be392fb166cfa09ef50"
};

// Initialize Firebase

export const getFirebaseApp =  () => {
    return initializeApp(firebaseConfig)
}