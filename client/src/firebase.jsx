// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// const {initializeApp} = require("firebase/app")
// const {getAnalytics} = require("firebase/analytics")
import { getAnalytics } from "firebase/analytics";
// const {getStorage} = require("firebase/storage")
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg_FMPiZeoUKpIcei7w4ojvmtLNfu3ct8",
  authDomain: "groovehub-c074d.firebaseapp.com",
  projectId: "groovehub-c074d",
  storageBucket: "groovehub-c074d.appspot.com",
  messagingSenderId: "532719047942",
  appId: "1:532719047942:web:cb8373b8c36a25eecefa87",
  measurementId: "G-HSF45YHG3R"
};

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);
export const storage = getStorage(fb)

