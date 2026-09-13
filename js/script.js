/* MR.FUJI Japan Dashboard */
(function () {
  // Sakura petals
  const layer = document.getElementById('petalLayer');
  if (layer) {
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--x', (Math.random() * 80 - 40) + 'px');
      p.style.animationDuration = (9 + Math.random() * 11) + 's';
      p.style.animationDelay = (Math.random() * 9) + 's';
      p.style.width = (8 + Math.random() * 7) + 'px';
      p.style.height = (6 + Math.random() * 5) + 'px';
      layer.appendChild(p);
    }
  }

  // Theme
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
    if (!backTop) return;
    backTop.classList.toggle('show', window.scrollY > 350);
  });
  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Smooth in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Create ticket
  document.querySelectorAll('.create-ticket-btn').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const box = document.getElementById('ticket-status');
      if (box) {
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
        box.style.boxShadow = '0 0 0 3px rgba(232,90,122,0.45)';
        setTimeout(() => { box.style.boxShadow = ''; }, 1200);
      }
      alert('Ticket Center: form tạo ticket đang được phát triển.\nBạn có thể mô tả lỗi trong phần Ticket gần đây.');
    });
  });

  // Donate button - highlight QR
  const donateBtn = document.getElementById('donateBtn');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      const qr = document.querySelector('.qr-box');
      if (qr) {
        qr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        qr.style.transform = 'scale(1.06)';
        qr.style.boxShadow = '0 10px 32px rgba(232,90,122,0.35)';
        setTimeout(() => {
          qr.style.transform = '';
          qr.style.boxShadow = '';
        }, 1500);
      }
      alert('Cảm ơn bạn! 🌸\nHãy mở app ngân hàng / ví và quét mã QR để ủng hộ.');
    });
  }

  // Notification bell
  document.querySelectorAll('.notif-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Thông báo:\n• Ticket #0012 đang chờ xử lý\n• 3 ảnh mới đã được cập nhật\n• Cảm ơn bạn đã ủng hộ!');
    });
  });
})();
