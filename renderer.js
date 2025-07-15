// Futuristic Share Calculator Renderer

document.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = window.require ? window.require('electron') : window.electron || {};
  // Window controls
  const minBtn = document.getElementById('min-btn');
  const maxBtn = document.getElementById('max-btn');
  const closeBtn = document.getElementById('close-btn');

  if (minBtn && maxBtn && closeBtn && window.electron) {
    minBtn.addEventListener('click', () => window.electron.ipcRenderer.send('window-minimize'));
    maxBtn.addEventListener('click', () => window.electron.ipcRenderer.send('window-maximize'));
    closeBtn.addEventListener('click', () => window.electron.ipcRenderer.send('window-close'));
  } else if (minBtn && maxBtn && closeBtn && ipcRenderer) {
    minBtn.addEventListener('click', () => ipcRenderer.send('window-minimize'));
    maxBtn.addEventListener('click', () => ipcRenderer.send('window-maximize'));
    closeBtn.addEventListener('click', () => ipcRenderer.send('window-close'));
  }

  // About modal logic
  const aboutModal = document.getElementById('about-modal');
  const closeAbout = document.getElementById('close-about');
  function showAbout() {
    aboutModal.style.display = 'flex';
  }
  function hideAbout() {
    aboutModal.style.display = 'none';
  }
  if (closeAbout) closeAbout.onclick = hideAbout;
  window.addEventListener('click', (e) => {
    if (e.target === aboutModal) hideAbout();
  });
  // Listen for menu event
  if (window.electron && window.electron.ipcRenderer) {
    window.electron.ipcRenderer.on('open-about', showAbout);
  } else if (ipcRenderer) {
    ipcRenderer.on('open-about', showAbout);
  }

  const calcSplitBtn = document.getElementById('calcSplitBtn');
  const reverseCalcBtn = document.getElementById('reverseCalcBtn');
  const themeToggle = document.getElementById('theme-toggle');
  const output1 = document.getElementById('output1');
  const output2 = document.getElementById('output2');
  const body = document.body;

  calcSplitBtn.addEventListener('click', async () => {
    const total = parseFloat(document.getElementById('totalAmount').value);
    if (isNaN(total) || total <= 0) {
      animateOutput(output1, 'Please enter a valid amount.', true);
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/split', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalAmount: total })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'API error');
      }
      const data = await res.json();
      animateOutput(output1,
        `Charity: $${data.charity.toFixed(2)}<br>` +
        `Mine: $${data.mine.toFixed(2)}<br>` +
        `Parents: $${data.parents.toFixed(2)}<br>` +
        `Savings: $${data.savings.toFixed(2)}`
      );
    } catch (e) {
      animateOutput(output1, 'Server error: ' + e.message, true);
    }
  });

  reverseCalcBtn.addEventListener('click', async () => {
    const desired = parseFloat(document.getElementById('desiredShare').value);
    if (isNaN(desired) || desired <= 0) {
      animateOutput(output2, 'Please enter a valid desired share.', true);
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/api/reverse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ desiredShare: desired })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'API error');
      }
      const data = await res.json();
      animateOutput(output2,
        `You need to earn a total of $${data.totalRequired.toFixed(2)} to get $${desired}`
      );
    } catch (e) {
      animateOutput(output2, 'Server error: ' + e.message, true);
    }
  });

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });

  function animateOutput(element, html, isError = false) {
    element.classList.remove('fade-in', 'error');
    void element.offsetWidth; // trigger reflow
    element.innerHTML = html;
    element.classList.add('fade-in');
    if (isError) element.classList.add('error');
  }
});