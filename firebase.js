
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'



var firebaseConfig = {
    apiKey: "AIzaSyBOhrfXql-G7Sk-wf0yTxaOqaZbRyd-HUs",
    authDomain: "nextjs-firebase-c8ba2.firebaseapp.com",
    projectId: "nextjs-firebase-c8ba2",
    storageBucket: "nextjs-firebase-c8ba2.appspot.com",
    messagingSenderId: "871319569487",
    appId: "1:871319569487:web:34c8bf65ac7c49378fd63a"
  };


  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  


  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()
  const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
  
  export { auth,db, storage, serverTimestamp }