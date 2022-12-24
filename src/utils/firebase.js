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
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { generateID, generateDirectory } from "./functions";
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
    let id = generateID();
    const docRef = doc(db, `users/${user.uid}`);

    const document = await getDoc(docRef);

    const data = document.data();

    if (!("collections" in data)) {
      await setDoc(docRef, {
        collections: id,
      });
    } else {
      id = data.collections;
    }

    let collectionDir = generateDirectory();
    const modelRef = doc(db, `collections/${id}`);
    await setDoc(modelRef, {
      directory: collectionDir,
    });

    collectionDir = collectionDir.split("").join("/") + "/model";
    console.log(collectionDir);
    const storageRef = ref(storage, `collections/${collectionDir}`);
    const snapshot = await uploadBytes(storageRef, file);

    return snapshot;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const downloadModal = async (modelRef) => {
  return getDownloadURL(ref(storage, `${modelRef}/model.glb`)).catch(
    (error) => {
      console.log(error);
    }
  );
};

export const getAllModels = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, `models`));
    const data = [];
    querySnapshot.forEach(async (doc) => {
      const docData = await doc.data();

      data.push({
        imageURL: docData.imageURL,
        url: docData.url,
        name: docData.name,
      });
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signInF = () => {
  return setPersistence(auth, browserSessionPersistence).then(() => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        window.localStorage.setItem("user", JSON.stringify(user));
        return user;
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
