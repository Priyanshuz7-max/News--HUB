const API_KEY = "9907fd9f44514cf0861c959b695256a5";
const newsContainer = document.getElementById("newsContainer");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

async function fetchNews(query = "latest") {
  newsContainer.innerHTML = "<p>Loading news...</p>";

  const url = `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=12&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }

    newsContainer.innerHTML = data.articles.map(article => `
      <div class="news-card">
        <img src="${article.urlToImage || 'https://via.placeholder.com/400'}" alt="news">
        <div class="info">
          <h2>${article.title}</h2>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read More</a><br>
          <button class="save-btn" onclick="saveNews('${article.title}', '${article.url}')">Save</button>
        </div>
      </div>
    `).join("");
  } catch (err) {
    newsContainer.innerHTML = "<p>Error loading news.</p>";
    console.error(err);
  }
}

function saveNews(title, url) {
  const saved = JSON.parse(localStorage.getItem("savedNews")) || [];
  saved.push({ title, url });
  localStorage.setItem("savedNews", JSON.stringify(saved));
  alert("News saved to your profile!");
}

searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") fetchNews(searchInput.value);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

fetchNews();
