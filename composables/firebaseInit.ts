// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import {getStorage, ref, getDownloadURL,FirebaseStorage} from "firebase/storage";
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

export const getStorages = (app: FirebaseApp) => {
    return getStorage(app, "gs://sandigan-production.appspot.com")
}

export const getFile = (storage: FirebaseStorage,fileName: string) => {
    const storageRef = ref(storage,'juris_html')
    const fileRef = ref(storageRef, fileName)
    return getDownloadURL(fileRef)
}