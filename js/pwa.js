// PWA: service worker registration + install prompt button.
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
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  mmDeferredPrompt = e;
  if (document.getElementById("mm-install-btn")) return;
  const btn = document.createElement("button");
  btn.id = "mm-install-btn";
  btn.textContent = "Install the Money Motion App";
  btn.setAttribute("style",
    "position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:9999;" +
    "background:#c9a227;color:#0a0a0a;border:none;border-radius:999px;" +
    "padding:12px 22px;font-weight:800;font-size:15px;box-shadow:0 6px 24px rgba(0,0,0,.5);cursor:pointer;");
  btn.addEventListener("click", async () => {
    btn.remove();
    if (mmDeferredPrompt) { mmDeferredPrompt.prompt(); await mmDeferredPrompt.userChoice; mmDeferredPrompt = null; }
  });
  document.body.appendChild(btn);
});
window.addEventListener("appinstalled", () => {
  const b = document.getElementById("mm-install-btn");
  if (b) b.remove();
});
