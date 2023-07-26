import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhd7LXqllj5ug4mExtIpewleQ_vFKZ0Ws",
  authDomain: "radblog-8ebde.firebaseapp.com",
  projectId: "radblog-8ebde",
  storageBucket: "radblog-8ebde.appspot.com",
  messagingSenderId: "117389966090",
  appId: "1:117389966090:web:fc7fcb1648e118be6698f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
