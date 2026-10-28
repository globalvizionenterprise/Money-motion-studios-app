// MONEY MOTION STUDIOS — Beat Store: preview player + free-way buy flow.
// Buy = order code (BT-XXXXXX) + pay on Keyz's handles; delivery is manual
// after Keyz confirms the payment, same as bookings and VIRALX PRO.
(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var PAY = {
    cashHandle: "$LYNXUNLIMITEDMUSIC",
    venmoLink: "https://venmo.com/code?user_id=4643723270948240531&created=1792792682",
    chimeHandle: "$Johnnie-Gannaway"
  };
  var items = window.MM_BEATS || [];
  var listEl = document.getElementById("beat-store-list");
  var panelEl = document.getElementById("beat-buy-panel");
  if (!listEl) return;

  var audio = new Audio();
  audio.preload = "none";
  var playingId = null;

  function fmt(sec) {
    if (!isFinite(sec) || sec == null) return "0:00";
    sec = Math.max(0, Math.floor(sec));
    return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
  }
  function stopOthers() {
    document.querySelectorAll(".beat-row").forEach(function (r) {
      r.classList.remove("playing");
      var b = r.querySelector(".beat-play");
      if (b) b.textContent = "\u25B6";
      var bar = r.querySelector(".beat-progress i");
      if (bar) bar.style.width = "0%";
    });
  }
  audio.addEventListener("timeupdate", function () {
    if (!playingId) return;
    var row = listEl.querySelector('[data-id="' + playingId + '"]');
    if (!row) return;
    var bar = row.querySelector(".beat-progress i");
    var time = row.querySelector(".beat-time");
    if (bar && audio.duration) bar.style.width = (audio.currentTime / audio.duration * 100) + "%";
    if (time) time.textContent = fmt(audio.currentTime) + " / " + fmt(audio.duration);
  });
  audio.addEventListener("ended", function () { playingId = null; stopOthers(); });

  function toggle(item, row) {
    if (playingId === item.id) {
      audio.pause(); playingId = null; stopOthers(); return;
    }
    stopOthers();
    audio.src = item.audio;
    audio.play();
    playingId = item.id;
    row.classList.add("playing");
    row.querySelector(".beat-play").textContent = "\u23F8";
  }

  function openBuy(item) {
    if (!panelEl) return;
    var code = "BT-" + Array.from({ length: 6 }, function () {
      return "ABCDEFGHJKMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 33)];
    }).join("");
    var cashUrl = "https://cash.app/" + PAY.cashHandle + "/" + item.price;
    panelEl.innerHTML =
      '<h3>Buy: ' + esc(item.title) + " — $" + esc(item.price) + "</h3>" +
      '<p>Your order code: <strong class="beat-code">' + code + '</strong><br>' +
      '<span class="hint">Put this code in the payment note so we know what you bought.</span></p>' +
      '<div class="beat-pay-row">' +
      '<a class="btn btn-gold" href="' + cashUrl + '" target="_blank" rel="noopener">Pay $' + esc(item.price) + " on Cash App</a>" +
      '<a class="btn btn-gold" href="' + esc(PAY.venmoLink) + '" target="_blank" rel="noopener">Pay on Venmo</a>' +
      '<span class="beat-chime">Chime: <strong>' + esc(PAY.chimeHandle) + '</strong> (send $' + esc(item.price) + " in the Chime app, code in the note)</span>" +
      "</div>" +
      '<p class="hint">No card checkout — payment goes to KEYZ directly. Once he confirms your payment, your beat/pack is sent to you. Questions: 718-908-8466.</p>';
    panelEl.classList.remove("hidden");
    panelEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (!items.length) {
    listEl.innerHTML = '<div class="card"><h3>Beats &amp; packs dropping soon</h3><p>The store shelf is being stocked. For now, shop Livin Legend Beatz\' full catalog on her beat site — and watch this space.</p><div class="person-content"><a class="btn btn-gold person-link" href="https://spaceymusic.com/u/livinlegendbeatz" target="_blank" rel="noopener">🎧 Shop Her Beat Site</a></div></div>';
    return;
  }
  listEl.innerHTML = items.map(function (it) {
    var meta = [it.producer, it.type, it.bpm ? it.bpm + " BPM" : "", it.key || ""].filter(Boolean).join(" · ");
    var playBtn = it.audio ? '<button class="beat-play" type="button" aria-label="Play preview">\u25B6</button>'
      : it.youtube ? '<button class="beat-play beat-yt" type="button" aria-label="Play video demo">\u25B6</button>'
      : '<span class="beat-note">\uD83C\uDFB5</span>';
    var priceTxt = (it.from ? "from " : "") + "$" + it.price;
    var buyBtn = it.external
      ? '<a class="btn btn-gold btn-small" href="' + esc(it.external) + '" target="_blank" rel="noopener">' + (Number(it.price) === 0 ? "FREE — Get It" : "Shop — " + esc(priceTxt)) + "</a>"
      : '<button class="btn btn-gold btn-small beat-buy" type="button">Buy — ' + esc(priceTxt) + "</button>";
    return '<div class="card beat-row" data-id="' + esc(it.id) + '">' +
      playBtn +
      '<div class="beat-info"><div class="beat-title">' + esc(it.title) + '</div>' +
      '<div class="beat-meta">' + esc(meta) + '</div>' +
      '<div class="beat-progress"><i></i></div></div>' +
      (it.youtube ? '<div class="beat-embed hidden"><iframe title="Video demo" loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div>' : "") +
      '<span class="beat-time">0:00</span>' + buyBtn + "</div>";
  }).join("");
  listEl.querySelectorAll(".beat-row").forEach(function (row) {
    var item = items.find(function (i) { return String(i.id) === row.dataset.id; });
    if (!item) return;
    var pb = row.querySelector(".beat-play");
    if (pb && item.audio) pb.addEventListener("click", function () { toggle(item, row); });
    if (pb && item.youtube) pb.addEventListener("click", function () {
      var box = row.querySelector(".beat-embed");
      if (!box) return;
      var frame = box.querySelector("iframe");
      if (box.classList.contains("hidden")) {
        if (!frame.src) frame.src = "https://www.youtube-nocookie.com/embed/" + item.youtube + "?autoplay=1&rel=0";
        box.classList.remove("hidden"); pb.textContent = "\u23F8";
      } else {
        box.classList.add("hidden"); pb.textContent = "\u25B6";
        if (frame) frame.src = "";
      }
    });
    var bb = row.querySelector(".beat-buy");
    if (bb) bb.addEventListener("click", function () { openBuy(item); });
  });
})();
