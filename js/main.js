// ...existing code...
(() => {
  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('overlayMenu');
  const closeBtn = document.getElementById('overlayClose');
  const backdrop = overlay?.querySelector('.overlay-backdrop');
  let lastFocused = null;

  if (!menuBtn || !overlay) return;

  const focusableSelector = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])';

  function openMenu() {
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    // focus first focusable in overlay
    const first = overlay.querySelector(focusableSelector);
    if (first) first.focus();
  }

  function closeMenu() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    expanded ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  // close when clicking outside panel
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeMenu();
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
    if (e.key === 'Tab' && overlay.classList.contains('open')) {
      // simple focus trap
      const nodes = Array.from(overlay.querySelectorAll(focusableSelector)).filter(n => n.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    }
  });

  // prevent focus leaving on mouse click (accessibility)
  document.addEventListener('focusin', (e) => {
    if (overlay.classList.contains('open') && !overlay.contains(e.target)) {
      e.stopPropagation();
      const first = overlay.querySelector(focusableSelector);
      if (first) first.focus();
    }
  });
})();
 // ...existing code...
 