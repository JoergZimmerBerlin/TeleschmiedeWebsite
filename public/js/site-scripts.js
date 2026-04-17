(function() {
  let ticking = false;
  let cachedTotalHeight = 0;
  let cachedContentTop = 0;
  let cachedWindowHeight = 0;
  let hasBlogContent = false;

  function refreshMetrics() {
    const calculate = () => {
      cachedWindowHeight = window.innerHeight;
      cachedTotalHeight = document.documentElement.scrollHeight - cachedWindowHeight;
      const content = document.getElementById('blog-content');
      if (content) {
        cachedContentTop = content.offsetTop;
        cachedTotalHeight = content.scrollHeight;
        hasBlogContent = true;
      } else {
        hasBlogContent = false;
      }
      requestTick();
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(calculate, { timeout: 2000 });
    } else {
      setTimeout(calculate, 300);
    }
  }

  function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    if (!progressBar) return;

    const scrollPos = window.scrollY;
    let progress = 0;

    if (hasBlogContent) {
      progress = ((scrollPos - cachedContentTop + cachedWindowHeight / 2) / cachedTotalHeight) * 100;
    } else {
      progress = cachedTotalHeight > 0 ? (scrollPos / cachedTotalHeight) * 100 : 0;
    }

    progress = Math.max(0, Math.min(100, progress));
    progressBar.style.width = `${progress}%`;
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }

  function initTables() {
    document.querySelectorAll('.blog-content table').forEach(table => {
      const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent?.trim() || '');
      if (headers.length > 0) {
        table.querySelectorAll('tr').forEach(tr => {
          tr.querySelectorAll('td').forEach((td, i) => {
            if (headers[i]) td.setAttribute('data-label', headers[i]);
          });
        });
      }
    });
  }

  const initGlossaryTooltips = () => {
    let tooltip = document.getElementById('glossary-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'glossary-tooltip';
      tooltip.innerHTML = '<span class="tooltip-title"></span><p class="tooltip-body"></p>';
      document.body.appendChild(tooltip);
    }

    const titleEl = tooltip.querySelector('.tooltip-title');
    const bodyEl = tooltip.querySelector('.tooltip-body');

    let tooltipTicking = false;
    let cachedTooltipWidth = 0;
    let cachedTooltipHeight = 0;

    const updatePos = (e, targetTooltip) => {
      if (tooltipTicking) return;
      tooltipTicking = true;

      requestAnimationFrame(() => {
        const x = e.clientX || (e.touches?.[0]?.clientX) || 0;
        const y = e.clientY || (e.touches?.[0]?.clientY) || 0;
        const offset = 25;
        
        let left = x + offset;
        let top = y + offset;
        
        if (left + cachedTooltipWidth > window.innerWidth) {
          left = x - cachedTooltipWidth - offset;
        }
        if (top + cachedTooltipHeight > window.innerHeight) {
          top = y - cachedTooltipHeight - offset;
        }
        
        targetTooltip.style.left = `${Math.max(10, left)}px`;
        targetTooltip.style.top = `${Math.max(10, top)}px`;
        tooltipTicking = false;
      });
    };

    document.querySelectorAll('.glossary-link').forEach(link => {
      const showTooltip = (e) => {
        const title = link.getAttribute('data-tooltip-title') || '';
        const body = link.getAttribute('data-tooltip-body') || '';
        if (tooltip?.classList.contains('visible') && titleEl && titleEl.textContent === title) {
          return;
        }
        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.textContent = body;
        tooltip?.classList.add('visible');
        
        cachedTooltipWidth = tooltip.offsetWidth;
        cachedTooltipHeight = tooltip.offsetHeight;
        updatePos(e, tooltip);
      };

      const hideTooltip = () => {
        tooltip?.classList.remove('visible');
      };

      link.addEventListener('mouseenter', showTooltip);
      link.addEventListener('mousemove', (e) => tooltip && updatePos(e, tooltip));
      link.addEventListener('mouseleave', hideTooltip);
      
      link.addEventListener('touchstart', (e) => {
        const title = link.getAttribute('data-tooltip-title');
        const isVisible = tooltip?.classList.contains('visible');
        const isSame = titleEl && titleEl.textContent === title;

        if (isVisible && isSame) {
          hideTooltip();
        } else {
          showTooltip(e);
        }
      }, { passive: true });
    });

    document.addEventListener('click', (e) => {
      const target = e.target;
      if (target && typeof target.closest === 'function') {
        if (!target.closest('.glossary-link') && !target.closest('#glossary-tooltip')) {
          tooltip?.classList.remove('visible');
        }
      }
    });
  };

  // Initialization
  refreshMetrics();
  initTables();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlossaryTooltips);
  } else {
    initGlossaryTooltips();
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => {
    refreshMetrics();
    requestTick();
  }, { passive: true });

  // Recalculate slightly after load for dynamic layouts
  window.addEventListener('load', refreshMetrics);
})();
