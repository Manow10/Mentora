let bookings = [];
let editingIndex = null;

function bookSession() {
  const name = document.getElementById("student-name").value;
  const tutor = document.getElementById("tutor-name").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!name || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  bookings.push({ name, tutor, date, time });
  updateBookings();
  clearForm();
}

function updateBookings() {
  const list = document.getElementById("booking-list");
  list.innerHTML = "";

  bookings.forEach((booking, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${booking.name}</strong> booked <em>${booking.tutor}</em> on ${booking.date} at ${booking.time}
      <br>
      <button onclick="editBooking(${index})">Edit</button>
      <button onclick="deleteBooking(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function clearForm() {
  document.getElementById("student-name").value = "";
  document.getElementById("tutor-name").selectedIndex = 0;
  document.getElementById("date").value = "";
  document.getElementById("time").value = "";
}

function editBooking(index) {
  editingIndex = index;
  document.getElementById("edit-date").value = bookings[index].date;
  document.getElementById("edit-time").value = bookings[index].time;
  document.getElementById("edit-booking-modal").style.display = "block";
}

function saveEditedBooking() {
  const newDate = document.getElementById("edit-date").value;
  const newTime = document.getElementById("edit-time").value;

  if (editingIndex !== null) {
    bookings[editingIndex].date = newDate;
    bookings[editingIndex].time = newTime;
    updateBookings();
    editingIndex = null;
    document.getElementById("edit-booking-modal").style.display = "none";
  }
}

function deleteBooking(index) {
  bookings.splice(index, 1);
  updateBookings();
}

function logout() {
  localStorage.removeItem("mentoraUser");
  alert("Logged out.");
  window.location.href = "login.html";
}

function closeEditModal() {
  document.getElementById("edit-booking-modal").style.display = "none";
}
