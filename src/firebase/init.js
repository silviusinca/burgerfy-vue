import firebase from 'firebase';
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAJPQ__Oz5cgbsccs5mochUl5TQg0sJSuE",
  authDomain: "burgerfy-vue-project.firebaseapp.com",
  databaseURL: "https://burgerfy-vue-project.firebaseio.com",
  projectId: "burgerfy-vue-project",
  storageBucket: "burgerfy-vue-project.appspot.com",
  messagingSenderId: "239694551681"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()