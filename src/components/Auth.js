import { auth ,  googleProvider } from "../config/firebase";
import {
  signInWithPopup,
  signOut,
} from "firebase/auth";

export  function Auth() {
 
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
    <div>

    <button onClick={signin}>Sign in with Google</button>  
    <button onClick={logout}>Log out</button>  
    
    </div>
  )
}
