import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyAkgMYvamqVOzWCrUPRpQWpiDZuP94hrxQ",
    authDomain: "example-14a6e.firebaseapp.com",
    databaseURL: "https://example-14a6e.firebaseio.com",
    projectId: "example-14a6e",
    storageBucket: "example-14a6e.appspot.com",
    messagingSenderId: "758880751131",
    appId: "1:758880751131:web:3abfbe9a237c1badde32be"
};

firebase.initializeApp(firebaseConfig);

export const loginGoogle= ()=>{
  let provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    var user = result.user;
  }).catch(function(error) {
    console.log('gj');
  });  
}



