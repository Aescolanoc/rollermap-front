import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { firebaseConfig } from "./config";

const data = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
};

const firebase = initializeApp(data);
const storage = getStorage();

export default {
  firebase,
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
};
