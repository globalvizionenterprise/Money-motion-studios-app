// Renders the studio gallery into #mm-gallery from window.MM_GALLERY.
(function () {
  var grid = document.getElementById("mm-gallery");
  if (!grid || !window.MM_GALLERY) return;
  window.MM_GALLERY.forEach(function (item) {
    var fig = document.createElement("figure");
    fig.className = "gal-item";
    var img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption + " - MONEY MOTION STUDIOS, Brooklyn";
    img.loading = "lazy";
    var cap = document.createElement("figcaption");
    cap.textContent = item.caption;
    fig.appendChild(img);
    fig.appendChild(cap);
    grid.appendChild(fig);
  });
})();
