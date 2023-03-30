// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_api_key,
  authDomain: process.env.REACT_APP_auth_domain,
  projectId: process.env.REACT_APP_project_id,
  storageBucket: process.env.REACT_APP_storage_bucket,
  messagingSenderId: process.env.REACT_APP_messaging_sender_id,
  appId: process.env.REACT_APP_app_id,
  measurementId: process.env.REACT_APP_measurement_id,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // console.log(result);
      const name = result.user.displayName
      const email = result.user.email
      const profilePic = result.user.photoURL
      localStorage.setItem("name", name)
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      window.location.reload(true)
    })
    .catch((err) => {
      console.log(err);
    });
};
