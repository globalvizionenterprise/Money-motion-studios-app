// M.M.E. — THE MONEY MOTION EXPERIENCE (homepage)
// 1) Cinematic glitch intro (8s, skippable, once per session, reduced-motion safe)
// 2) Dual-video crossfade header player — alternates the two header videos forever
// 3) Floating nav turns to glass on scroll; cinematic scroll reveals
//
// === HEADER VIDEOS ============================================================
// When the two original header videos are hosted, put their URLs here in order
// (video 1 first, video 2 second). Empty = poster mode (logo + animated shade),
// so the header is never blank.
var MME_VIDEOS = [
  // "https://.../8351.mp4",
  // "https://.../8339.mp4"
];
// =============================================================================

(function () {
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- glitch intro ---------- */
  var intro = document.getElementById("mme-intro");
  function killIntro() { if (intro) { intro.classList.add("done"); setTimeout(function () { intro.remove(); }, 650); } }
  if (intro) {
    var seen = false;
    try { seen = sessionStorage.getItem("mmeIntroSeen") === "1"; } catch (e) {}
    if (reduced || seen) {
      intro.remove();
    } else {
      try { sessionStorage.setItem("mmeIntroSeen", "1"); } catch (e) {}
      document.body.classList.add("mme-intro-on");
      var skip = document.getElementById("mme-skip");
      if (skip) skip.addEventListener("click", function () { document.body.classList.remove("mme-intro-on"); killIntro(); });
      intro.addEventListener("click", function () { document.body.classList.remove("mme-intro-on"); killIntro(); });
      setTimeout(function () { document.body.classList.remove("mme-intro-on"); killIntro(); }, 8000);
    }
  }

  /* ---------- dual-video crossfade player ---------- */
  var hero = document.querySelector(".mme-hero");
  var vids = Array.prototype.slice.call(document.querySelectorAll(".mme-vid"));
  if (hero && vids.length === 2) {
    if (!MME_VIDEOS.length || reduced) {
      hero.classList.add("mme-poster");
    } else {
      var cur = 0, swapping = false;
      vids.forEach(function (v, i) {
        v.src = MME_VIDEOS[i % MME_VIDEOS.length];
        v.muted = true; v.playsInline = true; v.preload = "auto";
      });
      function swap() {
        if (swapping) return; swapping = true;
        var next = vids[1 - cur], prev = vids[cur];
        try { next.currentTime = 0; } catch (e) {}
        var p = next.play(); if (p && p.catch) p.catch(function () {});
        next.classList.add("on"); prev.classList.remove("on");
        setTimeout(function () { prev.pause(); cur = 1 - cur; swapping = false; }, 1300);
      }
      vids.forEach(function (v) {
        v.addEventListener("timeupdate", function () {
          if (v === vids[cur] && v.duration && v.duration - v.currentTime < 1.6) swap();
        });
        v.addEventListener("ended", function () { if (v === vids[cur]) swap(); });
        v.addEventListener("error", function () { hero.classList.add("mme-poster"); }, true);
      });
      vids[0].classList.add("on");
      var start = vids[0].play(); if (start && start.catch) start.catch(function () { hero.classList.add("mme-poster"); });
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
