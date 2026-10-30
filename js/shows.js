// Renders the Shows page from window.MM_SHOWS (js/shows-data.js).
(function () {
  var box = document.getElementById("mm-shows");
  if (!box) return;
  var shows = window.MM_SHOWS || [];
  function ytId(v) {
    if (!v) return "";
    var m = String(v).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))?([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  }
  if (!shows.length) {
    box.innerHTML = '<div class="card" style="text-align:center;padding:28px 18px;">' +
      "<h3>🎬 First show dropping soon</h3>" +
      '<p class="muted">Full shows from the Money Motion family will live right here. Check back — the first one is on the way.</p>' +
      "</div>";
    return;
  }
  shows.forEach(function (s, i) {
    var id = ytId(s.youtube);
    if (!id) return;
    var card = document.createElement("div");
    card.className = "card";
    card.style.marginBottom = "18px";
    var h = document.createElement("h3");
    h.style.marginTop = "0";
    h.textContent = (i === 0 ? "🔥 Latest Show — " : "") + (s.title || "Show");
    card.appendChild(h);
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + id + "?rel=0";
    f.style.cssText = "width:100%;aspect-ratio:16/9;border:0;border-radius:10px;display:block;";
    f.setAttribute("allow", "accelerometer; autoplay; encrypted-media; picture-in-picture");
    f.setAttribute("allowfullscreen", "");
    f.loading = "lazy";
    card.appendChild(f);
    if (s.note) {
      var p = document.createElement("p");
      p.className = "muted";
      p.textContent = s.note;
      card.appendChild(p);
    }
    box.appendChild(card);
  });
})();
