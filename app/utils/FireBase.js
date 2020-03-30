import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZ26xTy2DkOnRCzJ-ZGqU8Gwkx_9wbOk4",
  authDomain: "tenedores-79734.firebaseapp.com",
  databaseURL: "https://tenedores-79734.firebaseio.com",
  projectId: "tenedores-79734",
  storageBucket: "tenedores-79734.appspot.com",
  messagingSenderId: "808142155018",
  appId: "1:808142155018:web:a439ad075bc431f8d11ef3"
};

export const firebaseapp = firebase.initializeApp(firebaseConfig);
