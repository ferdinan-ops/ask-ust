import { auth, provider } from "../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

// Fungsi Login dengan akun google
export const loginUserGoogle = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const dataUser = {
          username: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // dispatch({ type: "CHANGE_LOADING", value: false });
        // dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};
