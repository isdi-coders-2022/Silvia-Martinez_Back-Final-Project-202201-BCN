// Import the functions you need from the SDKs you need

const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "wallaplop.firebaseapp.com",
  projectId: "wallaplop",
  storageBucket: "wallaplop.appspot.com",
  messagingSenderId: "334517647802",
  appId: "1:334517647802:web:831685ca79458af463c583",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = storage;
