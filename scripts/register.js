"use strict";

const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUserName = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputConfirmPassword = document.querySelector("#input-password-confirm");
const btnRegister = document.querySelector("#btn-submit");

// Thêm sự kiện vào nút Register
btnRegister.addEventListener("click", function () {
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUserName.value,
    inputPassword.value,
    inputConfirmPassword.value
  );

  for (let i = 0; i < userArr.length; i++) {
    if (inputUserName.value === userArr[i].userName) {
      alert("This user existed !");
    }
  }

  if (
    inputFirstName.value === "" ||
    inputLastName.value === "" ||
    inputUserName.value === "" ||
    inputPassword.value === "" ||
    inputConfirmPassword === ""
  ) {
    alert("Please fill in the blank!");
  } else if (inputPassword.value !== inputConfirmPassword.value) {
    alert("Confirm Password is not valid !");
  } else if (inputPassword.value.length <= 8) {
    alert("Length of password is least 8 !");
  } else {
    userArr.push(user); //đẩy user vào mảng userArr
    saveToStorage("userArr", userArr); //lưu trữ vào localstorage
    window.location.href = "../pages/login.html"; //chuyển hướng sang page login screen
  }
});
