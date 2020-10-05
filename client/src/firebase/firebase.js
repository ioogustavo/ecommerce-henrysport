import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAu0doqgTUiQOIyzFNff5Hzo6-BXMfhdgk",
    authDomain: "ecommerce-henry.firebaseapp.com",
    databaseURL: "https://ecommerce-henry.firebaseio.com",
    projectId: "ecommerce-henry",
    storageBucket: "ecommerce-henry.appspot.com",
    messagingSenderId: "566564759407",
    appId: "1:566564759407:web:d4ef36bb399fb87ed0ea9a"
  };



firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export  {storage, firebase as default};