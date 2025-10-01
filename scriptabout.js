  /* ====== Utilities ====== */
  const $ = (s, o = document) => o.querySelector(s);
  const $$ = (s, o = document) => [...o.querySelectorAll(s)];

  /* ====== Preloader ====== */
  window.addEventListener('load', () => {
    setTimeout(() => {
      $('#preloader')?.classList.add('hidden');
    }, 350); // small delay for polish
  });

  /* ====== Theme Toggle (persist) ====== */
  const userPref = localStorage.getItem('theme');
  if (userPref === 'light') document.documentElement.classList.add('light');

  const themeToggle = $('#themeToggle');
  themeToggle?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem('theme',
      document.documentElement.classList.contains('light') ? 'light' : 'dark'
    );
  });

  /* ====== Mobile Nav + Join Dropdown ====== */
  const hamburger = $('#hamburger');
  const nav = $('#nav');
  hamburger?.addEventListener('click', () => nav?.classList.toggle('open'));

  const joinDropdown = $('#joinDropdown')?.closest('.dropdown');
  $('#joinDropdown')?.addEventListener('click', (e) => {
    e.stopPropagation();
    joinDropdown?.classList.toggle('open');
  });
  document.addEventListener('click', () => joinDropdown?.classList.remove('open'));

  /* ====== Scroll Reveal ====== */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  },{ threshold: 0.16, rootMargin: '0px 0px -30px 0px' });

  $$('[data-reveal]').forEach(el => io.observe(el));

  /* Tilt effect on hover */
  $$('.tilt').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const rx = ((y / r.height) - .5) * -6;
      const ry = ((x / r.width) - .5) * 6;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = 'rotateX(0) rotateY(0)');
  });

  /* ====== Particles Background ====== */
  (function particles(){
    const c = document.getElementById('bg-particles');
    const ctx = c.getContext('2d');
    let w, h, dpr, dots;

    function resize(){
      dpr = window.devicePixelRatio || 1;
      w = c.width = innerWidth * dpr;
      h = c.height = innerHeight * dpr;
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      createDots();
    }

    function createDots(){
      const count = Math.min(140, Math.floor((innerWidth * innerHeight) / 12000));
      dots = new Array(count).fill().map(() => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - .5) * .6,
        vy: (Math.random() - .5) * .6,
        r: Math.random() * 2 + .6,
        a: Math.random() * 0.6 + 0.2
      }));
    }

    function draw(){
      ctx.clearRect(0,0,innerWidth,innerHeight);
      // glow background haze
      const grd = ctx.createRadialGradient(innerWidth*0.1, innerHeight*0.1, 0, innerWidth*0.1, innerHeight*0.1, 600);
      grd.addColorStop(0, 'rgba(124,92,255,.10)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0,0,innerWidth,innerHeight);

      // dots
      dots.forEach((p,i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > innerHeight) p.vy *= -1;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = '#7c5cff';
        ctx.fill();
      });

      // lines
      ctx.globalAlpha = 0.15;
      ctx.lineWidth = 1;
      for (let i=0;i<dots.length;i++){
        for (let j=i+1;j<dots.length;j++){
          const a = dots[i], b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140){
            ctx.strokeStyle = '#7c5cff';
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive:true });
    resize(); draw();
  })();

  /* ====== Forms (Auth + Contact) ====== */
  const authModal = $('#authModal');
  function openAuth(which='login'){
    authModal?.classList.add('show');
    switchTab(which);
    document.body.style.overflow = 'hidden';
  }
  function closeAuth(){
    authModal?.classList.remove('show');
    document.body.style.overflow = '';
  }
  $$('[data-open-auth]').forEach(btn => {
    btn.addEventListener('click', () => openAuth(btn.dataset.openAuth));
  });
  $$('[data-close-modal]').forEach(btn => btn.addEventListener('click', closeAuth));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeAuth());

  /* Auth tabs switching with 3D flip accent */
  const tabs = $$('.auth-tab');
  function switchTab(name){
    tabs.forEach(t => t.classList.toggle('active', t.dataset.authTab === name));
    $$('.auth-panel').forEach(p => p.classList.toggle('active', p.id === (name==='login' ? 'loginForm' : 'registerForm')));
  }
  tabs.forEach(t => t.addEventListener('click', () => switchTab(t.dataset.authTab)));

  /* Fake submit handling (demo only) */
  $('#loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = $('#loginNote');
    note.textContent = 'Logged in (demo).';
    toast('Welcome back!');
    setTimeout(closeAuth, 600);
  });
  $('#registerForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = $('#registerNote');
    note.textContent = 'Registration successful (demo).';
    toast('Account created!');
    setTimeout(closeAuth, 700);
  });
  $('#contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    $('#formNote').textContent = 'Thanks! We’ll get back to you shortly.';
    toast('Message sent.');
  });

  /* Toasts */
  function toast(msg='Done'){
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1800);
  }

  /* Footer year */
  $('#year').textContent = new Date().getFullYear();
