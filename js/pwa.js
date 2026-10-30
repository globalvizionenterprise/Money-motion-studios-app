// PWA: service worker registration + Install App buttons.
// Any element with [data-install-app] (nav + footer) plus a floating button
// triggers the native install prompt when the browser offers one; otherwise
// it shows the manual steps for the visitor's phone.
if ("serviceWorker" in navigator) {
  // Reload once when a new version of the app takes over, so an open app
  // refreshes itself to the latest build automatically.
  let mmRefreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (mmRefreshing) return;
    mmRefreshing = true;
    window.location.reload();
  });
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js")
      .then((reg) => { reg.update().catch(() => {}); })
      .catch(() => {});
  });
}

let mmDeferredPrompt = null;

function mmIsInstalled() {
  return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
    window.navigator.standalone === true;
}

function mmShowInstallUI() {
  if (mmIsInstalled()) return;
  document.querySelectorAll("[data-install-app]").forEach((el) => { el.style.display = ""; });
  if (document.getElementById("mm-install-btn")) return;
  const btn = document.createElement("button");
  btn.id = "mm-install-btn";
  btn.textContent = "📲 Install App";
  btn.setAttribute("style",
    "position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:9999;" +
    "background:linear-gradient(180deg,#ffffff,#dfe3e8 30%,#9ba1ab 50%,#f4f6f8 54%,#b7bcc5 76%,#ffffff);" +
    "color:#17191d;border:1px solid rgba(255,255,255,.95);border-radius:999px;" +
    "padding:12px 22px;font-weight:800;font-size:15px;box-shadow:0 6px 24px rgba(0,0,0,.5);cursor:pointer;");
  btn.addEventListener("click", mmInstallApp);
  document.body.appendChild(btn);
}

function mmHideInstallUI() {
  const b = document.getElementById("mm-install-btn");
  if (b) b.remove();
  document.querySelectorAll("[data-install-app]").forEach((el) => { el.style.display = "none"; });
}

function mmInstallSteps() {
  if (document.getElementById("mm-install-steps")) return;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const steps = ios
    ? "1. Tap the <b>Share</b> button in Safari<br>2. Tap <b>Add to Home Screen</b><br>3. Tap <b>Add</b> — the app lands on your home screen"
    : "1. Tap the <b>⋮ menu</b> in Chrome<br>2. Tap <b>Install app</b> (or “Add to Home screen”)<br>3. Tap <b>Install</b> — the app lands on your home screen";
  const box = document.createElement("div");
  box.id = "mm-install-steps";
  box.setAttribute("style",
    "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);" +
    "display:flex;align-items:center;justify-content:center;padding:20px;");
  box.innerHTML =
    '<div style="background:#101014;color:#eee;border:1px solid rgba(255,255,255,.25);' +
    'border-radius:16px;max-width:340px;width:100%;padding:22px;text-align:left;">' +
    '<h3 style="margin:0 0 10px;">📲 Install the app</h3>' +
    '<p style="line-height:1.65;margin:0 0 16px;">' + steps + "</p>" +
    '<button id="mm-install-close" style="width:100%;padding:11px;border:none;border-radius:999px;' +
    'background:#c9a227;color:#0a0a0a;font-weight:800;cursor:pointer;">Got it</button></div>';
  box.addEventListener("click", (e) => { if (e.target === box) box.remove(); });
  document.body.appendChild(box);
  document.getElementById("mm-install-close").addEventListener("click", () => box.remove());
}

async function mmInstallApp(ev) {
  if (ev) ev.preventDefault();
  if (mmDeferredPrompt) {
    const p = mmDeferredPrompt;
    mmDeferredPrompt = null;
    p.prompt();
    try { await p.userChoice; } catch (e) {}
    return;
  }
  mmInstallSteps();
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  mmDeferredPrompt = e;
  mmShowInstallUI();
});
window.addEventListener("appinstalled", mmHideInstallUI);
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-install-app]").forEach((el) => {
    el.addEventListener("click", mmInstallApp);
  });
  if (mmIsInstalled()) mmHideInstallUI();
  else if (mmDeferredPrompt) mmShowInstallUI();
});
