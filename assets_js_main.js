/* Theme toggle + typewriter + skills animation + tiny contact handler */
(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const typeEl = document.getElementById('typewriter');
  const skills = Array.from(document.querySelectorAll('.skill'));
  const yearEl = document.getElementById('year');

  // Persist theme
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);

  function updateToggle() {
    const t = document.documentElement.getAttribute('data-theme') === 'dark';
    themeToggle.textContent = t ? '☀️' : '🌙';
  }
  updateToggle();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next === 'dark' ? 'dark' : '');
    localStorage.setItem('theme', next === 'dark' ? 'dark' : 'light');
    updateToggle();
  });

  // Typewriter effect
  const phrases = ['Web Developer', 'Frontend Engineer', 'UI / UX Enthusiast', 'Problem Solver'];
  let pIndex = 0, cIndex = 0, forward = true;
  function tick() {
    const cur = phrases[pIndex];
    if (forward) {
      cIndex++;
      if (cIndex >= cur.length) { forward = false; setTimeout(tick, 1000); return; }
    } else {
      cIndex--;
      if (cIndex <= 0) { forward = true; pIndex = (pIndex + 1) % phrases.length; setTimeout(tick, 300); return; }
    }
    typeEl.textContent = cur.slice(0, cIndex);
    setTimeout(tick, forward ? 80 : 40);
  }
  tick();

  // Animate skills when visible
  function animateSkills() {
    const bounds = document.getElementById('skills').getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom >= 0) {
      skills.forEach(s => {
        const fill = s.querySelector('.skill-fill');
        const percentEl = s.querySelector('.skill-percent');
        const target = parseInt(percentEl.getAttribute('data-value'), 10) || 0;
        fill.style.width = target + '%';
        // animate number
        let n = 0;
        const step = Math.max(1, Math.floor(target / 25));
        const id = setInterval(() => {
          n += step;
          if (n >= target) { n = target; clearInterval(id); }
          percentEl.textContent = n + '%';
        }, 15);
      });
      window.removeEventListener('scroll', animateSkills);
    }
  }
  window.addEventListener('scroll', animateSkills);
  // in case it's already visible
  setTimeout(animateSkills, 400);

  // Smooth scroll for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // contact form faux send
  window.sendMessage = function(){
    alert('Thanks — this form doesn\\'t submit in the demo. Replace with your API or mailto logic.');
  }

  // set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();