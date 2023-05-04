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
import { useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom"
export default function Chatroom() {

  // useParams
const   params= useParams();
const   id = params.id;
let newId="";
for (let ip=0;ip<id.length;ip++)
{
  // console.log(id[ip],"kkkkk");
 if ((id[ip]>='a' && id[ip]<='z')||(id[ip]>='A' && id[ip]<='Z' ))  newId += id[ip];
}

  const [message, setmessage] = useState("");
  const [messageList, setmessageList] = useState([]);

  const [photourl, setphotourl] = useState("");
  const messagesCollectionRef = collection(db, "messages");
  // const q = query(collection(db, "messages").orderBy("createdAt"));
  const { username } = useSelector((state) => {
    return state;
  });

  const createmessage = async (e) => {
    e.preventDefault();
    setinputer("");
    const ans = new Date().toLocaleString();
    try {
      await addDoc(messagesCollectionRef, {
        createdAt: ans,
        desc: Input,
        url: photourl,
        name: username,
        userId: auth?.currentUser?.uid,
        type:newId,
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
      console.log(username, "1");
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      //   console.log(chatQuery);
      //   filteredData.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()) ;
      console.log(filteredData);
      
      const newList = filteredData.filter( (e)=>{return e.type == newId});
      console.log(newList, ";;;;");
      setmessageList(newList.reverse());

    } catch (err) {
      console.error(err);
    }
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
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
    <div style={{ textAlign :'-webkit-center'}} >
      {/* <Link></Link> */}
      <div style={{display:"flex",justifyContent:"space-between",maxWidth:"728px"}}>
         <button className="logoutBtn"  onClick={logout} >
        <Link to="/" style={{textDecoration:'none'  ,color:"beige"}}>Log out</Link>
      </button>
      <button className="logoutBtn">
        <Link to="/rooms" style={{textDecoration:'none', color:"beige"}}>All Rooms</Link>
      </button>
      </div>

      <div style={{ marginBottom: "10%" }}>
        {messageList.map((ele) => {
          return (
            // <div>
            <div
              style={{
                display: "flex",
                color: "white",
                padding: "8px",
                borderRadius: "8px",
                margin: "3px",
                justifyContent: `${
                  ele.userId === auth.currentUser.uid ? "end" : "start"
                }`,
                justifyContent: `${
                  ele.userId === auth.currentUser.uid ? "end" : "start"
                }`,
                flexDirection: `${
                  ele.userId === auth.currentUser.uid ? "row-reverse" : "row"
                }`,
              }}
            >
              {" "}
              <button
                style={{
                  padding: "0%",
                  fontSize: "1rem",
                }}
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`${ele.name}`}
              >
                <img
                  src={
                    ele.url ||
                    "https://api.adorable.io/avatars/23/abott@adorable.png"
                  }
                />
              </button>
              <div
                style={{
                  display: "flex",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  margin: "3px",
                  backgroundColor: `${
                    ele.userId !== auth.currentUser.uid
                      ? "green"
                      : "hwb(204 29% 22%)"
                  }`,
                }}
              >
                {ele.desc}
                {/* </button> */}
              </div>
            </div>
          );
        })}
      </div>
      <div>
      <form className="footer" onSubmit={createmessage}>
        <input
          className="inputer"
          placeholder="Your Message ..."
          onChange={handleinput}
          value={inputer}
          // style={{marginLeft:"50px" ,  borderColor:" #282c34"}}
        />
        <button style={{ alignContent: "center", justifyContent: "center" }}>
          🕊️
        </button>
      </form>
      </div>
      <div className="dummy" id="dummy"></div>
    </div>
  );
}
