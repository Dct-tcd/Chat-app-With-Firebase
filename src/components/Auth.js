import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function Auth() {
  const [Name, setName] = useState("");
  const [rr, setrr] = useState("none");

  const dispatch = useDispatch();

  const { username } = useSelector((state) => {
    return state;
  });
  
  useEffect(() => {
    dispatch({ type: "username_change", payload: Name });
  }, [Name]);
  // useState
  // console.log(username);

  const signin = async () => {
    try {
      setrr("none");
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };
  const tomper = () => {
    console.log(rr);
    setrr("block");
    setTimeout(() => {
      setrr("none");
      
    }, 1500);
  };
  // console.log("mounting");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        className="Diver"
        style={{
          marginTop: "15%",
          marginBottom: "1%",
          textAlign: "center",
          color: "#CCCCCC",
          fontSize:"35px"
        }}
      >
        <h1>Join Chat</h1>
        {/* <div className="wrapper"> */}
        <div style={{ color: "red", display: `${rr}`,  }}>
          Please Provide a Name
        </div>
        <div >
          <input
          className="rounded"
            placeholder="Avatar Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={Name}
            style={{ height:"8vh" , width:"50vh"}}
          />
        </div>
        
        {/* <div> */}
          <button
          className="rounded"
            style={{
              paddingLeft: "20%",
              // margin: "1%",
              paddingRight: "20%",
               display:"inline",
              // color:"darkslategrey",
              backgroundColor: "cornflowerblue",
            }}
            onClick={Name !== "" ? signin : tomper}
          >
            Sign in with Google
          </button>
        </div>
      </div>
    // </div>
  );
}
