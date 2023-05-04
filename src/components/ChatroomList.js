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

  const [checkroomValid, setcheckroomValid] = useState("none");

  const roomsCollectionRef = collection(db, "rooms");
  const [roomList, setroomList] = useState([]);
  // const [inputer, setinputer] = useState([]);
  const [title, settitle] = useState("");
  const [titlefoot, settitlefoot] = useState("");
  const rand = Math.random().toString().substr(2, 8);

  const createmessage = async (e) => {
    e.preventDefault();
    // setinputer("");
    const ans = new Date().toLocaleString();
    try {
      await addDoc(roomsCollectionRef, {
        ider: rand,
        title: title,
        createdAt: ans,
      });
      getroomList();
    } catch (err) {
      console.error(err);
    }
  };

  const getroomList = async () => {
    try {
      const q = query(roomsCollectionRef, orderBy("createdAt"), limit(6));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData,'::');
      setroomList(filteredData.reverse());
    } catch (err) {
      console.error(err);
    }
  };
  const HandleInput = (e) => {
    // checkroomId
    if (title.length == 0) {
      setcheckroomId("block");
    } else {
      setcheckroomId("none");
      e.preventDefault();
      createmessage(e);
    }
  };
  // let Deny="";



  const HandleInputFoot = (e) => {
    let ans = 0;
   console.log(titlefoot);
    roomList.forEach((val) => {
      titlefoot == val.ider ? ans++ : (ans = ans);
      console.log(val.ider);
    });

    console.log(ans, "ans");
    if (ans == 0) {
      console.log("hhh");
      setcheckroomValid("block");
      // Deny="room";
    } else {
      console.log('cbhhe');
      setcheckroomValid("none");
      return navigate(`/room/${titlefoot}`);
      // Deny="";
    }
  };

  useEffect(() => {
    getroomList();
  }, []);

  // console.log(roomList);
  return (
    <>
      <div
        style={{ textAlignLast: "start", marginLeft: "20%", marginTop: "5%" }}
      >
        <div>
          <input
            onChange={(e) => {
              settitle(e.target.value);
            }}
            style={{ marginLeft: "2%" }}
          />
          <label>
            <button
              style={{ backgroundColor: "primary" }}
              onClick={HandleInput}
            >
              Create a custom Room
            </button>
          </label>
          <div style={{ color: "yellow", display: `${checkroomId}` }}>
            {" "}
            Give a Valid Title{" "}
          </div>
        </div>

        <div>
          <input
            onChange={(e) => {
              settitlefoot(e.target.value);
            }}
            style={{ marginLeft: "2%" }}
          />

            <label>
              <button
                style={{ backgroundColor: "primary" }}
                onClick={HandleInputFoot}
              >
                {console.log(checkroomValid,"checkroomValid")}
          {/* <Link to={  checkroomValid=="none" ? `/room/${titlefoot}` : "/rooms"}> */}
                Join custom Room
          {/* </Link> */}
              </button>
            </label>
          <div style={{ color: "yellow", display: `${checkroomValid}` }}>
            {" "}
            Not a Valid Room Id{" "}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: "100px",
          color: "lavender",
        }}
      >
        {/* <form action={HandleInput}> */}

        {/* </form> */}
        {roomList.map((e) => {
          return (
            <>
              <div
                style={{
                  color: "lavender",
                }}
              >
                <div
                  className="op"
                  style={{
                    width: "170px",
                    border: "solid",
                    padding: "25px",
                    margin: "5px",
                  }}
                >
                  <Link
                    style={{ color: "cyan", textDecoration: "none" }}
                    to={`/room/${e.ider}}`}
                  >
                    {e.title}
                    
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div></div>
    </>
  );
}

export default ChatroomList;
