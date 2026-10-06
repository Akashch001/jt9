/**
 * JT9 Detailing — Client Interaction & Motion Logic
 * Vanilla JavaScript (Zero external runtime dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initQuoteForm();
  initFaqAccordion();
  initAnchorNavigation();
  initBeforeAfterSlider();
  initCinematicScroll();
});

/* ==========================================================================
   HEADER SCROLL BEHAVIOR
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   MOBILE NAVIGATION (Accessible Drawer & Focus Trap)
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!menuBtn || !mobileNav) return;

  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const closeBtn = mobileNav.querySelector('.mobile-nav-close-btn');
  const navLinks = mobileNav.querySelectorAll('a, button');

  const mainContent = document.getElementById('main-content');
  const siteFooter = document.querySelector('.site-footer');

  // Ensure initial accessibility state
  mobileNav.setAttribute('aria-hidden', 'true');
  mobileNav.setAttribute('inert', '');

  const handleDrawerKeydown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer(true);
      return;
    }

    if (e.key === 'Tab') {
      const focusable = mobileNav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;

      const firstElem = focusable[0];
      const lastElem = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstElem) {
        e.preventDefault();
        lastElem.focus();
      } else if (!e.shiftKey && document.activeElement === lastElem) {
        e.preventDefault();
        firstElem.focus();
      }
    }
  };

  const openDrawer = () => {
    mobileNav.classList.add('open');
    mobileNav.removeAttribute('inert');
    mobileNav.setAttribute('aria-hidden', 'false');

    if (backdrop) backdrop.classList.add('open');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Set background content inert
    if (mainContent) mainContent.setAttribute('inert', '');
    if (siteFooter) siteFooter.setAttribute('inert', '');

    document.addEventListener('keydown', handleDrawerKeydown);

    // Focus close button inside drawer
    setTimeout(() => {
      if (closeBtn) {
        closeBtn.focus();
      } else if (navLinks.length > 0) {
        navLinks[0].focus();
      }
    }, 50);
  };

  const closeDrawer = (restoreFocus = true) => {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('inert', '');
    mobileNav.setAttribute('aria-hidden', 'true');

    if (backdrop) backdrop.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Remove inert from background
    if (mainContent) mainContent.removeAttribute('inert');
    if (siteFooter) siteFooter.removeAttribute('inert');

    document.removeEventListener('keydown', handleDrawerKeydown);

    if (restoreFocus) {
      menuBtn.focus();
    }
  };

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeDrawer(true);
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeDrawer(true));
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => closeDrawer(true));
  }

  // Close when clicking nav links
  navLinks.forEach(link => {
    if (link !== closeBtn) {
      link.addEventListener('click', () => {
        closeDrawer(false);
      });
    }
  });

  // Handle desktop resize cleanup
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
      closeDrawer(false);
    }
  });
}



/* ==========================================================================
   MULTI-STEP QUOTE EXPERIENCE (DEMO GUARDRAILS & ACCESSIBLE VALIDATION)
   ========================================================================== */
