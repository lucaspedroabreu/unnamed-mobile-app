import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'

export const authEmailLogIn = ({email, password}) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Logged in with: ", user.email)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
    alert(errorMessage)
  });
}