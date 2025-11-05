function showSavedNews() {
  const saved = JSON.parse(localStorage.getItem("savedNews")) || [];
  const container = document.getElementById("savedContainer");

  if (saved.length === 0) {
    container.innerHTML = "<p>No saved news yet.</p>";
    return;
  }

  container.innerHTML = saved.map(n => `
    <div class="news-card">
      <div class="info">
        <h2>${n.title}</h2>
        <a href="${n.url}" target="_blank">Read More</a>
      </div>
    </div>
  `).join("");
}

function logout() {
  auth.signOut().then(() => {
    alert("Logged out!");
    window.location.href = "login.html";
  });
}

showSavedNews();
