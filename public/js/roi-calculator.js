(() => {
  function calculateROI() {
    const visitorsInput = document.getElementById('monthly-visitors');
    const convRateInput = document.getElementById('conv-rate');
    const avgOrderInput = document.getElementById('avg-order');

    if (!visitorsInput || !convRateInput || !avgOrderInput) return;

    const visitors = parseInt(visitorsInput.value);
    const convRate = parseFloat(convRateInput.value);
    const avgOrder = parseInt(avgOrderInput.value);

    // Update labels
    const vVal = document.getElementById('visitors-value');
    const cVal = document.getElementById('conv-value');
    const oVal = document.getElementById('order-value');
    
    if (vVal) vVal.textContent = visitors.toLocaleString('de-DE');
    if (cVal) cVal.textContent = convRate + '%';
    if (oVal) oVal.textContent = avgOrder + '€';

    // Calculate
    const leads = Math.round(visitors * (convRate / 100));
    const monthlyRevenue = leads * avgOrder;
    const annualRevenue = monthlyRevenue * 12;

    // Update results
    const lRes = document.getElementById('leads-result');
    const rRes = document.getElementById('roi-result');
    const aRes = document.getElementById('annual-result');

    if (lRes) lRes.textContent = leads.toLocaleString('de-DE');
    if (rRes) rRes.textContent = monthlyRevenue.toLocaleString('de-DE') + '€';
    if (aRes) aRes.textContent = annualRevenue.toLocaleString('de-DE') + '€';
  }

  const setupROI = () => {
    ['monthly-visitors', 'conv-rate', 'avg-order'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', calculateROI);
    });
    calculateROI();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupROI);
  } else {
    setupROI();
  }
})();
