// Fade-in on scroll for each section
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight - 80; // Adjust as needed
}
function animateSections() {
  document.querySelectorAll('.animated-section').forEach(sec => {
    if (isInViewport(sec)) {
      sec.style.animationPlayState = 'running';
      sec.style.opacity = 1;
    }
  });
}
window.addEventListener('scroll', animateSections);
window.addEventListener('load', animateSections);

// Auto-highlight active nav item
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const sections = Array.from(document.querySelectorAll('section[id]'));
window.addEventListener('scroll', () => {
  let cur = sections[0];
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) cur = section;
  });
  navLinks.forEach(link => link.classList.remove('active'));
  let link = document.querySelector('.navbar-nav .nav-link[href="#'+cur.id+'"]');
  if (link) link.classList.add('active');
});

// Smooth Scroll for Navbar Links
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    const hash = this.getAttribute('href');
    if (hash.startsWith('#')) {
      e.preventDefault();
      document.querySelector(hash).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // collapse navbar after click (on mobile)
      const navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
      }
    }
  });
});
