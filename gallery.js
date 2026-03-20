(function () {
  var images = window.GALLERY_IMAGES || [];
  var current = 0;

  if (!images.length) return;

  var top    = document.getElementById('ga-top');
  var bottom = document.getElementById('ga-bottom');
  if (!top || !bottom) return;

  // Büyük ana fotoğraf (ilk görsel)
  var mainWrap = document.createElement('div');
  mainWrap.className = 'ga-thumb';
  mainWrap.innerHTML = '<img src="' + images[0] + '" alt="Grand Azure" loading="eager"><div class="ga-thumb-overlay"></div>';
  mainWrap.addEventListener('click', function () { gaOpenLightbox(0); });
  top.appendChild(mainWrap);

  // Sağ 4 küçük (2-5)
  var rightGrid = document.createElement('div');
  top.appendChild(rightGrid);

  for (var i = 1; i <= 4 && i < images.length; i++) {
    (function (idx) {
      var t = document.createElement('div');
      t.className = 'ga-thumb';
      t.innerHTML = '<img src="' + images[idx] + '" alt="Grand Azure" loading="lazy"><div class="ga-thumb-overlay"></div>';
      t.addEventListener('click', function () { gaOpenLightbox(idx); });
      rightGrid.appendChild(t);
    })(i);
  }

  // Alt 4 (6-9)
  for (var j = 5; j <= 8 && j < images.length; j++) {
    (function (idx) {
      var t = document.createElement('div');
      t.className = 'ga-thumb';
      t.innerHTML = '<img src="' + images[idx] + '" alt="Grand Azure" loading="lazy"><div class="ga-thumb-overlay"></div>';
      t.addEventListener('click', function () { gaOpenLightbox(idx); });
      bottom.appendChild(t);
    })(j);
  }

  // Klavye navigasyonu
  document.addEventListener('keydown', function (e) {
    var lb = document.getElementById('ga-lightbox');
    if (!lb || lb.style.display === 'none') return;
    if (e.key === 'ArrowLeft')  gaNav(-1);
    if (e.key === 'ArrowRight') gaNav(1);
    if (e.key === 'Escape')     gaCloseLightbox();
  });

  window.gaOpenLightbox = function (idx) {
    current = idx;
    var lb  = document.getElementById('ga-lightbox');
    var img = document.getElementById('ga-lightbox-img');
    img.src = images[current];
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.gaCloseLightbox = function () {
    var lb = document.getElementById('ga-lightbox');
    lb.style.display = 'none';
    document.getElementById('ga-lightbox-img').src = '';
    document.body.style.overflow = '';
  };

  window.gaNav = function (dir) {
    current = (current + dir + images.length) % images.length;
    document.getElementById('ga-lightbox-img').src = images[current];
  };

})();
