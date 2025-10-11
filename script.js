// Theme toggle with localStorage
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile menu
const burger = document.getElementById('burger');
const links = document.getElementById('links');
burger.addEventListener('click', () => links.classList.toggle('open'));
[...links.querySelectorAll('a')].forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Active link on scroll
const sections = ['about', 'skills', 'projects', 'education', 'contact'];
const anchors = sections.map(id => ({ id, el: links.querySelector(`[href="#${id}"]`) }));
const spy = new IntersectionObserver((entries) => {
  entries.forEach(ent => {
    const a = anchors.find(x => `#${x.id}` === `#${ent.target.id}`)?.el;
    if (!a) return;
    if (ent.isIntersecting) {
      links.querySelectorAll('a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach(id => spy.observe(document.getElementById(id)));

// Reveal animation
const rev = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      rev.unobserve(e.target);
    }
  });
}, { threshold: .18 });
document.querySelectorAll('.reveal').forEach(el => rev.observe(el));

// Progress bars (Skills)
const pb = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const pct = e.target.getAttribute('data-pct') || 60;
      const bar = e.target.querySelector('.bar');
      requestAnimationFrame(() => { bar.style.width = pct + '%'; });
      pb.unobserve(e.target);
    }
  });
}, { threshold: .45 });
document.querySelectorAll('.skill').forEach(el => pb.observe(el));

// Tilt effect (cards + avatar)
const tilts = document.querySelectorAll('.tilt');
tilts.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width, dy = (e.clientY - cy) / r.height;
    card.style.setProperty('--ry', (dx * 8) + 'deg');
    card.style.setProperty('--rx', (-dy * 8) + 'deg');
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--rx', '0deg');
  });
});

// Scroll progress
const progress = document.querySelector('.progress');
const onScroll = () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  const p = Math.max(0, Math.min(1, scrollY / h));
  progress.style.setProperty('--p', p);
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Contact: open default mail app
function sendMail(ev) {
  ev.preventDefault();
  const n = document.getElementById('name').value.trim();
  const e = document.getElementById('email').value.trim();
  const m = document.getElementById('message').value.trim();
  const body = encodeURIComponent(`Hi Mishara,%0D%0A%0D%0A${m}%0D%0A%0D%0A— ${n}%0D%0A${e}`);
  location.href = `mailto:mdehemini@gmail.com?subject=Portfolio%20Inquiry&body=${body}`;
  return false;
}
window.sendMail = sendMail;

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
