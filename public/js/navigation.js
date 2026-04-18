(() => {
  const initMenu = () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
      // Remove any existing listener to prevent double-firing
      const newBtn = btn.cloneNode(true);
      const parent = btn.parentNode;
      
      if (parent) {
        parent.replaceChild(newBtn, btn);
        
        newBtn.addEventListener('click', () => {
          const isHidden = menu.classList.toggle('hidden');
          newBtn.setAttribute('aria-expanded', String(!isHidden));
        });
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenu);
  } else {
    initMenu();
  }
})();
