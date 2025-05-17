// booking.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form handler
document.getElementById("booking-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const studentName = document.getElementById("studentName").value;
  const tutorName = document.getElementById("tutorName").value;
  const sessionDate = document.getElementById("sessionDate").value;
  const sessionTime = document.getElementById("sessionTime").value;

  try {
    await addDoc(collection(db, "bookings"), {
      studentName,
      tutorName,
      sessionDate,
      sessionTime,
      timestamp: new Date()
    });

    alert("Booking confirmed!");
    document.getElementById("booking-form").reset();
  } catch (err) {
    console.error("Error booking:", err);
    alert("Failed to book. Please check your Firebase rules.");
  }
});
