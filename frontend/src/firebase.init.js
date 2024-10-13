
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvow0hDJjqupduFuoTY496sBQDPxcl9Tg",
  authDomain: "twitter-clone-cbc29.firebaseapp.com",
  projectId: "twitter-clone-cbc29",
  storageBucket: "twitter-clone-cbc29.appspot.com",
  messagingSenderId: "342916971040",
  appId: "1:342916971040:web:cd333758ec0545e78cda45",
  measurementId: "G-YKCP304R4G"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//console.log(auth);

export default auth;