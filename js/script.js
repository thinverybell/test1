/* MR.FUJI Japan Dashboard — lightweight interactivity */
(function () {
  // Sakura petals
  const layer = document.getElementById('petalLayer');
  if (layer) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--x', (Math.random() * 80 - 40) + 'px');
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.width = (8 + Math.random() * 8) + 'px';
      p.style.height = (6 + Math.random() * 6) + 'px';
      layer.appendChild(p);
    }
  }

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  const themeSwitch = document.getElementById('themeSwitch');
  function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    if (themeSwitch) themeSwitch.checked = document.body.classList.contains('dark-theme');
  }
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (themeSwitch) themeSwitch.addEventListener('change', toggleTheme);

  // Back to top
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (backTop) {
      if (window.scrollY > 400) backTop.classList.add('show');
      else backTop.classList.remove('show');
    }
  });
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Ticket / settings placeholders
  document.querySelectorAll('[data-open-ticket]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      alert('Ticket Center sẽ mở tại đây (đang phát triển).');
    });
  });
  document.querySelectorAll('[data-open-settings]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      alert('Cài đặt sẽ mở tại đây.');
    });
  });
})();
