// ===== V11 ENHANCEMENT FEATURES =====

(() => {
  // ===== 1. PAGE TRANSITION ANIMATION =====
  const initPageTransition = () => {
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach((link) => {
      if (link.href === window.location.href) return;

      link.addEventListener('click', (e) => {
        const main = document.querySelector('main.content');
        if (!main) return;

        main.classList.add('page-exit');
        setTimeout(() => {
          window.location.href = link.href;
        }, 380);

        e.preventDefault();
      });
    });
  };

  // ===== 2. TOPNAV ICON TOOLTIP =====
  const initTopnavTooltips = () => {
    const tooltips = {
      0: 'Trang chủ',
      1: 'Xem bài giảng',
      2: 'Giáo án chi tiết',
      3: 'Bài tập luyện',
      4: 'Hình ảnh & âm thanh',
      5: 'Công cụ hỗ trợ',
      6: 'Tài nguyên học',
      7: 'Hướng dẫn chi tiết',
      8: 'Thư viện cá nhân',
      9: 'Hỏi & được trả lời',
    };

    const topnavItems = document.querySelectorAll('.topnav-item');
    topnavItems.forEach((item, index) => {
      item.setAttribute('data-tooltip', tooltips[index] || 'Điều hướng');

      // Add subtle scale on hover
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.02)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
      });
    });
  };

  // ===== 3. ADMIN MODAL MAXIMIZE =====
  const initAdminMaximize = () => {
    const adminModal = document.getElementById('adminModal');
    if (!adminModal) return;

    const maximizeBtn = document.createElement('button');
    maximizeBtn.className = 'admin-maximize-btn';
    maximizeBtn.title = 'Phóng to/Thu nhỏ';
    maximizeBtn.setAttribute('aria-label', 'Phóng to/Thu nhỏ cửa sổ quản trị');
    adminModal.appendChild(maximizeBtn);

    maximizeBtn.addEventListener('click', () => {
      adminModal.classList.toggle('fullscreen');
      maximizeBtn.title = adminModal.classList.contains('fullscreen') ? 'Thu nhỏ' : 'Phóng to';
    });

    // Close fullscreen on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && adminModal.classList.contains('open')) {
        adminModal.classList.remove('fullscreen');
      }
    });
  };

  // ===== 4. QUOTE ANIMATION =====
  const initQuoteAnimation = () => {
    const sideQuote = document.querySelector('.side-quote');
    if (!sideQuote) return;

    // Wrap text in span
    const original = sideQuote.innerHTML;
    const textContent = sideQuote.textContent;

    // Create icon button
    const icon = document.createElement('button');
    icon.className = 'side-quote-icon';
    icon.innerHTML = '🎓';
    icon.title = 'Ẩn/hiện trích dẫn';
    icon.setAttribute('type', 'button');
    icon.setAttribute('aria-label', 'Ẩn/hiện trích dẫn');

    sideQuote.style.position = 'relative';

    // Start animation on page load
    const startAnimation = () => {
      sideQuote.classList.add('show-quote');
      sideQuote.appendChild(icon);

      // Collapse after 30 seconds
      setTimeout(() => {
        const textSpan = sideQuote.querySelector('.side-quote-text');
        if (textSpan) {
          textSpan.style.display = 'none';
          sideQuote.style.minHeight = '36px';
          sideQuote.style.maxHeight = '36px';
          sideQuote.style.overflow = 'hidden';
          sideQuote.style.padding = '6px 10px';
        }

        // Click to toggle
        icon.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isHidden = textSpan.style.display === 'none';
          textSpan.style.display = isHidden ? 'block' : 'none';
          sideQuote.style.maxHeight = isHidden ? 'none' : '36px';
          sideQuote.style.padding = isHidden ? '13px 12px' : '6px 10px';
          sideQuote.style.minHeight = isHidden ? 'auto' : '36px';
          icon.innerHTML = isHidden ? '📖' : '🎓';
        });
      }, 30000);
    };

    // Wrap quote text
    if (sideQuote.innerHTML.includes('Không có')) {
      const quoteHTML = sideQuote.innerHTML;
      sideQuote.innerHTML = `<span class="side-quote-text">${quoteHTML}</span>`;
      startAnimation();
    }
  };

  // ===== 5. CLOCK CARD FIX =====
  const initClockCardFix = () => {
    const clockCard = document.querySelector('.clock-card');
    if (clockCard) {
      clockCard.style.marginRight = '20px';
      clockCard.style.position = 'relative';
      clockCard.style.left = '-15px';
    }
  };

  // ===== 6. RESOURCE CARD AVATAR =====
  const initResourceAvatars = () => {
    const initializeAvatars = () => {
      const cards = document.querySelectorAll('.resource-card');
      cards.forEach((card) => {
        const cardTop = card.querySelector('.card-top');
        if (!cardTop) return;

        // Check if avatar already added
        if (cardTop.querySelector('.card-avatar')) return;

        const avatar = document.createElement('div');
        avatar.className = 'card-avatar';

        // Use different icons for different categories
        const icon = cardTop.textContent.includes('Bài giảng')
          ? '◇'
          : cardTop.textContent.includes('Giáo án')
            ? '□'
            : cardTop.textContent.includes('Bài tập')
              ? '✣'
              : cardTop.textContent.includes('Học liệu')
                ? '◈'
                : cardTop.textContent.includes('Công cụ')
                  ? '⌁'
                  : '▤';

        avatar.innerHTML = `<div class="card-avatar-default" style="font-size:16px;color:#a8d5ff">${icon}</div>`;
        cardTop.insertBefore(avatar, cardTop.firstChild);
      });
    };

    // Initial load
    initializeAvatars();

    // Watch for new cards
    const observer = new MutationObserver(initializeAvatars);
    observer.observe(document.body, { childList: true, subtree: true });
  };

  // ===== 7. SMOOTH SCROLL ENHANCEMENTS =====
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  };

  // ===== 8. BUTTON HOVER EFFECTS =====
  const initButtonEffects = () => {
    const buttons = document.querySelectorAll('button:not([type="checkbox"]):not([type="radio"])');
    buttons.forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
      });
    });
  };

  // ===== 9. FLOATING ACTION BUTTONS ENHANCEMENT =====
  const enhanceFloatingButtons = () => {
    const fab = document.querySelector('.donate-fab');
    const ticketLauncher = document.querySelector('.ticket-launcher');

    [fab, ticketLauncher].forEach((button) => {
      if (!button) return;
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-4px) scale(1.05)';
      });
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
      });
    });
  };

  // ===== 10. PROFILE CARD ENHANCE =====
  const initProfileCardEnhance = () => {
    const heroProfile = document.querySelector('.hero-profile');
    if (heroProfile) {
      heroProfile.style.animation = 'slideInFromRight 0.6s ease';
    }

    const avatarRing = document.querySelector('.avatar-ring');
    if (avatarRing) {
      avatarRing.addEventListener('mouseenter', () => {
        avatarRing.style.transform = 'scale(1.08)';
      });
      avatarRing.addEventListener('mouseleave', () => {
        avatarRing.style.transform = 'scale(1)';
      });
    }
  };

  // ===== 11. STATS COUNTER ANIMATION =====
  const animateCounter = (element, target, duration = 1500) => {
    if (!element || isNaN(target)) return;

    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString('vi-VN');
    }, 16);
  };

  const initStatsAnimation = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.dataset.animated !== 'true') {
          const value = parseInt(entry.target.textContent) || 0;
          animateCounter(entry.target, value);
          entry.target.dataset.animated = 'true';
        }
      });
    });

    document.querySelectorAll('.hero-stats strong').forEach((el) => {
      observer.observe(el);
    });
  };

  // ===== 12. FOCUS MANAGEMENT =====
  const initFocusManagement = () => {
    // Show focus ring on keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  };

  // ===== 13. LAZY LOAD IMAGES =====
  const initLazyLoad = () => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach((img) => {
        observer.observe(img);
      });
    }
  };

  // ===== MAIN INITIALIZATION =====
  const init = () => {
    // Wait for DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('Initializing V11 Enhancements...');

    initPageTransition();
    initTopnavTooltips();
    initAdminMaximize();
    initQuoteAnimation();
    initClockCardFix();
    initResourceAvatars();
    initSmoothScroll();
    initButtonEffects();
    enhanceFloatingButtons();
    initProfileCardEnhance();
    initStatsAnimation();
    initFocusManagement();
    initLazyLoad();

    console.log('✓ V11 Enhancements initialized');
  };

  init();
})();
