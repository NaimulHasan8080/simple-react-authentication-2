import firebaseConfig from "./Firebase.config";
import { initializeApp } from "firebase/app";

const firebaseInitialize = () => {
    initializeApp(firebaseConfig);
};

export default firebaseInitialize;