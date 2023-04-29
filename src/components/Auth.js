import { auth ,  googleProvider } from "../config/firebase";
import {
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
 
  

export  function Auth() {
  const [Name, setName] = useState("")
  const dispatch  = useDispatch()
  
  const {username} =  useSelector((state)=>{
        return state
    })
    useEffect(() => {
  dispatch({type:"username_change",payload:Name});
}, [Name])
// useState
// console.log(username);


   const signin = async () => {
        try {
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
  return (

<div className="Diver" style={{marginTop:"21%"}}>
  <h1>Join Chat</h1>
{/* <div className="wrapper"> */}
  <div >
    <input placeholder="Avatar Name" onChange={(e)=>{setName(e.target.value)}} value={Name} /> 
    </div>
    <div>
    <button onClick={signin}>Sign in with Google</button>
    </div>  
    </div>
  )
}
