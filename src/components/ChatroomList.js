import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";

function ChatroomList() {
  let navigate = useNavigate();
  
  const [checkroomId, setcheckroomId] = useState("none");
  const [vroomList, setvroomList] = useState([])
  const [checkroomValid, setcheckroomValid] = useState("none");
  
  const [FullroomList, setFullroomList] = useState([])
  const roomsCollectionRef = collection(db, "rooms");
  const [roomList, setroomList] = useState([]);
  // const [inputer, setinputer] = useState([]);
  const [title, settitle] = useState("");
  const [titlefoot, settitlefoot] = useState("");
  const rand = Math.random().toString().substr(2, 8);

  const createmessage = async (e) => {
    e.preventDefault();
    // setinputer("");
    const ans = Number(new Date());

    try {
      await addDoc(roomsCollectionRef, {
        ider: rand,
        title: title,
        createdAt: ans,
      });

      getroomList();
      return navigate(`/room/${rand}`);
      // location.href = ;
    } catch (err) {
      console.error(err);
    }
  };

  const getroomList = async () => {
    try {
      const q = query(
        roomsCollectionRef,
        orderBy("createdAt", "asc"),
        limit(6)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData,);
      setroomList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const getFullroomList = async () => {
    try {
      const q = query(
        roomsCollectionRef,
        orderBy("createdAt", "asc"),
        // limit(6)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData,);
      setFullroomList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const HandleInput = (e) => {
    // let ans = 0;
    // roomList.forEach((val) => {
    //   rand == val.ider ? ans++ : (ans = ans);
    // });

    if (title.length == 0) {
      setcheckroomId("block");
      setTimeout(() => {
        setcheckroomId("none");
      }, 1000);
    } else {
      setcheckroomId("none");
      e.preventDefault();
      createmessage(e);
    }
  };
  // let Deny="";

  const HandleInputFoot = (e) => {
    let ans = 0;
    // console.log(titlefoot);
    FullroomList.forEach((val) => {
      titlefoot == val.ider ? ans++ : (ans = ans);
      // console.log(val.ider);
      // console.log(val);
    });

    if (ans == 0) {
      // console.log("hhh");
      setcheckroomValid("block");
      setTimeout(() => {
        setcheckroomValid("none")
      }, 1000);
      // Deny="room";
    } else {
      // console.log("cbhhe");
      setcheckroomValid("none");
      return navigate(`/room/${titlefoot}`);
      // Deny="";
    }
  };

  useEffect(() => {
    getroomList();
    getFullroomList();
    // vroomList();
  }, []);

  // console.log(roomList);
  return (
    <>
    <div
  style={{
    marginTop: "5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center align items horizontally
  }}
>
  <div style={{ marginBottom: "2%", display: "flex", alignItems: "center" }}>
    <div style={{ position: "relative", marginRight: "8px" }}>
      <input
        placeholder="Give us a Name"
        onChange={(e) => {
          settitle(e.target.value);
        }}
        style={{
          padding: "8px", // Increased padding for better input box appearance
          border: "1px solid #ccc", // Added border for better visibility
          borderRadius: "20px", // Rounded corners for a softer look
          width: "400px", // Adjusted input width
        }}
      />
      <button
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-63%)",
          backgroundColor: "blue",
          borderRadius: "20px", // Rounded corners for consistency
          padding: "5px 16px", // Increased padding for better button appearance
          color: "white", // Changed text color for better contrast
          border: "none", // Removed border for cleaner look
          cursor: "pointer", // Added pointer cursor for better usability
          transition: "background 0.3s ease", // Smooth transition for hover effect
          fontSize:"15px"
        }}
        onClick={HandleInput}
      >
        Create
      </button>
    </div>
    <div style={{ color: "yellow", display: `${checkroomId}` }}>
      Give a Valid Title
    </div>
  </div>

  <div style={{ marginTop:"1%", marginBottom: "2%", display: "flex", alignItems: "center" }}>
    <div style={{ position: "relative", marginRight: "8px" }}>
      <input
        placeholder="Give us an Id"
        onChange={(e) => {
          settitlefoot(e.target.value);
        }}
        style={{
          padding: "8px", // Increased padding for better input box appearance
          border: "1px solid #ccc", // Added border for better visibility
          borderRadius: "20px", // Rounded corners for a softer look
          width: "400px", // Adjusted input width
        }}
      />

      <button
        onClick={HandleInputFoot}
        style={{
          position: "absolute",
          right: "5px",
          top: "50%",
          transform: "translateY(-63%)",
          backgroundColor: "blue",
          borderRadius: "20px", // Rounded corners for consistency
          padding: "5px 16px", // Increased padding for better button appearance
          color: "white", // Changed text color for better contrast
          border: "none", // Removed border for cleaner look
          cursor: "pointer", // Added pointer cursor for better usability
          transition: "background 0.3s ease", // Smooth transition for hover effect
          fontSize:"15px"
        }}
      >
        Join
      </button>
    </div>
    <div style={{ color: "yellow", display: `${checkroomValid}` }}>
      Not a Valid Room Id
    </div>
  </div>
</div>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "20px",
    color: "lavender",
    marginTop: "10%",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "indigo",
  }}
>
  {roomList.map((room) => (
    <div
      key={room.ider}
      style={{
        color: "lavender",
        margin: "10px",
        width: "170px",
        border: "1px solid #6D28D9", // Adjusted border color to match indigo shade
        borderRadius: "8px",
        padding: "15px",
        textAlign: "center",
        backgroundColor: "#6D28D9", // Adjusted background color to match indigo shade
      }}
    >
      <Link
        to={`/room/${room.ider}`}
        style={{ color: "#F3EFEF", textDecoration: "none" }} // Adjusted link color to contrast with indigo
      >
        {room.title}
      </Link>
    </div>
  ))}
</div>



      <div></div>
    </>
  );
}

export default ChatroomList;
