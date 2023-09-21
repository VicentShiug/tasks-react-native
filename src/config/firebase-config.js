import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBXtSAb3B3_HzRm-6ihIszeD1Byxf7XF1Q",
    authDomain: "tasks-aaa84.firebaseapp.com",
    projectId: "tasks-aaa84",
    storageBucket: "tasks-aaa84.appspot.com",
    messagingSenderId: "831323846994",
    appId: "1:831323846994:web:9c1327e51bfa23af96e28b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// firebase.initializeApp(firebaseConfig);
const database = getFirestore(app)

export {database, app}