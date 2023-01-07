// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
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
  query,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { generateID, generateDirectory } from "./functions";

const DEFAULT_PROFILE_URL =
  "https://media.istockphoto.com/id/517998264/vector/male-user-icon.jpg?s=612x612&w=0&k=20&c=4RMhqIXcJMcFkRJPq6K8h7ozuUoZhPwKniEke6KYa_k=";
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

export const saveToStorage = async (file, user, name, modelId, modelUrl) => {
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
    let saveId = generateID();
    let collectionDir = generateDirectory();
    const modelRef = doc(db, `collections/${id}/collections/${saveId}`);
    const collectionsMetaData = doc(db, `collections/${id}`);
    await setDoc(modelRef, {
      directory: collectionDir,
      name: name,
      modelId: modelId,
      modelUrl: modelUrl,
    });
    const pastMeta = await getDoc(collectionsMetaData);
    console.log(pastMeta.data() ? "Count is valid" : "Count is not valid");
    await setDoc(collectionsMetaData, {
      count: pastMeta.data() ? pastMeta.data().count + 1 : 1,
    });

    collectionDir = collectionDir.split("").join("/") + "/model";
    const storageRef = ref(storage, `collections/${collectionDir}`);
    const snapshot = await uploadBytes(storageRef, file);

    return snapshot;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const loadUserCollections = async (user) => {
  try {
    const userDocRef = doc(db, `users/${user.uid}`);

    const userDoc = await getDoc(userDocRef);
    const collectionURL = userDoc.data().collections;
    const collectionRef = collection(
      db,
      `collections/${collectionURL}/collections`
    );

    const snapshot = await getDocs(collectionRef);
    const documents = [];
    const modelCollection = collection(db, models);
    const models = {};
    const modelSnapshot = await getDocs(modelCollection);
    modelSnapshot.forEach((doc) => {
      const document = doc.data();
      models[document.id] = document;
    });
    snapshot.forEach((doc) => {
      const document = doc.data();
      const modelId = document.modelId;

      documents.push(document);
    });

    return documents;
  } catch (e) {
    console.log(e);
  }
};
export const saveUserProfile = async (user, name, file) => {
  try {
    if (file) {
      const docRef = doc(db, `users/${user.uid}`);

      let collectionDir = generateDirectory();
      let collectionDirStr = collectionDir.split("").join("/") + "/profile";
      let storageRef = ref(storage, `users/${collectionDirStr}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      const document = await getDoc(docRef);
      const data = document.data();
      if (data.imageURL) {
        storageRef = ref(storage, data.imageDir);
        await deleteObject(storageRef);
      }
      await setDoc(docRef, {
        ...document.data(),
        profileName: name,
        imageURL: url,
        imageDir: `users/${collectionDirStr}`,
      });
    } else {
      const docRef = doc(db, `users/${user.uid}`);

      const document = await getDoc(docRef);
      await setDoc(docRef, {
        ...document.data(),
        profileName: name,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const getUserProfile = async (user) => {
  const docRef = doc(db, `users/${user.uid}`);

  const document = await (await getDoc(docRef)).data();
  const result = {
    name: document.profileName ? document.profileName : user.displayName,
    url: document.imageURL ? document.imageURL : DEFAULT_PROFILE_URL,
  };

  return result;
};
export const downloadModal = async (modelRef) => {
  try {
    const url = await getDownloadURL(ref(storage, `${modelRef}/model.glb`));
    const regions = await getDownloadURL(
      ref(storage, `${modelRef}/regions.txt`)
    );
    console.log("regions", regions);
    const response = await fetch(regions);

    const text = await response.text();
    console.log(text);
    const arr = text.split(",");
    return { url: url, regions: arr };
  } catch (e) {
    console.log(e);
  }
};

export const getAllModels = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, `models`));
    const data = [];
    querySnapshot.forEach(async (doc) => {
      const docData = await doc.data();

      data.push({
        ...docData,
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
