"use strict";

const btnPrevious = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");
const newsContent = document.querySelector("#news-container");
const apiKey = "d942e4f5fc7740048601b95dfb60fe5d";

let totalResults = 0;

// Hàm kiểm tra nút Previous
const checkBtnPrevious = function () {
  if (pageNum.textContent === "1") {
    btnPrevious.style.display = "none";
  } else {
    btnPrevious.style.display = "block";
  }
};
checkBtnPrevious();

// Hàm kiểm tra nút Next
const checkBtnNext = function () {
  if (pageNum.textContent == Math.ceil(totalResults / 5)) {
    btnNext.style.display = "none";
  } else {
    btnNext.style.display = "block";
  }
};
// Hàm kiểm tra xem một URL có hợp lệ không
function isValidURL(url) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng URL
  const pattern = /^(http|https):\/\/[^ "]+$/;
  return pattern.test(url);
}

// Lấy dữ liệu từ api
async function getDataFromAPI(country, category, pageSize, page) {
  try {
    const userSettings = getFromStorage("userSettings", {
      pageSize: 5,
      category: "General",
    });

    let allArticles = [];
    let validArticles = [];
    let currentPage = page;
    let data;

    while (validArticles.length < userSettings.pageSize) {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userSettings.category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`
      );
      data = await res.json();

      if (!data.articles.length) break;

      allArticles = data.articles;
      validArticles = validArticles.concat(
        allArticles.filter((article) => isValidURL(article.urlToImage))
      );

      if (validArticles.length >= userSettings.pageSize) {
        validArticles = validArticles.slice(0, userSettings.pageSize);
        break;
      }

      currentPage++;
    }

    totalResults = data.totalResults;
    displayNews(validArticles);
  } catch (err) {
    console.log(err);
  }
}

getDataFromAPI("us", "sport", 5, 1);

// Hàm hiển thị danh sách news
const displayNews = function (articles) {
  let html = "";
  articles.forEach((element) => {
    html += `<div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src=${element.urlToImage}
              class="card-img"
              alt=${element.title}
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.content}</p>
              <a href=${element.url} class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>`;
  });

  // Kiểm tra số lượng bài viết hợp lệ
  if (articles.length > 0) {
    newsContent.innerHTML = html;
  } else {
    newsContent.innerHTML = "<p>Không có tin tức hợp lệ để hiển thị.</p>";
  }
};

// Thêm sự kiện cho nút Next và Previous
btnNext.addEventListener("click", function () {
  getDataFromAPI("us", "sport", 5, ++pageNum.textContent);

  checkBtnPrevious();

  checkBtnNext();
});

btnPrevious.addEventListener("click", function () {
  getDataFromAPI("us", "sport", 5, --pageNum.textContent);

  checkBtnPrevious();

  checkBtnNext();
});
