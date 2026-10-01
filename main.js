/**
 * MYTEAM MULTI-PAGE WEBSITE
 * Interactive behaviors: Mobile navigation, Director flip cards, Contact form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  function openMobileNav() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closeMobileNav() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMobileNav);
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileNav);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileNav);
  }

  // Close mobile nav on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
      closeMobileNav();
    }
  });

  // -------------------------------------------------------------------------
  // 2. Director Flip Cards (About Page)
  // -------------------------------------------------------------------------
  const directorCards = document.querySelectorAll('.director-card');

  directorCards.forEach((card) => {
    const openBtn = card.querySelector('.btn-flip-open');
    const closeBtn = card.querySelector('.btn-flip-close');

    if (openBtn) {
      openBtn.addEventListener('click', () => {
        card.classList.add('is-flipped');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        card.classList.remove('is-flipped');
      });
    }
  });

  // -------------------------------------------------------------------------
  // 3. Contact Form Validation (Contact Page)
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successBanner = document.getElementById('formSuccess');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(input, conditionFn, errorMessage) {
      const group = input.closest('.form-group');
      const errorSpan = group.querySelector('.error-message');

      if (!conditionFn(input.value.trim())) {
        group.classList.add('has-error');
        if (errorSpan) errorSpan.textContent = errorMessage;
        return false;
      } else {
        group.classList.remove('has-error');
        return true;
      }
    }

    // Input listeners to clear errors while typing
    [nameInput, emailInput, messageInput].forEach((input) => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group.classList.contains('has-error')) {
            group.classList.remove('has-error');
          }
        });
      }
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      if (nameInput) {
        const isNameValid = validateField(
          nameInput,
          (val) => val.length > 0,
          'This field is required'
        );
        if (!isNameValid) isValid = false;
      }

      // Validate Email
      if (emailInput) {
        const emailVal = emailInput.value.trim();
        if (emailVal.length === 0) {
          validateField(emailInput, () => false, 'This field is required');
          isValid = false;
        } else if (!emailRegex.test(emailVal)) {
          validateField(emailInput, () => false, 'Please use a valid email address');
          isValid = false;
        } else {
          validateField(emailInput, () => true, '');
        }
      }

      // Validate Message
      if (messageInput) {
        const isMsgValid = validateField(
          messageInput,
          (val) => val.length > 0,
          'This field is required'
        );
        if (!isMsgValid) isValid = false;
      }

      // If valid, submit action
      if (isValid) {
        if (successBanner) {
          successBanner.classList.add('active');
          contactForm.reset();

          setTimeout(() => {
            successBanner.classList.remove('active');
          }, 6000);
        } else {
          alert('Thank you! Your message has been sent successfully.');
          contactForm.reset();
        }
      }
    });
  }
});
