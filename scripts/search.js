"use strict";
const btnSubmit = document.querySelector("#btn-submit");
const inputQuery = document.querySelector("#input-query");
const newsContainer = document.querySelector("#news-container");
const pageNum = document.querySelector("#page-num");
const navPageNum = document.querySelector("#nav-page-num");
const btnPrevious = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");

let currentPage = 1;

const apiKey = "006a5895116a4876978278bd1b2d6ada";

// Sự kiện khi nhấn nút tìm kiếm
btnSubmit.addEventListener("click", function () {
  const query = inputQuery.value.trim();
  if (query !== "") {
    currentPage = 1;
    searchNews(query, currentPage);
  } else {
    alert("Please enter a search query.");
  }
});

// Hàm kiểm tra xem một URL có hợp lệ không
function isValidURL(url) {
  const pattern = /^(http|https):\/\/[^ "]+$/;
  return pattern.test(url);
}

// Hàm tìm kiếm tin tức từ API
async function searchNews(query, page) {
  try {
    let validArticles = []; // Danh sách bài viết hợp lệ
    let currentPage = page;
    let data;

    // Tiếp tục tìm kiếm cho đến khi có đủ 5 bài viết hợp lệ
    while (validArticles.length < 5) {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&page=${currentPage}&pageSize=5`
      );
      data = await res.json();

      // Nếu không có bài viết nào, dừng tìm kiếm
      if (!data.articles.length) break;

      // Lọc các bài viết có URL hình ảnh hợp lệ
      const articlesWithValidImages = data.articles.filter((article) =>
        isValidURL(article.urlToImage)
      );
      validArticles = validArticles.concat(articlesWithValidImages);

      // Nếu đã có đủ 5 bài viết hợp lệ, dừng tìm kiếm
      if (validArticles.length >= 5) {
        validArticles = validArticles.slice(0, 5);
        break;
      }

      // Tăng trang hiện tại để tìm kiếm trang tiếp theo
      currentPage++;
    }

    // Hiển thị các bài viết nếu có
    if (validArticles.length > 0) {
      displayNews(validArticles);
      updatePageNavigation(page, Math.ceil(data.totalResults / 5));
    } else {
      newsContainer.innerHTML = "<p>Không có kết quả nào phù hợp.</p>";
      navPageNum.classList.add("hide");
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm bài viết:", error);
  }
}

// Hàm hiển thị danh sách tin tức
function displayNews(articles) {
  let html = "";
  articles.forEach((article) => {
    html += `
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${article.urlToImage}" class="card-img" alt="${article.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href="${article.url}" class="btn btn-primary">Read more</a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  newsContainer.innerHTML = html;
}

// Hàm cập nhật điều hướng trang
function updatePageNavigation(currentPage, totalPages) {
  pageNum.textContent = currentPage;

  if (currentPage === 1) {
    btnPrevious.classList.add("disabled");
  } else {
    btnPrevious.classList.remove("disabled");
  }

  if (currentPage === totalPages) {
    btnNext.classList.add("disabled");
  } else {
    btnNext.classList.remove("disabled");
  }

  navPageNum.classList.remove("hide");
}

// Sự kiện khi nhấn nút trang trước
btnPrevious.addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    searchNews(inputQuery.value.trim(), currentPage);
  }
});

// Sự kiện khi nhấn nút trang tiếp theo
btnNext.addEventListener("click", function () {
  currentPage++;
  searchNews(inputQuery.value.trim(), currentPage);
});
// Giải thích từng phần:
// Khởi tạo các biến và gán sự kiện cho các nút:

// - btnSubmit: Nút tìm kiếm.
// - inputQuery: Trường nhập liệu cho từ khóa tìm kiếm.
// - newsContainer: Vùng chứa danh sách tin tức.
//-  pageNum, navPageNum, btnPrevious, btnNext: Các thành phần liên quan đến điều hướng trang.
// Sự kiện khi nhấn nút tìm kiếm:

// - Khi nhấn nút tìm kiếm, nếu có từ khóa nhập liệu, hàm searchNews sẽ được gọi với từ khóa và trang hiện tại.
// Hàm kiểm tra URL hợp lệ (isValidURL):

// - Sử dụng biểu thức chính quy để kiểm tra xem URL có hợp lệ không.
// Hàm tìm kiếm tin tức từ API (searchNews):

// - Gọi API và tìm kiếm các bài viết có URL hình ảnh hợp lệ.
// - Nếu có đủ 5 bài viết hợp lệ, hiển thị chúng và cập nhật điều hướng trang.
// - Nếu không có kết quả phù hợp, hiển thị thông báo.
// Hàm hiển thị danh sách tin tức (displayNews):

// - Tạo HTML để hiển thị các bài viết trong vùng chứa tin tức.
// Hàm cập nhật điều hướng trang (updatePageNavigation):

// - Cập nhật trạng thái của các nút điều hướng (trang trước, trang sau) dựa trên trang hiện tại và tổng số trang.
// Sự kiện cho nút điều hướng trang:

// - Khi nhấn nút "trang trước" hoặc "trang sau", cập nhật trang hiện tại và gọi lại hàm searchNews để tìm kiếm và hiển thị tin tức cho trang mới.
// - Với các chú thích này, bạn có thể dễ dàng hiểu và duy trì mã JavaScript của mình.
