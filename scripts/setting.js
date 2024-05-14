"use strict";
const apiKey = "d942e4f5fc7740048601b95dfb60fe5d";
// Cập nhật hàm getDataFromAPI để sử dụng các thiết lập mới của người dùng
async function getDataFromAPI(country, category, pageSize, page) {
  try {
    const userSettings = getFromStorage("userSettings", {
      pageSize: 5,
      category: "General",
    });

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${userSettings.category}&pageSize=${userSettings.pageSize}&page=${page}&apiKey=${apiKey}`
    );
    const data = await res.json();

    // totalResults = data.totalResults;
    // console.log(data);

    // displayNews(data);
  } catch (err) {
    console.log(err);
  }
}
// Lấy các phần tử DOM cần thiết
const pageSizeInput = document.querySelector("#input-page-size");
const categorySelect = document.querySelector("#input-category");
const saveBtn = document.querySelector("#btn-submit");

// Hiển thị các thiết lập trước đó của người dùng
window.addEventListener("DOMContentLoaded", function () {
  const settings = getSettings();
  if (settings) {
    pageSizeInput.value = settings.pageSize;
    categorySelect.value = settings.category;
  }
});

// Lưu các thiết lập mới của người dùng khi nhấn nút Save Settings
saveBtn.addEventListener("click", function () {
  const pageSize = parseInt(pageSizeInput.value);
  const category = categorySelect.value;

  // Validate dữ liệu đầu vào
  if (pageSize <= 0 || isNaN(pageSize)) {
    alert("News per page phải là một số nguyên dương.");
    return;
  }

  // Lưu thiết lập vào local storage
  saveSettings(pageSize, category);

  // Cập nhật phần hiển thị trang News
  updateNewsPage(pageSize, category);

  alert("Thiết lập đã được lưu thành công!");
});

// Lưu thiết lập vào local storage
function saveSettings(pageSize, category) {
  const settings = {
    pageSize: pageSize,
    category: category,
  };
  saveToStorage("userSettings", settings);
}

// Lấy các thiết lập từ local storage
function getSettings() {
  return getFromStorage("userSettings");
}

// Cập nhật phần hiển thị trang News
function updateNewsPage(pageSize, category) {
  getDataFromAPI("us", category.toLowerCase(), pageSize, 1);
}
