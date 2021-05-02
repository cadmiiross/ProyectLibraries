import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyCcm3FAc351QuxnnzVZmyWhF1gaa2dIl_k",
    authDomain: "librariesproy-97301.firebaseapp.com",
    projectId: "librariesproy-97301",
    storageBucket: "librariesproy-97301.appspot.com",
    messagingSenderId: "504519134046",
    appId: "1:504519134046:web:17771e0f1485e93bcbddcf"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)