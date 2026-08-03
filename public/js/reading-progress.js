(function() {
  let ticking = false;
  let cachedTotalHeight = 0;
  let cachedContentTop = 0;
  let cachedWindowHeight = 0;
  let hasBlogContent = false;

  function refreshMetrics() {
    const calculate = () => {
      cachedWindowHeight = window.innerHeight;
      const content = document.getElementById('blog-content');
      if (content) {
        cachedContentTop = content.offsetTop;
        cachedTotalHeight = content.scrollHeight;
        hasBlogContent = true;
      } else {
        cachedTotalHeight = document.documentElement.scrollHeight - cachedWindowHeight;
        hasBlogContent = false;
      }
      requestTick();
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(calculate);
    } else {
      setTimeout(calculate, 1);
    }
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateProgressBar);
      ticking = true;
    }
  }

  function updateProgressBar() {
    const scrollPos = window.scrollY;
    let progress = 0;

    if (hasBlogContent) {
      const relativeScroll = scrollPos - cachedContentTop;
      progress = Math.min(Math.max((relativeScroll / cachedTotalHeight) * 100, 0), 100);
    } else {
      progress = Math.min(Math.max((scrollPos / cachedTotalHeight) * 100, 0), 100);
    }

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', refreshMetrics, { passive: true });
  
  // Initial calculation
  refreshMetrics();
  
  // Recalculate after a short delay for late-rendering elements
  setTimeout(refreshMetrics, 1500);
})();
