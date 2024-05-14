"use strict";

const inputTask = document.querySelector("#input-task");
const btnAdd = document.querySelector("#btn-add");
const todoList = document.querySelector("#todo-list");

// Thêm sự kiện cho nút Add
btnAdd.addEventListener("click", function () {
  const todo = new Task(inputTask.value, currentUser.userName, false);
  todoArr.push(todo);
  saveToStorage("todoArr", todoArr);

  displaytodoList();

  inputTask.value = "";
});

// Hàm hiển thị danh sách ToDo
function displaytodoList() {
  let html = "";

  todoArr
    .filter((element) => element.owner === currentUser.userName)
    .forEach((element, idx) => {
      const isChecked = element.isDone ? "checked" : ""; // Kiểm tra trạng thái isDone để áp dụng class checked
      html += `<li class="${isChecked}" onclick="toggle(${idx})">${element.task}<span class="close" onclick="deleteToDo('${element.task}')">×</span></li>`;
    });
  todoList.innerHTML = html;
}
displaytodoList();

// Hàm xử lý khi click nút X
function deleteToDo(todo) {
  const todos = document.querySelectorAll("#todo-list li");

  todos.forEach(function (todoEl) {
    todoEl.addEventListener("click", function (e) {
      if (confirm("Are you sure ?")) {
        for (let i = 0; i < todoArr.length; i++) {
          if (todoArr[i].task === todo) {
            todoArr.splice(i, 1);
          }
        }
      }
      saveToStorage("todoArr", todoArr);
      displaytodoList();
      e.stopPropagation();
    });
  });
}

// Hàm toggle khi click task trong todoList
// Hàm toggle khi click task trong todoList
function toggle(idx) {
  const todos = document.querySelectorAll("#todo-list li");

  todos[idx].classList.toggle("checked");

  // Cập nhật trạng thái của Todo trong mảng todoArr
  todoArr[idx].isDone = todos[idx].classList.contains("checked");

  // Lưu dữ liệu vào LocalStorage sau khi cập nhật
  saveToStorage("todoArr", todoArr);
}
