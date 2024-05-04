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
        marginTop: "10%", // Adjusted top margin for better spacing
        marginBottom: "1%",
        textAlign: "center",
        color: "#CCCCCC",
        fontSize: "35px",
        maxWidth: "500px", // Limiting maximum width for better centering on larger screens
      }}
    >
      <h1 style={{ marginBottom: "2px",marginTop:"25%" }}>Join Chat</h1> {/* Added margin below heading for spacing */}
      <div style={{ color: "red", display: `${rr}`, marginBottom: "10px" }}>
        Please Provide a Name
      </div>
      <div style={{ marginBottom: "5px" }}> {/* Added margin below input for spacing */}
        <input
          className="rounded-md"
          placeholder="Avatar Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={Name}
          style={{ height: "50px", width: "100%", padding: "0 10px" }} // Adjusted input height and padding for better appearance
        />
      </div>
      <button
        className="rounded"
        style={{
          width: "100%", // Make button full width
          backgroundColor: "cornflowerblue",
          padding: "10px 20px", // Added padding for better button appearance
          borderRadius: "8px",
          color: "white",
          border: "none",
          cursor: "pointer",
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
