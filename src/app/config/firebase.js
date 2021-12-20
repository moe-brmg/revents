import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/database"
import "firebase/compat/auth"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBwJO2ActOqyv8V0DXB5gCSmknM6wRBaMQ",
  authDomain: "revents-29689.firebaseapp.com",
  databaseURL:
    "https://revents-29689-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "revents-29689",
  storageBucket: "revents-29689.appspot.com",
  messagingSenderId: "599847593882",
  appId: "1:599847593882:web:2df600a9d4bf3fb58a3c23",
}

export const app = firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase
