import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAB6H4dA8kGq4NmFuLkeiRDP0AQGHxErRM",
  authDomain: "tracking-app-6d923.firebaseapp.com",
  projectId: "tracking-app-6d923",
  storageBucket: "tracking-app-6d923.appspot.com",
  messagingSenderId: "1032763366053",
  appId: "1:1032763366053:web:aeadaf058cd2e818648b4c",
  measurementId: "G-NVL5NMD4FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Google provider setup
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
