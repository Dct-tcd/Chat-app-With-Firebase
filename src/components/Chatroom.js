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
import { Link, useParams } from "react-router-dom";
import downer from "./downer.png";
export default function Chatroom() {

//   const handleFireBaseUpload = e => {
//     e.preventDefault()
//   console.log('start of upload')
//   // async magic goes here...
//   if(imageAsFile === '') {
//     console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
//   }
//   const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
//   //initiates the firebase side uploading 
//   uploadTask.on('state_changed', 
//   (snapShot) => {
//     //takes a snap shot of the process as it is happening
//     console.log(snapShot)
//   }, (err) => {
//     //catches the errors
//     console.log(err)
//   }, () => {
//     // gets the functions from storage refences the image storage in firebase by the children
//     // gets the download url then sets the image from firebase as the value for the imgUrl key:
//     storage.ref('images').child(imageAsFile.name).getDownloadURL()
//      .then(fireBaseUrl => {
//        setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
//      })
//   })
//   }

//   const allInputs = {imgUrl: ''}
//   const [imageAsFile, setImageAsFile] = useState('')
//   const [imageAsUrl, setImageAsUrl] = useState(allInputs)

//   const handleImageAsFile = (e) => {
//     const image = e.target.files[0]
//     setImageAsFile(imageFile => (image))
// }



  const params = useParams();
  const id = params.id;
  let newId = "";
  for (let ip = 0; ip < id.length; ip++) {
    // console.log(id[ip],"kkkkk");
    if (id[ip] >= "0" && id[ip] <= "9")
    newId += id[ip];
  }

  const [messageList, setmessageList] = useState([]);
  const [CopySuccess, setCopySuccess] = useState("none");
  const [NewmessageList, setNewmessageList] = useState([]);

  const [photourl, setphotourl] = useState("");
  const messagesCollectionRef = collection(db, "messages");
  // const q = query(collection(db, "messages").orderBy("createdAt"));
  const { username } = useSelector((state) => {
    return state;
  });

  const createmessage = async (e) => {
    e.preventDefault();
    if (Input!="") 
    {
    setinputer("");
    const ans = Number(new Date());

    const Dater = new Date().toLocaleString();
    try {
      await addDoc(messagesCollectionRef, {
        createdAt: ans,
        desc: Input,
        url: photourl,
        name: username,
        userId: auth?.currentUser?.uid,
        type: newId,
        Date:Dater,
      });
      getMessageList();
      // getMovieList();
    } catch (err) {
      console.error(err);
    }
  }
  };

  const getMessageList = async () => {
    try {
      // Query
      // conversationReference
      // const chatQuery = conversationReference.orderByChild("createdAt"). limitToLast(20);
      const q = query(
        messagesCollectionRef,
        orderBy("createdAt","desc"),
        // limit(30)
      );
      // console.log(username, "1");
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);

      //   console.log(chatQuery);
      //   filteredData.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()) ;

      const newList = filteredData.filter((e) => {
        return e.type == newId;
      });

      setmessageList(newList.reverse());
    } catch (err) {
      console.error(err);
    }
    // window.scrollTo({ left: 0, bottom: 0, behavior: "smooth" });
    // document.getElementById("dummy").scrollIntoView(false,{ behaviour: "smooth" });
  };

  useEffect(() => {
    getMessageList();
    getNewMessageList();

    const user = auth.currentUser;

    if (user != null) {
      if (user.photoURL!=null) setphotourl(user.photoURL);
      else setphotourl("https://th.bing.com/th/id/OIP.zBut8QVH36Vn_Mn84OznCAHaHa?pid=ImgDet&rs=1");
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
  const getNewMessageList = async () => {
    try {
      // Query
      // conversationReference
      // const chatQuery = conversationReference.orderByChild("createdAt"). limitToLast(20);
      const q = query(
        messagesCollectionRef,
        orderBy("createdAt","desc"),
        // limit(30)
      );
      // console.log(username, "1");
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(filteredData);

      //   console.log(chatQuery);
      //   filteredData.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()) ;

      const newList = filteredData.filter((e) => {
        return e.type == newId;
      });

      setNewmessageList(newList.reverse());
    } catch (err) {
      console.error(err);
    }
    // window.scrollTo({
    //   left: 0,
    //   top: document.body.scrollHeight,
    //   behavior: "smooth",
    // });
    // window.scrollTo({ left: 0, bottom: 0, behavior: "smooth" });
    // document.getElementById("dummy").scrollIntoView(false,{ behaviour: "smooth" });
  };
setTimeout(() => {
  getNewMessageList();
  if (messageList.length != NewmessageList.length) {setmessageList(NewmessageList);
  }
}, 1000);

const handleImageClick = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    window.scrollTo({ left: 0, bottom: 0, behavior: "smooth" });
    document.getElementById("dummy").scrollIntoView(false,{ behaviour: "smooth" })
}

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("block");
      setTimeout(() => {
        setCopySuccess("none");
        // console.log("devada");
      }, 1200);
    } catch (err) {
      setCopySuccess("none");
    }
  };
  let val = "start";
  return (
    <div style={{ textAlign: "-webkit-center"  }}>
      {/* <Link></Link> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "728px",
           marginLeft:"5%",
           marginRight:"5%",
           marginTop:"1%"
        }}
      >
        <button className="logoutBtn" onClick={logout}>
          <Link to="/" style={{ textDecoration: "none", color: "beige" }}>
            Log out
          </Link>
        </button>

        <button
          className="logoutBtn"
          onClick={() => {
            copyToClipBoard(newId);
          }}
        >
          Id :: {newId}
        </button>

        <button className="logoutBtn">
          <Link to="/rooms" style={{ textDecoration: "none", color: "beige" }}>
            All Rooms
          </Link>
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1%",
        }}
      >
        <div
          className="alert alert-warning"
          role="alert"
          style={{
            color: "beige",
            backgroundColor: "grey",
            borderColor: "#ffecb5",
            width: "150px",
            padding:"0%",
            display: `${CopySuccess}`,
          }}
        >
          {" "}
          Copied ✅{" "}
        </div>
      </div>
      <div style={{ marginBottom: "10%", marginTop: "3%", maxWidth: "728px" }}>
        {messageList.map((ele) => {
          return (
            // <div>
            <div
              style={{
                display: "flex",
                color: "white",
                padding: "8px",
                borderRadius: "8px",
                margin:"5%",
                maxWidth: "728px",
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
                  alignSelf: "start",
                  padding: "0%",
                  fontSize: "1rem",
                }}
                type="button"
                // className="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`${ele.name}`}
              >
                <img
                  src={
                    ele.url ||
                    "https://th.bing.com/th/id/OIP.zBut8QVH36Vn_Mn84OznCAHaHa?pid=ImgDet&rs=1"
                  }

                />
              </button>
              <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"start",justifyContent:"flex-start"}}>
              <div
                style={{
                  display: "flex",
                  color: "white",
                  padding: "8px",
                  borderRadius: "8px",
                  marginLeft: "3px",
                  marginRight: "3px",
                  marginTop: "3px",
                  textAlign: "left",
                  maxWidth:"300px",
                  wordBreak: "break-word",
                  backgroundColor: `${
                    ele.userId !== auth.currentUser.uid
                      ? "green"
                      : "hwb(204 29% 22%)"
                  }`,
                }}
              >
                {ele.desc}
                {/* {ele.Date} */}
                {/* </button> */}
              </div>
              <div  className="timer"
                style={{
                  // display: "flex",
                  color: "white",
                  padding: "3px",
                  borderRadius: "8px",
                  margin: "3px",
                  width:"fit-content",
                  backgroundColor: `${
                    ele.userId !== auth.currentUser.uid
                      ? "green"
                      : "hwb(204 29% 22%)"
                  }`,
                }}
              >
                {ele.Date}
                {/* {ele.Date} */}
                {/* </button> */}
              </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footerDiv">
          <div className="footerr" > <img src={downer} onClick={handleImageClick} /> </div>
      </div>
      <div className="footerDiv">
        <form className="footer" onSubmit={createmessage}>
          <input
            className="inputer"
            placeholder="Your Message ..."
            onChange={handleinput}
            value={inputer}
          />
          <button style={{ alignContent: "center", alignItems:"center", justifyContent: "center", }}>
            🕊️
          </button>
        </form>
        {/* </div>    */}
      {/* <form onSubmit={handleFireBaseUpload}>
        <input 
          type="file"
          onChange={handleImageAsFile}
        />
        <button>upload to firebase</button>
        </form> */}
      </div>
      <div className="dummy" id="dummy"></div>
    </div>
  );
}