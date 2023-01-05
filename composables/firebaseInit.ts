// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase

export const getFirebaseApp =  () => {
    const runtimeConfig = useRuntimeConfig()
    const firebaseConfig = {
        apiKey: runtimeConfig.apiKey,
        authDomain: runtimeConfig.authDomain,
        projectId: runtimeConfig.projectId,
        storageBucket: runtimeConfig.storageBucket,
        messagingSenderId: runtimeConfig.messagingSenderId,
        appId: runtimeConfig.appId,
     };
    return initializeApp(firebaseConfig)
}