function initQuoteForm() {
  const quoteForm = document.getElementById('demo-quote-form');
  if (!quoteForm) return;

  const steps = quoteForm.querySelectorAll('.quote-step');
  const progressNodes = document.querySelectorAll('.progress-step-node');
  const progressBar = document.querySelector('.quote-progress-bar');
  const modal = document.getElementById('demo-quote-modal');
  const closeModalBtn = document.getElementById('close-demo-modal');

  let currentStep = 1;
  const totalSteps = steps.length;

  // Initial state: Start vehicle and service choices UNSELECTED
  const quoteData = {
    vehicleType: '',
    serviceNeed: '',
    firstName: '',
    phone: '',
    zip: '',
    model: '',
    message: ''
  };

  // Pre-select allowed service from URL query parameter if present
  const allowedServices = [
    'Interior Detail',
    'Exterior Detail',
    'Interior + Exterior',
    'Paint Correction',
    'Ceramic Coating',
    'Not Sure — Recommend a Service'
  ];

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && allowedServices.includes(serviceParam)) {
      quoteData.serviceNeed = serviceParam;

      const step2 = quoteForm.querySelector('.quote-step[data-step="2"]');
      if (step2) {
        const matchingCard = step2.querySelector(`.option-card[data-value="${serviceParam}"]`);
        if (matchingCard) {
          matchingCard.classList.add('selected');
          matchingCard.setAttribute('aria-checked', 'true');
        }

        const notice = document.createElement('div');
        notice.className = 'quote-preselected-notice';
        notice.setAttribute('role', 'status');
        notice.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Pre-selected: <strong>${serviceParam}</strong> (you can change this anytime)</span>`;
        const heading = step2.querySelector('.step-question');
        if (heading && heading.nextSibling) {
          step2.insertBefore(notice, heading.nextSibling);
        }
      }
    }
  } catch (e) {
    // Graceful fallback if URLSearchParams is unavailable
  }

  // Option selection logic in step 1 & 2
  const optionCards = quoteForm.querySelectorAll('.option-card');
  optionCards.forEach(card => {
    card.setAttribute('role', 'radio');
    if (!card.classList.contains('selected')) {
      card.setAttribute('aria-checked', 'false');
    }

    card.addEventListener('click', () => {
      const parentStep = card.closest('.quote-step');
      const stepNum = parseInt(parentStep.dataset.step, 10);
      const val = card.dataset.value;

      parentStep.querySelectorAll('.option-card').forEach(c => {
        c.classList.remove('selected');
        c.setAttribute('aria-checked', 'false');
      });

      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');

      if (stepNum === 1) {
        quoteData.vehicleType = val;
        const err = parentStep.querySelector('.quote-step-error-banner');
        if (err) err.classList.remove('visible');
      } else if (stepNum === 2) {
        quoteData.serviceNeed = val;
        const err = parentStep.querySelector('.quote-step-error-banner');
        if (err) err.classList.remove('visible');
      }
    });
  });

  // Next buttons with strict required selection checks
  const nextBtns = quoteForm.querySelectorAll('.btn-next');
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep === 1) {
        if (!quoteData.vehicleType) {
          const err = steps[0].querySelector('.quote-step-error-banner');
          if (err) {
            err.classList.add('visible');
            err.setAttribute('tabindex', '-1');
            err.focus();
          }
          return;
        }
      }

      if (currentStep === 2) {
        if (!quoteData.serviceNeed) {
          const err = steps[1].querySelector('.quote-step-error-banner');
          if (err) {
            err.classList.add('visible');
            err.setAttribute('tabindex', '-1');
            err.focus();
          }
          return;
        }
      }

      goToStep(currentStep + 1);
    });
  });

  // Prev buttons (preserve selections)
  const prevBtns = quoteForm.querySelectorAll('.btn-prev');
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  });

  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    steps.forEach(s => s.classList.remove('active'));
    const targetStep = quoteForm.querySelector(`.quote-step[data-step="${stepNumber}"]`);
    if (targetStep) {
      targetStep.classList.add('active');
      const heading = targetStep.querySelector('.step-question');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      }
    }

    currentStep = stepNumber;

    // Update progress indicator
    progressNodes.forEach((node, index) => {
      const stepIdx = index + 1;
      node.classList.remove('active', 'completed');
      node.removeAttribute('aria-current');

      if (stepIdx === currentStep) {
        node.classList.add('active');
        node.setAttribute('aria-current', 'step');
      } else if (stepIdx < currentStep) {
        node.classList.add('completed');
      }
    });

    if (progressBar) {
      const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  // Step 3 Validation & Submission Handling
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstNameInput = quoteForm.querySelector('input[name="first_name"]');
    const phoneInput = quoteForm.querySelector('input[name="phone"]');
    const zipInput = quoteForm.querySelector('input[name="zip_code"]');
    const modelInput = quoteForm.querySelector('input[name="vehicle_model"]');

    let isValid = true;
    let firstInvalidField = null;

    // Validate First Name
    const firstNameErr = document.getElementById(firstNameInput ? firstNameInput.id + '-error' : '');
    if (!firstNameInput || firstNameInput.value.trim().length < 2) {
      isValid = false;
      if (firstNameInput) {
        firstNameInput.classList.add('error');
        firstNameInput.setAttribute('aria-invalid', 'true');
        if (!firstInvalidField) firstInvalidField = firstNameInput;
      }
      if (firstNameErr) firstNameErr.classList.add('visible');
    } else {
      if (firstNameInput) {
        firstNameInput.classList.remove('error');
        firstNameInput.setAttribute('aria-invalid', 'false');
      }
      if (firstNameErr) firstNameErr.classList.remove('visible');
    }

    // Validate Phone (allow common formats: (945) 237-2560, 9452372560, etc. Minimum 10 digits)
    const phoneErr = document.getElementById(phoneInput ? phoneInput.id + '-error' : '');
    const cleanPhone = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
    if (!phoneInput || cleanPhone.length < 10) {
      isValid = false;
      if (phoneInput) {
        phoneInput.classList.add('error');
        phoneInput.setAttribute('aria-invalid', 'true');
        if (!firstInvalidField) firstInvalidField = phoneInput;
      }
      if (phoneErr) phoneErr.classList.add('visible');
    } else {
      if (phoneInput) {
        phoneInput.classList.remove('error');
        phoneInput.setAttribute('aria-invalid', 'false');
      }
      if (phoneErr) phoneErr.classList.remove('visible');
    }

    // Validate ZIP Code (5 digits)
    const zipErr = document.getElementById(zipInput ? zipInput.id + '-error' : '');
    const zipVal = zipInput ? zipInput.value.trim() : '';
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipInput || !zipRegex.test(zipVal)) {
      isValid = false;
      if (zipInput) {
        zipInput.classList.add('error');
        zipInput.setAttribute('aria-invalid', 'true');
        if (!firstInvalidField) firstInvalidField = zipInput;
      }
      if (zipErr) zipErr.classList.add('visible');
    } else {
      if (zipInput) {
        zipInput.classList.remove('error');
        zipInput.setAttribute('aria-invalid', 'false');
      }
      if (zipErr) zipErr.classList.remove('visible');
    }

    // Validate Vehicle Model
    const modelErr = document.getElementById(modelInput ? modelInput.id + '-error' : '');
    if (!modelInput || modelInput.value.trim().length < 2) {
      isValid = false;
      if (modelInput) {
        modelInput.classList.add('error');
        modelInput.setAttribute('aria-invalid', 'true');
        if (!firstInvalidField) firstInvalidField = modelInput;
      }
      if (modelErr) modelErr.classList.add('visible');
    } else {
      if (modelInput) {
        modelInput.classList.remove('error');
        modelInput.setAttribute('aria-invalid', 'false');
      }
      if (modelErr) modelErr.classList.remove('visible');
    }

    if (!isValid) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // STRICT DEMO GUARDRAIL:
    // Store nothing permanently. Transmit nothing.
    // Display preview confirmation to owner/client.
    if (modal) {
      openModal();
    }
  });

  // Modal Focus Trap & Accessibility
  let lastFocusedElement = null;

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (closeModalBtn) closeModalBtn.focus();
    }, 50);

    document.addEventListener('keydown', handleModalKeydown);
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleModalKeydown);

    // Reset form state cleanly
    quoteForm.reset();
    quoteForm.querySelectorAll('.option-card').forEach(c => {
      c.classList.remove('selected');
      c.setAttribute('aria-checked', 'false');
    });
    quoteData.vehicleType = '';
    quoteData.serviceNeed = '';
    quoteForm.querySelectorAll('.quote-field-error').forEach(e => e.classList.remove('visible'));
    quoteForm.querySelectorAll('.quote-step-error-banner').forEach(e => e.classList.remove('visible'));
    quoteForm.querySelectorAll('.form-input').forEach(i => {
      i.classList.remove('error');
      i.setAttribute('aria-invalid', 'false');
    });

    goToStep(1);

    // Restore focus to original trigger or visible control
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function' && document.body.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    } else {
      const startCta = document.getElementById('step1-next') || quoteForm;
      if (startCta) startCta.focus();
    }
  }

  function handleModalKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  const closeModalBtnX = document.getElementById('close-demo-modal-x');
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  if (closeModalBtnX && modal) {
    closeModalBtnX.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const ans = item.querySelector('.faq-answer');

    if (!btn || !ans) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question-btn');
          const otherAns = other.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        ans.style.maxHeight = null;
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        ans.style.maxHeight = `${ans.scrollHeight}px`;
      }
    });
  });
}

/* ==========================================================================
   ACCESSIBLE ANCHOR NAVIGATION & MOTION RESPECT
   ========================================================================== */
function initAnchorNavigation() {
  // Support direct URL hash landing on initial load
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'auto' });
      }, 100);
    }
  }

  // Smooth scroll handler that preserves URL hash & keyboard focus
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;

      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();

        // Update URL hash without jump
        if (history.pushState) {
          history.pushState(null, '', hash);
        } else {
          window.location.hash = hash;
        }

        // Scroll respecting prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        // Set focus accessibly
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // Skip link focus handler
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
      }
    });
  }
}

/* ==========================================================================
   BEFORE & AFTER INTERACTIVE SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('ba-slider');
  const rangeInput = document.getElementById('ba-slider-range');
  if (!container || !rangeInput) return;

  const setPos = (val) => {
    const clamped = Math.max(0, Math.min(100, parseFloat(val)));
    container.style.setProperty('--slider-pos', `${clamped}%`);
    rangeInput.value = clamped;
    rangeInput.setAttribute('aria-valuenow', Math.round(clamped));
  };

  // Keyboard accessibility and native input support
  rangeInput.addEventListener('input', (e) => {
    setPos(e.target.value);
  });
  rangeInput.addEventListener('change', (e) => {
    setPos(e.target.value);
  });

  // Smooth pointer / touch / mouse dragging across container
  let isDragging = false;

  const updateFromPointer = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPos(pct);
  };

  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    try {
      container.setPointerCapture(e.pointerId);
    } catch (_) {}
    updateFromPointer(e);
  });

  container.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    updateFromPointer(e);
  });

  const stopDrag = (e) => {
    if (!isDragging) return;
    isDragging = false;
    try {
      if (container.hasPointerCapture(e.pointerId)) {
        container.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
  };

  container.addEventListener('pointerup', stopDrag);
  container.addEventListener('pointercancel', stopDrag);
}

/* ==========================================================================
   CINEMATIC SCROLL ARCHITECTURE & PROGRESSIVE REVEAL ENGINE
   ========================================================================== */
function initCinematicScroll() {
  // 1. Accessibility: Detect user's motion preferences
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    document.documentElement.classList.add('reduced-motion');
    return; // Leave all content fully visible with zero transform overhead
  }

  motionQuery.addEventListener('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  });

  // 2. Progressive Enhancement: Mark document ready for cinematic motion
  document.documentElement.classList.add('motion-ready');

  // 3. Narrative Chapter Targets: Connect semantic content to motion roles
  const revealConfigs = [
    // Chapter 1: Understanding (Services Packages)
    { selector: '#services .section-header', role: 'reveal-up' },
    { selector: '#services .service-card', role: 'reveal-up', stagger: 120 },
    
    // Chapter 2: Proof (Before & After Defect Removal)
    { selector: '#results .section-header', role: 'reveal-up' },
    { selector: '#results .showcase-card', role: 'reveal-scale' },
    
    // Chapter 3: Trust (Why JT9 Service Pillars)
    { selector: '#why-jt9 .section-header', role: 'reveal-up' },
    { selector: '#why-jt9 .why-card', role: 'reveal-up', stagger: 90 },
    
    // Chapter 4: Frictionless Booking (How It Works)
    { selector: '#how-it-works .section-header', role: 'reveal-up' },
    { selector: '#how-it-works .process-step-card', role: 'reveal-up', stagger: 100 },
    
    // Chapter 5: Verified Proof (Google Reviews Marquee)
    { selector: '#reviews .section-header', role: 'reveal-up' },
    { selector: '#reviews .testimonials-marquee-wrapper', role: 'reveal-fade' },
    
    // Chapter 6: Desire (Spotlight Feature)
    { selector: '.spotlight-content', role: 'reveal-up' },
    
    // Chapter 7: Action / Conversion (Quote Estimator)
    { selector: '#quote .section-header', role: 'reveal-up' },
    { selector: '#quote .quote-card', role: 'reveal-scale' },
    
    // Chapter 8: Reassurance (FAQ Accordion)
    { selector: '#faq .section-header', role: 'reveal-up' },
    { selector: '#faq .faq-item', role: 'reveal-up', stagger: 80 },
    
    // Chapter 9: Final CTA Card
    { selector: '.cta-card', role: 'reveal-scale' },
    
    // Secondary Pages Support
    { selector: '.comparison-card', role: 'reveal-up', stagger: 120 },
    { selector: '.service-highlight-card', role: 'reveal-up', stagger: 100 },
    { selector: '.category-section .section-header', role: 'reveal-up' }
  ];

  const elementsToObserve = [];
  const isDesktop = window.innerWidth >= 768;

  revealConfigs.forEach(({ selector, role, stagger }) => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node, idx) => {
      node.classList.add(role);
      if (stagger && isDesktop) {
        node.style.transitionDelay = `${idx * stagger}ms`;
      }
      elementsToObserve.push(node);
    });
  });

  // 4. High-Performance IntersectionObserver (Mobile & Desktop tuned)
  const isMobile = !isDesktop;
  const observerOptions = {
    root: null,
    rootMargin: isMobile ? '0px 0px -4% 0px' : '0px 0px -8% 0px',
    threshold: [0, 0.12]
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // Fast scroll / flick safety: If element is intersecting OR already scrolled past
      if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.95) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 5. Initial Viewport Check (Guarantees zero stuck states if user refreshed mid-page)
  elementsToObserve.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('is-revealed');
    } else {
      revealObserver.observe(el);
    }
  });

  // 6. Desktop Subtle Hero Parallax (Passive RAF with window width guard, zero mobile CPU/battery drain)
  initDesktopHeroParallax();

  // 7. Active Navigation Scroll Spy
  initScrollSpy();
}

/**
 * Desktop Hero Background Depth
 * Subtle, reversible 3D translation capped to 45px max
 * Dynamically adapts on resize: active on desktop (>=768px), inert on mobile (<768px)
 */
function initDesktopHeroParallax() {
  const heroBg = document.querySelector('.hero-bg-img');
  const heroSection = document.querySelector('.hero-section');
  if (!heroBg || !heroSection) return;

  let ticking = false;

  const onScroll = () => {
    if (window.innerWidth < 768) {
      if (heroBg.style.transform) heroBg.style.transform = '';
      return;
    }
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        if (scrollY <= heroHeight) {
          const offset = Math.min(scrollY * 0.18, 45);
          heroBg.style.transform = `translate3d(0, ${offset}px, 0)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

/**
 * High-Performance Scroll Spy
 * Keeps navigation links in sync with narrative chapters
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  const linkMap = new Map();
  let homeLink = null;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '/' || href === 'index.html' || href === '#') {
      homeLink = link;
    } else if (href && href.startsWith('#')) {
      linkMap.set(href.slice(1), link);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const activeLink = linkMap.get(id);
        if (activeLink) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }, {
    rootMargin: '-20% 0px -55% 0px'
  });

  sections.forEach(s => observer.observe(s));

  // Reset to Home when user scrolls back to the very top (hero)
  window.addEventListener('scroll', () => {
    if (window.scrollY < 200 && homeLink) {
      navLinks.forEach(l => l.classList.remove('active'));
      homeLink.classList.add('active');
    }
  }, { passive: true });
}


