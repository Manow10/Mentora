function signup() {
  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;

  if (!username || !password) {
    alert("Please enter both fields");
    return;
  }

  localStorage.setItem("mentoraUser", JSON.stringify({ username, password }));
  alert("Account created! Please log in.");
  window.location.href = "login.html";
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const saved = JSON.parse(localStorage.getItem("mentoraUser"));

  if (saved && saved.username === username && saved.password === password) {
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials!");
  }
}
