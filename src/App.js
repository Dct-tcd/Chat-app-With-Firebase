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
import ChatroomList from "./components/ChatroomList.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.js";

function App() {
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
    // <div className="App">
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            userSign == "" ? (
              <Auth />
            ) : (

                <ChatroomList />
            )
          }
        ></Route>
        <Route path="/room/:id" element={<Chatroom />}></Route>
        <Route path="/rooms" element={<><ChatroomList /></>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
