import { useEffect, useState } from "react";
import { db, googleProvider, auth, storage } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  limit,
  uid,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

import style from "../App.css";
export default function Chatroom() {
  const [message, setmessage] = useState("");
  const [messageList, setmessageList] = useState([]);

  const [photourl, setphotourl] = useState("");
  const messagesCollectionRef = collection(db, "messages");
  // const q = query(collection(db, "messages").orderBy("createdAt"));

  const createmessage = async (e) => {
    e.preventDefault();
    setinputer("");
    const ans = new Date().toLocaleString();
    try {
      await addDoc(messagesCollectionRef, {
        createdAt: ans,
        desc: Input,
        url: photourl,
        userId: auth?.currentUser?.uid,
      });
      getMessageList();
      // getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const getMessageList = async () => {
    try {
      // Query
      // conversationReference
      // const chatQuery = conversationReference.orderByChild("createdAt"). limitToLast(20);
      const q = query(
        messagesCollectionRef,
        orderBy("createdAt", "desc"),
        limit(30)
      );

      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //   console.log(chatQuery);
      //   filteredData.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()) ;
      console.log(filteredData);
      setmessageList(filteredData.reverse());
    } catch (err) {
      console.error(err);
    }
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    // window.scrollTo({ left: 0, bottom: 0, behavior: "smooth" });
    // document.getElementById("dummy").scrollIntoView(false,{ behaviour: "smooth" });

  };

  useEffect(() => {
    getMessageList();
    const user = auth.currentUser;

    if (user != null) {
      setphotourl(user.photoURL);
    }
  }, []);
  const [Input, setInput] = useState("");

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  const [inputer, setinputer] = useState("");
  const handleinput = (e) => {
    setInput(e.target.value);
    setinputer(e.target.value);
    e.preventDefault();
  };

  let val = "start";
  return (
    <div>
      <button style={{ display: "flex" }} onClick={logout}>
        Log out
      </button>
       <div style={{ marginBottom: "10%", }}>
        {
          messageList.map((ele) => {
            return (
              <div
                style={{
                  display: "flex",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  margin: "3px",
                  justifyContent: `${ele.userId === auth.currentUser.uid ? "end" : "start"}`,
                  justifyContent: `${ele.userId === auth.currentUser.uid ? "end" : "start"}`,
                  flexDirection: `${ele.userId === auth.currentUser.uid ? "row-reverse": "row"}`,
                }}
              >
                <img
                  src={
                    ele.url ||
                    "https://api.adorable.io/avatars/23/abott@adorable.png"
                  } />
                <div
                  style={{
                    // width: "100%",
                    display: "flex",
                    color: "white",
                    padding: "8px",
                    borderRadius: "8px",
                    margin: "3px",
                    // justifyContent: "start",
                    backgroundColor: "green",
                  }}
                >
                  {ele.desc}
                </div>
                </div>
                )
                }
          )
              }
          </div>
          <form onSubmit={createmessage}>
        <input
          placeholder="Your Message ..."
          onChange={handleinput}
          value={inputer}
        />
        <button style={{ alignContent: "center", justifyContent: "center" }}>
          🕊️
        </button>
      </form>
    
      <div className="dummy" id="dummy"></div>
    </div>
  );
  }
