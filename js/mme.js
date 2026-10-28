// GLOBAL VIZION ENTERPRISE — homepage film system
// 1) Cinematic opener: video 2 plays once per session (skippable, reduced-motion safe),
//    then fades out into the page.
// 2) Video 1 loops as the full-page background film behind the whole main page.
// 3) Floating nav turns to glass on scroll; cinematic scroll reveals.
//
// === GV FILMS (hosted in the Money Motion Supabase public bucket "site-media") ===
var GV_OPEN = "https://mqucttxiwhdbsgzoitmd.supabase.co/storage/v1/object/public/site-media/gv-open.mp4";
var GV_LOOP = "https://mqucttxiwhdbsgzoitmd.supabase.co/storage/v1/object/public/site-media/gv-loop.mp4";
var GV_POSTER = "https://mqucttxiwhdbsgzoitmd.supabase.co/storage/v1/object/public/site-media/gv-poster.jpg";
// =============================================================================

(function () {
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- full-page looping background film (video 1) ---------- */
  var bg = document.getElementById("gv-bg");
  if (bg) {
    if (reduced) {
      if (GV_POSTER) bg.poster = GV_POSTER;
    } else {
      bg.src = GV_LOOP;
      if (GV_POSTER) bg.poster = GV_POSTER;
      bg.muted = true; bg.loop = true; bg.playsInline = true;
      var bp = bg.play(); if (bp && bp.catch) bp.catch(function () {});
      bg.addEventListener("error", function () {
        var w = document.querySelector(".gv-bgwrap");
        if (w) w.style.display = "none";
      }, true);
    }
  }

  /* ---------- cinematic opener (video 2) ---------- */
  var intro = document.getElementById("mme-intro");
  var openVid = document.getElementById("mme-open-vid");
  function killIntro() { if (intro) { intro.classList.add("done"); setTimeout(function () { intro.remove(); }, 650); } }
  if (intro) {
    var seen = false;
    try { seen = sessionStorage.getItem("mmeIntroSeen") === "1"; } catch (e) {}
    if (reduced || seen || !openVid) {
      intro.remove();
    } else {
      try { sessionStorage.setItem("mmeIntroSeen", "1"); } catch (e) {}
      document.body.classList.add("mme-intro-on");
      openVid.src = GV_OPEN;
      openVid.muted = true; openVid.playsInline = true;
      var op = openVid.play(); if (op && op.catch) op.catch(function () {});
      var done = function () { document.body.classList.remove("mme-intro-on"); killIntro(); };
      openVid.addEventListener("ended", done);
      openVid.addEventListener("error", done, true);
      var skip = document.getElementById("mme-skip");
      if (skip) skip.addEventListener("click", function (ev) { ev.stopPropagation(); done(); });
      intro.addEventListener("click", done);
      setTimeout(done, 11000);
    }
  }

  /* ---------- floating nav -> glass on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- cinematic scroll reveals ---------- */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
  }
})();
