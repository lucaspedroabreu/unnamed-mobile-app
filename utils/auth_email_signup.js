import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from '../firebase'

export const authEmailSignUp = ({email, password}) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // send email verification
    await sendEmailVerification(userCredential.user)

    alert("Email verification sent!")
    // Signed up
    const user = userCredential.user;
    console.log("Registered with: ", user.emal)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
    alert(errorMessage)
  });
}