import { app } from '../firebase/FirebaseConfig'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(app);

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentUser: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const email = user.email;
            console.log("Current User", email);
            const currentUser = {
              email: email,
            };
            setStore({ currentUser: currentUser });
            // ...
          } else {
            // User is signed out
            // ...
          }
        });
      },
      userLogin: (email, password) => {
        //get the store
        const store = getStore();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("Sign In Successful", user);
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
      },
      userSignup: (email, password) => {
        //get the store
        const store = getStore();

        createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Signed in
            const user = userCredential.user;
            // setUser;
            console.log("Sign up successful", user);
            // ...
          }
        );
      },
      userLogout: () => {
        //get the store
        const store = getStore();

        signOut(auth)
          .then(() => {
            // Sign-out successful.
            console.log("Sign-out successful");
          })
          .catch((error) => {
            // An error happened.
          });
      },
    },
  };
};

export default getState;
