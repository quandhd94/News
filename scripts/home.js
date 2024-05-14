"use strict";

const containerLogout = document.querySelector("#main-content");
const containerLogin = document.querySelector("#login-modal");
const message = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");

if (currentUser) {
  containerLogin.style.display = "none";
  containerLogout.style.display = "block";
  message.textContent = `Welcome ${currentUser.firstName}`;
} else {
  containerLogin.style.display = "block";
  containerLogout.style.display = "none";
}

// Thêm sự kiện nút Logout
btnLogout.addEventListener("click", function () {
  saveToStorage("currentUser", null);

  window.location.href = "../index.html";
});
