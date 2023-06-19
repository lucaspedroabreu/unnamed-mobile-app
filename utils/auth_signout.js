import { auth } from '../firebase'

export const authSignOut = () => {
  auth.signOut()
    .then(() => {
      console.log("Sign out")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode)
      alert(errorMessage)
    })
}

