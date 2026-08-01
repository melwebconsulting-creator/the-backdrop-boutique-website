/* ==========================================================================
   THE BACKDROP BOUTIQUE BY CLASSY GIRL HABITS
   Luxury Event Styling Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initHeroCanvasParticles();
  initHeroSlideshow();
  initGalleryFilterAndLightbox();
  initBackdropCalculator();
  initBookingForm();
  initScrollReveal();
  initBackToTop();
  initRippleEffect();
  initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });
}

/* --------------------------------------------------------------------------
   3. HERO FLOATING GOLDEN SPARKLES CANVAS
   -------------------------------------------------------------------------- */
function initHeroCanvasParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 20;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedY = Math.random() * 0.6 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.7 + 0.2;
      this.fadeSpeed = Math.random() * 0.005 + 0.002;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= this.fadeSpeed;

      if (this.y < -10 || this.opacity <= 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function createParticles() {
    const particleCount = Math.floor(canvas.width / 25);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
      // offset initial positions
      particles[i].y = Math.random() * canvas.height;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    animationFrameId = requestAnimationFrame(animate);
  }

  createParticles();
  animate();
}

/* --------------------------------------------------------------------------
   4. HERO BACKGROUND SLIDESHOW CROSS-FADE
   -------------------------------------------------------------------------- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 6000);
}

/* --------------------------------------------------------------------------
   5. FEATURED GALLERY MASONRY FILTER & LIGHTBOX
   -------------------------------------------------------------------------- */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // Lightbox Trigger
  if (lightbox && lightboxImg && lightboxCaption) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title')?.textContent || '';
        const categoryTag = item.querySelector('.gallery-category-tag')?.textContent || '';

        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightboxCaption.textContent = categoryTag ? `${categoryTag} — ${title}` : title;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   6. INTERACTIVE BACKDROP ESTIMATE CALCULATOR
   -------------------------------------------------------------------------- */
function initBackdropCalculator() {
  const calcContainer = document.querySelector('.calculator-section');
  if (!calcContainer) return;

  const backdropButtons = document.querySelectorAll('.calc-backdrop-btn');
  const balloonButtons = document.querySelectorAll('.calc-balloon-btn');
  const addonButtons = document.querySelectorAll('.calc-addon-btn');

  const selectedList = document.getElementById('calc-summary-items');
  const totalAmountEl = document.getElementById('calc-total-price');
  const applyBookingBtn = document.getElementById('calc-apply-booking-btn');

  let state = {
    backdrop: { name: 'Tri-Panel Arch Backdrop', price: 450 },
    balloon: { name: 'Deluxe Organic Balloon Garland', price: 250 },
    addons: []
  };

  function updateCalculatorUI() {
    if (!selectedList || !totalAmountEl) return;

    selectedList.innerHTML = '';
    let total = 0;

    // Backdrop
    if (state.backdrop) {
      total += state.backdrop.price;
      const li = document.createElement('li');
      li.innerHTML = `<span>${state.backdrop.name}</span><span class="item-cost">$${state.backdrop.price}</span>`;
      selectedList.appendChild(li);
    }

    // Balloon Garland
    if (state.balloon) {
      total += state.balloon.price;
      const li = document.createElement('li');
      li.innerHTML = `<span>${state.balloon.name}</span><span class="item-cost">$${state.balloon.price}</span>`;
      selectedList.appendChild(li);
    }

    // Addons
    state.addons.forEach(addon => {
      total += addon.price;
      const li = document.createElement('li');
      li.innerHTML = `<span>${addon.name}</span><span class="item-cost">+$${addon.price}</span>`;
      selectedList.appendChild(li);
    });

    totalAmountEl.textContent = `$${total} - $${Math.round(total * 1.25)}`;
  }

  // Backdrop buttons logic
  backdropButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      backdropButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.backdrop = {
        name: btn.getAttribute('data-name'),
        price: parseInt(btn.getAttribute('data-price'), 10)
      };
      updateCalculatorUI();
    });
  });

  // Balloon buttons logic
  balloonButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      balloonButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.balloon = {
        name: btn.getAttribute('data-name'),
        price: parseInt(btn.getAttribute('data-price'), 10)
      };
      updateCalculatorUI();
    });
  });

  // Addon buttons multi-select logic
  addonButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'), 10);

      if (btn.classList.contains('selected')) {
        state.addons.push({ name, price });
      } else {
        state.addons = state.addons.filter(a => a.name !== name);
      }
      updateCalculatorUI();
    });
  });

  // Sync to Booking Form
  if (applyBookingBtn) {
    applyBookingBtn.addEventListener('click', () => {
      const notesField = document.getElementById('booking-notes');
      if (notesField) {
        let text = `Estimated Styling Package Selected:\n- Backdrop: ${state.backdrop.name}\n- Balloons: ${state.balloon.name}`;
        if (state.addons.length > 0) {
          text += `\n- Add-ons: ` + state.addons.map(a => a.name).join(', ');
        }
        notesField.value = text;
        notesField.focus();
        const bookingSection = document.getElementById('booking');
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  updateCalculatorUI();
}

/* --------------------------------------------------------------------------
   7. BOOKING FORM HANDLER & SUCCESS MODAL
   -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('event-booking-form');
  const successModal = document.getElementById('booking-success-modal');
  const closeModalBtn = document.getElementById('close-success-modal');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name')?.value || 'Guest';
    const email = document.getElementById('booking-email')?.value || '';
    const date = document.getElementById('booking-date')?.value || 'TBD';

    const modalNameEl = document.getElementById('modal-client-name');
    if (modalNameEl) modalNameEl.textContent = name;

    if (successModal) {
      successModal.classList.add('active');
    }

    form.reset();
  });

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   8. SCROLL REVEAL ANIMATION (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   9. BACK TO TOP FLOATING BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   10. BUTTON RIPPLE CLICK ANIMATION
   -------------------------------------------------------------------------- */
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* --------------------------------------------------------------------------
   11. DYNAMIC COPYRIGHT YEAR
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
