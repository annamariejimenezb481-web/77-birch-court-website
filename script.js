(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  const dialog = document.getElementById('lightbox');
  const dialogImage = document.getElementById('lightbox-image');
  const dialogTitle = document.getElementById('lightbox-title');
  const dialogCount = document.getElementById('lightbox-count');
  const photos = Array.from(document.querySelectorAll('.photo-open')).map((button) => ({
    button,
    src: button.querySelector('img').getAttribute('src'),
    alt: button.querySelector('img').alt,
    title: button.closest('figure').querySelector('figcaption').textContent.trim(),
  }));
  let current = 0;
  let opener = null;

  const show = (index) => {
    current = (index + photos.length) % photos.length;
    const photo = photos[current];
    dialogImage.src = photo.src;
    dialogImage.alt = photo.alt;
    dialogTitle.textContent = photo.title;
    dialogCount.textContent = `${current + 1} of ${photos.length}`;
  };

  photos.forEach((photo, index) => {
    photo.button.addEventListener('click', () => {
      opener = photo.button;
      show(index);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else window.open(photo.src, '_self');
    });
  });

  document.getElementById('lightbox-prev').addEventListener('click', () => show(current - 1));
  document.getElementById('lightbox-next').addEventListener('click', () => show(current + 1));
  document.getElementById('lightbox-close').addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  dialog.addEventListener('close', () => {
    if (opener) opener.focus();
  });
})();
