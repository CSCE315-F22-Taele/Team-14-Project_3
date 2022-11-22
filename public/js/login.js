const firebaseApp = require('firebase/app');
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDQ1FLuqa5dFbwZFWHU0qRf3xiq2C7D0I",
    authDomain: "pom-honey.firebaseapp.com",
    projectId: "pom-honey",
    storageBucket: "pom-honey.appspot.com",
    messagingSenderId: "604614429107",
    appId: "1:604614429107:web:f8d45bae115533002823c6"
};

const app = firebaseApp.initializeApp(firebaseConfig);

const firebaseAuth = require("firebase/auth");

const provider = new firebaseAuth.GoogleAuthProvider();

const auth = firebaseAuth.getAuth();
firebaseAuth.signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = firebaseAuth.GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = firebaseAuth.GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  firebaseAuth.signOut(auth).then(() => {
    console.log("signed in successfully");
  }).catch((error) => {
    console.log("error occurred");
  });