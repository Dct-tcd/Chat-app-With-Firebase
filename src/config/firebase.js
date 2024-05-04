import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//dct
// const firebaseConfig = {
//    apiKey: "AIzaSyB9nCgRuDlOzob37IzvOpgpvuZYNrbmnOc",
//   authDomain: "chatter-37dc6.firebaseapp.com",
//   projectId: "chatter-37dc6",
//   storageBucket: "chatter-37dc6.appspot.com",
//   messagingSenderId: "931769986875",
//   appId: "1:931769986875:web:799b3ba5be12d778c4511e",
//   measurementId: "G-VBWB75YFP2"
// };
//tcd
const firebaseConfig = {
  apiKey: "AIzaSyAyxhM66Wtg1zTa3s2w3kqKRcpNFhLTXe4",
  authDomain: "chater-78d2e.firebaseapp.com",
  projectId: "chater-78d2e",
  storageBucket: "chater-78d2e.appspot.com",
  messagingSenderId: "1085549009714",
  appId: "1:1085549009714:web:3923890b781b97c433952b",
  measurementId: "G-Q1V1DCE21J"
};
//en20

// const firebaseConfig = {
//   apiKey: "AIzaSyDu9T_qn3710MVID_jzDwIizaMNSk0CTE8",
//   authDomain: "chater-4d516.firebaseapp.com",
//   projectId: "chater-4d516",
//   storageBucket: "chater-4d516.appspot.com",
//   messagingSenderId: "1055609310689",
//   appId: "1:1055609310689:web:6ae7e5566e4fd453afd6a0",
//   measurementId: "G-WJ54PWEDRT"
// };
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
