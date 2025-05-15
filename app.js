let currentUser = null;
let bookedSessions = [];

function signup(event) {
  event.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("mentora_user", JSON.stringify(user));
  alert("Signup successful! Please log in.");
  document.getElementById("signup-form").reset();
  showLogin();
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const savedUser = JSON.parse(localStorage.getItem("mentora_user"));

  if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
    alert("Invalid login credentials.");
    return;
  }

  currentUser = savedUser;
  showDashboard(currentUser.name);
}

function showLogin() {
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

function showSignup() {
  document.getElementById("signup").style.display = "block";
  document.getElementById("login").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
}

function showDashboard(name) {
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("student-name").textContent = name;
}

function handleBooking(event) {
  event.preventDefault();

  const tutor = document.getElementById("tutor-select").value;
  const date = document.getElementById("booking-date").value;
  const time = document.getElementById("time-slot").value;

  if (!tutor || !date || !time) {
    alert("Please fill all fields.");
    return;
  }

  const session = {
    tutor,
    time: `${date} at ${time}`
  };

  bookedSessions.push(session);
  saveSessions();
  renderDashboard();
  document.getElementById("booking-form").reset();
}

function renderDashboard() {
  const list = document.getElementById("booked-sessions-list");
  list.innerHTML = "";

  bookedSessions.forEach((session, index) => {
    const li = document.createElement("li");
    li.textContent = `${session.tutor} - ${session.time}`;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel-btn";
    cancelBtn.onclick = () => {
      bookedSessions.splice(index, 1);
      saveSessions();
      renderDashboard();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.onclick = () => {
      const newDate = prompt("Enter new date (YYYY-MM-DD):", session.time.split(" ")[0]);
      const newTime = prompt("Enter new time (e.g., 3:00 PM):", session.time.split("at ")[1]);

      if (newDate && newTime) {
        session.time = `${newDate} at ${newTime}`;
        saveSessions();
        renderDashboard();
      }
    };

    li.appendChild(editBtn);
    li.appendChild(cancelBtn);
    list.appendChild(li);
  });
}

function saveSessions() {
  localStorage.setItem("mentora_sessions", JSON.stringify(bookedSessions));
}

function loadSessions() {
  const data = localStorage.getItem("mentora_sessions");
  if (data) {
    bookedSessions = JSON.parse(data);
  }
}

window.onload = () => {
  const user = JSON.parse(localStorage.getItem("mentora_user"));
  if (user) {
    currentUser = user;
    showDashboard(user.name);
  }

  loadSessions();
  renderDashboard();

  // Event bindings
  document.getElementById("signup-form").addEventListener("submit", signup);
  document.getElementById("login-form").addEventListener("submit", login);
  document.getElementById("booking-form").addEventListener("submit", handleBooking);
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("mentora_user");
    currentUser = null;
    showLogin();
  });
};
