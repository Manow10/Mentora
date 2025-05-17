// auth.js

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-auth.js";
import { app } from './firebase.js';

const auth = getAuth(app);

// Signup function
window.signup = function () {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Signup successful");
      window.location.href = "login.html";
    })
    .catch(error => alert(error.message));
};

// Login function
window.login = function () {
  const email = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login successful");
      window.location.href = "tutors.html"; // Or dashboard.html
    })
    .catch(error => alert(error.message));
};
