// Renders the Artists / Engineers / Affiliates roster from js/artists-data.js.
(function () {
  var SOCIAL_LABELS = {
    instagram: "📸 Instagram",
    tiktok: "🎵 TikTok",
    youtube: "▶️ YouTube",
    spotify: "🎧 Spotify",
    x: "𝕏",
    facebook: "📘 Facebook"
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function initials(name) {
    return String(name || "?").split(/\s+/).map(function (w) { return w.charAt(0); }).join("").slice(0, 2).toUpperCase();
  }

  function card(p) {
    var photo = p.photo
      ? '<img class="person-photo" src="' + esc(p.photo) + '" alt="' + esc(p.name) + '">'
      : '<div class="person-photo person-initials">' + esc(initials(p.name)) + "</div>";
    var content = (p.content || []).filter(function (c) { return c && c.url; }).map(function (c) {
      return '<a class="btn btn-gold person-link" href="' + esc(c.url) + '" target="_blank" rel="noopener">▶ ' + esc(c.label || "Listen / Watch") + "</a>";
    }).join("");
    var socials = Object.keys(SOCIAL_LABELS).filter(function (k) { return p.socials && p.socials[k]; }).map(function (k) {
      return '<a href="' + esc(p.socials[k]) + '" target="_blank" rel="noopener">' + SOCIAL_LABELS[k] + "</a>";
    }).join("");
    return '<div class="card person-card">' + photo +
      "<h3>" + esc(p.name) + "</h3>" +
      (p.role ? '<p class="person-role">' + esc(p.role) + "</p>" : "") +
      (p.blurb ? "<p>" + esc(p.blurb) + "</p>" : "") +
      (content ? '<div class="person-content">' + content + "</div>" : "") +
      (socials ? '<div class="socials">' + socials + "</div>" : "") +
      "</div>";
  }

  function fill(id, list, emptyHtml) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = (list && list.length) ? list.map(card).join("") : emptyHtml;
  }

  var P = window.MM_PEOPLE || { artists: [], engineers: [], affiliates: [] };
  fill("roster-artists", P.artists,
    '<div class="card person-card"><h3>Roster dropping soon</h3><p>Artists who record at MONEY MOTION STUDIOS get featured here — their music, their videos, their socials. Book a session and get on the page.</p><div class="person-content"><a class="btn btn-gold person-link" href="book.html">Book a Session</a></div></div>');
  fill("roster-engineers", P.engineers,
    '<div class="card person-card"><h3>Engineers</h3><p>Our engineers get featured here.</p></div>');
  fill("roster-affiliates", P.affiliates,
    '<div class="card person-card"><h3>Affiliates dropping soon</h3><p>The brands, crews and businesses we\'re affiliated with get their shine here — links and socials included.</p></div>');
})();
