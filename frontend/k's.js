document.addEventListener('DOMContentLoaded', () => {
  // =====================
  // CURSOR LOGIC
  // =====================
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

    const interactiveSelectors = 'a, button, .box1, .box2, .box3, .box4, .box5, .box6, .contact-item, .timeline-item, .project-card, .btn, .admin-project-card, .message-card, .glass-card';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.borderColor = 'var(--accent-color)';
        cursor.style.backgroundColor = 'rgba(204, 255, 0, 0.1)';
        follower.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.borderColor = 'white';
        cursor.style.backgroundColor = 'transparent';
        follower.style.opacity = '1';
      });
    });
  }

  // =====================
  // DETECT HOME PAGE
  // =====================
  const isHomePage = document.querySelector('.trio') !== null;

  // =====================
  // HOME PAGE — Directional Slide Animations
  // =====================
  if (isHomePage) {
    // Assign slide directions to each box
    const box1 = document.querySelector('.box1');
    const box2 = document.querySelector('.box2');
    const box3 = document.querySelector('.box3');
    const box4 = document.querySelector('.box4');
    const box5 = document.querySelector('.box5');
    const box6 = document.querySelector('.box6');

    // Row 1: left, center, right
    if (box1) box1.classList.add('slide-from-left');
    if (box2) box2.classList.add('scale-from-center');
    if (box3) box3.classList.add('slide-from-right');

    // Row 2: left, right, bottom
    if (box4) box4.classList.add('slide-from-left');
    if (box5) box5.classList.add('slide-from-right');
    if (box6) box6.classList.add('slide-from-bottom');

    // Also hide navbar initially
    const nav = document.querySelector('.navbar-custom');
    if (nav) nav.classList.add('fade-up-hidden');
  }

  // =====================
  // LOADING SCREEN
  // =====================
  const loadingScreen = document.querySelector('.loading-screen');

  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.body.classList.remove('loading');
        triggerHomeEntrance();
      }, 500);
    }, 1500);
  } else {
    // No loading screen — trigger immediately
    triggerHomeEntrance();
    triggerScrollAnimations();
  }

  // =====================
  // HOME ENTRANCE (after loading)
  // =====================
  function triggerHomeEntrance() {
    if (!isHomePage) {
      triggerScrollAnimations();
      return;
    }

    // Show navbar first
    const nav = document.querySelector('.navbar-custom');
    if (nav) {
      setTimeout(() => nav.classList.add('visible'), 100);
    }

    // Row 1: stagger box1 -> box2 -> box3
    const row1 = [
      document.querySelector('.box1'),
      document.querySelector('.box2'),
      document.querySelector('.box3')
    ];

    row1.forEach((box, i) => {
      if (box) {
        setTimeout(() => box.classList.add('visible'), 200 + i * 200);
      }
    });

    // Row 2: stagger box4 -> box5 -> box6  (starts after row 1)
    const row2 = [
      document.querySelector('.box4'),
      document.querySelector('.box5'),
      document.querySelector('.box6')
    ];

    row2.forEach((box, i) => {
      if (box) {
        setTimeout(() => box.classList.add('visible'), 800 + i * 200);
      }
    });

    // Also set up scroll animations for any other elements
    triggerScrollAnimations();
  }

  // =====================
  // SCROLL ANIMATIONS (other pages + scrollable content)
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

    // Only apply fade-up to NON-home-box elements
    const scrollSelectors = '.hero-section, .section-title, .project-card, .contact-item, .timeline-item, .info-box, .artdiv, .desc, .foot, .dev, .contact-container';

    document.querySelectorAll(scrollSelectors).forEach(el => {
      // Don't double-add if already has an animation class
      if (!el.classList.contains('slide-from-left') &&
        !el.classList.contains('slide-from-right') &&
        !el.classList.contains('scale-from-center') &&
        !el.classList.contains('slide-from-bottom')) {
        el.classList.add('fade-up-hidden');
      }
      observer.observe(el);
    });

    // For non-home pages, also animate their specific navbar
    if (!isHomePage) {
      const nav = document.querySelector('.navbar-custom');
      if (nav && !nav.classList.contains('visible')) {
        nav.classList.add('fade-up-hidden');
        setTimeout(() => nav.classList.add('visible'), 100);
      }
    }
  }
});
