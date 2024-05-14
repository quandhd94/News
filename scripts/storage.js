"use strict";

// Hàm lấy và lưu data từ storage
const getFromStorage = function (key, defaultVal) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
};

const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

// Phần lưu trữ mảng user
const KEY = "userArr";
const userObjArr = getFromStorage(KEY) || []; //mảng chứa các object
console.log(userObjArr);

const userArr = userObjArr.map((user) => parseUser(user)); //mảng chứa các user
console.log(userArr);

const currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.passWord
  );

  return user;
}

// Phần lưu trữ mảng TodoList
const todoObjArr = getFromStorage("todoArr") || []; //mảng chứa các object
console.log(todoObjArr);

const todoArr = todoObjArr.map((todo) => parseToDoList(todo)); //mảng chứa các todo
console.log(todoArr);
function parseToDoList(todoData) {
  const todo = new Task(todoData.task, todoData.owner, todoData.isDone);

  return todo;
}
// Phần lưu trữ thiết lập người dùng
const userSettings = getFromStorage("userSettings", {
  pageSize: 5,
  category: "General",
});
// Cập nhật thiết lập người dùng khi có thay đổi
function updateSettings(pageSize, category) {
  const settings = {
    pageSize: pageSize,
    category: category,
  };
  saveToStorage("userSettings", settings);
}
