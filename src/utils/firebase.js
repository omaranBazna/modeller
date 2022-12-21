// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInWithCustomToken,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { generateID } from "./functions";
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
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const saveToStorage = async (file, user, name) => {
  try {
    const id = generateID();
    const docRef = doc(db, `users/${user.uid}/models/${id}`);

    await setDoc(docRef, {
      name: name,
      ref: id,
    });

    const storageRef = ref(storage, `models/${id}`);
    const snapshot = await uploadBytes(storageRef, file);
    console.log(snapshot);
    return snapshot;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAllDocs = async (user) => {
  const querySnapshot = await getDocs(
    collection(db, `users/${user.uid}/models`)
  );
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};

export const addToDataBase = async (user) => {
  try {
    const docRef = doc(db, "users/models", user.uid);

    await setDoc(docRef, {
      name: "test",
    });
  } catch (e) {
    console.log(e);
  }
};

export const singInWithToken = (token) => {
  return signInWithCustomToken(auth, token)
    .then((result) => {
      console.log("result", result);
      return result.user;
    })
    .catch((e) => console.log(e));
};
export const signInF = () => {
  return setPersistence(auth, browserSessionPersistence).then(() => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        window.localStorage.setItem("user", JSON.stringify(user));
        return user;
        // ...
      })
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log(error);
        /*
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      */
        return null;
        // ...
      });
  });
};
export const signOutF = () =>
  signOut(auth)
    .then(() => {
      return null;
    })
    .catch((error) => {
      return null;
    });
