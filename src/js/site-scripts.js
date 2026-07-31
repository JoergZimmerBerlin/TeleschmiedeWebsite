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

  function initCopyButtons() {
    // Site-wide Copy Link Logic
    document.querySelectorAll('.copy-link-btn').forEach(btn => {
      const feedback = btn.querySelector('.copy-feedback');
      const url = btn.dataset.url || window.location.href;
      
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(url);
          showFeedback(feedback);
        } catch (err) {
          console.warn('Clipboard API failed, using fallback.', err);
          fallbackCopy(url, feedback);
        }
      });
    });

    // Site-wide Copy Prompt Logic
    document.querySelectorAll('.copy-prompt-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const prompt = btn.dataset.prompt;
        if (prompt) {
          try {
            await navigator.clipboard.writeText(prompt);
            showBtnSuccess(btn);
          } catch (err) {
            fallbackCopy(prompt, null, btn);
          }
        }
      });
    });

    // Site-wide Copy Code Blocks Logic
    document.querySelectorAll('.blog-content pre').forEach(pre => {
      if (pre.querySelector('.copy-code-btn')) return; // Already initialized

      pre.style.position = 'relative';
      const btn = document.createElement('button');
      btn.className = 'copy-code-btn absolute top-3 right-3 px-2 py-1 bg-lime-accent text-dark hover:bg-lime-600 hover:text-white text-[10px] font-bold uppercase rounded border border-lime-500 hover:border-lime-600 transition-all flex items-center gap-1 z-10 shadow-md';
      btn.innerHTML = '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z" /></svg> Kopieren für Agent';
      
      btn.addEventListener('click', async () => {
        const codeEl = pre.querySelector('code');
        const textToCopy = codeEl ? codeEl.innerText : pre.innerText;
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          showBtnSuccess(btn, true);
        } catch (err) {
          fallbackCopy(textToCopy, null, btn, true);
        }
      });
      
      pre.appendChild(btn);
    });
  }

  function showFeedback(feedback) {
    if (!feedback) return;
    feedback.classList.remove('opacity-0');
    feedback.classList.add('opacity-100');
    setTimeout(() => {
      feedback.classList.remove('opacity-100');
      feedback.classList.add('opacity-0');
    }, 2000);
  }

  function showBtnSuccess(btn, isCodeBtn = false) {
    const originalHtml = btn.innerHTML;
    if (isCodeBtn) {
      btn.innerHTML = '<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg> Kopiert!';
      btn.classList.add('!bg-lime-600', '!text-white', '!border-lime-500');
    } else {
      btn.innerHTML = '<svg class="w-4 h-4 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
    }
    
    setTimeout(() => {
      btn.innerHTML = originalHtml;
      if (isCodeBtn) {
        btn.classList.remove('!bg-lime-600', '!text-white', '!border-lime-500');
      }
    }, 2000);
  }

  function fallbackCopy(text, feedback, btn = null, isCodeBtn = false) {
    try {
      const tempInput = document.createElement('textarea');
      tempInput.value = text;
      // Ensure it's hidden but part of the DOM
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      
      if (feedback) showFeedback(feedback);
      if (btn) showBtnSuccess(btn, isCodeBtn);
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr);
    }
  }

  function initExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // Initialization
  refreshMetrics();
  initTables();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initGlossaryTooltips();
      initCopyButtons();
      initExternalLinks();
    });
  } else {
    initGlossaryTooltips();
    initCopyButtons();
    initExternalLinks();
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => {
    refreshMetrics();
    requestTick();
  }, { passive: true });

  // Recalculate slightly after load for dynamic layouts
  window.addEventListener('load', refreshMetrics);
})();
