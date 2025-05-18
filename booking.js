// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyABJhKf5suoKrUPTI6qKF1DVCeV51ENa08",
  authDomain: "mentoraapp-7c915.firebaseapp.com",
  projectId: "mentoraapp-7c915",
  storageBucket: "mentoraapp-7c915.appspot.com",
  messagingSenderId: "251816072807",
  appId: "1:251816072807:web:514e5188e869b98c05a6c2",
  measurementId: "G-T03S2SV79K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Booking submission handler
document.getElementById("booking-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const studentName = document.getElementById("studentName").value;
  const tutorName = document.getElementById("tutorName").value;
  const sessionDate = document.getElementById("sessionDate").value;
  const sessionTime = document.getElementById("sessionTime").value;

  try {
    await db.collection("bookings").add({
      studentName,
      tutorName,
      sessionDate,
      sessionTime,
      timestamp: new Date()
    });

    alert("✅ Booking confirmed and saved!");
    document.getElementById("booking-form").reset();

    // Load Jitsi call
    loadJitsiRoom(tutorName);

    // Load PayPal button
    loadPayPal();
  } catch (error) {
    console.error("Error saving booking:", error);
    alert("❌ Booking failed. Try again.");
  }
});

// Load Jitsi video call
function loadJitsiRoom(tutorName) {
  const domain = "meet.jit.si";
  const roomName = "MentoraSession_" + Math.floor(Math.random() * 1000000);
  const options = {
    roomName: roomName,
    width: "100%",
    height: 500,
    parentNode: document.body,
    configOverwrite: {},
    interfaceConfigOverwrite: {},
  };
  const script = document.createElement("script");
  script.src = "https://meet.jit.si/external_api.js";
  script.onload = () => {
    new JitsiMeetExternalAPI(domain, options);
  };
  document.body.appendChild(script);
}

// Load PayPal payment button
function loadPayPal() {
  const script = document.createElement("script");
  script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"; // Replace this with your client ID
  script.onload = () => {
    paypal.Buttons({
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '5.00' // You can change this to your price
            }
          }]
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert('✅ Payment successful from ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  };
  document.body.appendChild(script);
}
