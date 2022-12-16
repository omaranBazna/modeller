// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGL98TuYt6jAhUoIuMHK9Cb8GPONRanMI",
  authDomain: "modeller-58be3.firebaseapp.com",
  projectId: "modeller-58be3",
  storageBucket: "modeller-58be3.appspot.com",
  messagingSenderId: "2605093847",
  appId: "1:2605093847:web:4e94bd955c23b610ca3192",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export const signInF = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      return null;
      // ...
    });
export const signOutF = () =>
  signOut(auth)
    .then(() => {
      return null;
    })
    .catch((error) => {
      return null;
    });
