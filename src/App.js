import { useEffect, useState } from "react";

// import style from  "../App.module.css";
import { Auth } from "./components/Auth.js";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Chatroom from "./components/Chatroom";


function App() {
  // const [message, setmessage] = useState("");
  const [userSign, setuserSign] = useState("");
 

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setuserSign(uid);
    } else {
    setuserSign("");
    }
  });

  return (
    <div className="App">
      {userSign =="" ?  <Auth/> : <Chatroom/>}
     {/* <Auth  />
<Chatroom/> */}
     
    </div>
  );
}

export default App;
