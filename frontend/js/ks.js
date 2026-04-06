document.addEventListener('DOMContentLoaded', () => {
  // =====================
  // CONFIG & STATE
  // =====================
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  const isHomePage = document.querySelector('.trio') !== null;

  // =====================
  // CURSOR LOGIC (Desktop Only)
  // =====================
  if (!isTouchDevice) {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
      document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';

          follower.animate({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
          }, { duration: 500, fill: "forwards" });
        });
      });

      const interactiveSelectors = 'a, button, .box1, .box2, .box3, .box4, .box5, .box6, .contact-item, .timeline-item, .project-card, .btn, .admin-project-card, .message-card, .glass-card, .btn-filter';
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursor.style.background = 'rgba(204, 255, 0, 0.1)';
          cursor.style.borderColor = 'var(--accent)';
          follower.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursor.style.background = 'transparent';
          cursor.style.borderColor = 'white';
          follower.style.opacity = '1';
        });
      });
    }
  }

  // =====================
  // SCROLL & ENTRANCE ANIMATIONS
  // =====================
  function triggerScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Apply fade-up to common sections
    const scrollSelectors = '.hero-section, .section-title, .project-card, .contact-item, .timeline-item, .info-box, .artdiv, .desc, .dev, .contact-container, .glass-card, .box1, .box2, .box3, .box4, .box5, .box6';

    document.querySelectorAll(scrollSelectors).forEach(el => {
      if (!el.classList.contains('visible')) {
        el.classList.add('fade-up');
        observer.observe(el);
      }
    });

    // Special entrance for Navbar
    const nav = document.querySelector('.navbar-custom');
    if (nav) {
      setTimeout(() => nav.classList.add('visible'), 300);
    }
  }

  // =====================
  // SKELETON LOADER LOGIC
  // =====================
  function initSkeletonLoaders() {
    const grids = document.querySelectorAll('#projectsGrid');
    grids.forEach(grid => {
      if (grid.children.length === 0) {
        for (let i = 0; i < 6; i++) {
          const skeleton = document.createElement('div');
          skeleton.className = 'project-card skeleton';
          skeleton.style.height = '400px';
          grid.appendChild(skeleton);
        }
      }
    });
  }

  // =====================
  // TOUCH FEEDBACK (App-like)
  // =====================
  if (isTouchDevice) {
    document.querySelectorAll('a, button, .btn, .interactive, .btn-filter').forEach(el => {
      el.addEventListener('touchstart', () => {
        el.style.opacity = '0.7';
        el.style.transform = 'scale(0.98)';
      }, {passive: true});
      el.addEventListener('touchend', () => {
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
      }, {passive: true});
    });
  }

  // =====================
  // INITIALIZE
  // =====================
  initSkeletonLoaders();
  
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.classList.remove('loading');
        triggerScrollAnimations();
      }, 500);
    }, 1200);
  } else {
    triggerScrollAnimations();
  }
});
