// MONEY MOTION STUDIOS — renders the Producers page from js/producers-data.js.
(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var SOCIAL_LABELS = {
    instagram: "\uD83D\uDCF8 Instagram", tiktok: "\uD83C\uDFB5 TikTok",
    youtube: "\u25B6\uFE0F YouTube", x: "\uD835\uDD4F X",
    facebook: "\uD83D\uDC65 Facebook", website: "\uD83C\uDF10 Website"
  };
  function card(p) {
    var h = '<div class="card person-card">';
    if (p.photo) h += '<img class="person-photo" src="' + esc(p.photo) + '" alt="' + esc(p.name) + '">';
    h += "<h3>" + esc(p.name) + "</h3>";
    if (p.role) h += '<p class="person-role">' + esc(p.role) + "</p>";
    if (p.blurb) h += "<p>" + esc(p.blurb) + "</p>";
    var links = (p.content || []).filter(function (c) { return c && c.url; });
    if (links.length) {
      h += '<div class="person-content">' + links.map(function (c) {
        return '<a class="btn btn-gold person-link" href="' + esc(c.url) + '" target="_blank" rel="noopener">' + esc(c.label) + "</a>";
      }).join("") + "</div>";
    }
    var vids = (p.videos || []).filter(function (v) { return v && v.url; });
    if (vids.length) {
      h += '<div class="person-videos">' + vids.map(function (v) {
        return '<a class="person-video-link" href="' + esc(v.url) + '" target="_blank" rel="noopener">' + esc(v.label || "\u25B6 Watch video") + "</a>";
      }).join("") + "</div>";
    }
    var soc = Object.keys(SOCIAL_LABELS).filter(function (k) { return p.socials && p.socials[k]; });
    if (soc.length) {
      h += '<div class="socials">' + soc.map(function (k) {
        return '<a href="' + esc(p.socials[k]) + '" target="_blank" rel="noopener">' + SOCIAL_LABELS[k] + "</a>";
      }).join("") + "</div>";
    }
    return h + "</div>";
  }
  var list = window.MM_PRODUCERS || [];
  var el = document.getElementById("roster-producers");
  if (el) {
    el.innerHTML = list.length ? list.map(card).join("") :
      '<div class="card person-card"><h3>Producer roster dropping soon</h3><p>The producers are being added — tap in.</p></div>';
  }
})();
