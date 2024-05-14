"use strict";

const inputUserName = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const btnLogin = document.querySelector("#btn-submit");

btnLogin.addEventListener("click", function () {
  for (let i = 0; i < userArr.length; i++) {
    if (
      inputUserName.value === userArr[i].userName &&
      inputPassword.value === userArr[i].passWord
    ) {
      alert("Welcome !  Login success !");
      saveToStorage("currentUser", userArr[i]);
      window.location.href = "../index.html";
    } else if (inputUserName.value === "" || inputPassword.value === "") {
      alert("Fill in the blank !!!");
    } else {
      alert("User not found !!");
    }
  }
});
