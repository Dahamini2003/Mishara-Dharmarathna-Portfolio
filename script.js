/* === Scroll Progress Bar === */
const progress = document.querySelector(".progress");
window.addEventListener("scroll", () => {
  const h = document.body.scrollHeight - window.innerHeight;
  progress.style.width = (window.scrollY / h) * 100 + "%";
});

/* === Theme Toggle === */
const toggle = document.getElementById("themeToggle");
const icon = toggle.querySelector("i");
toggle.addEventListener("click", () => {
  const html = document.documentElement;
  const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  icon.className = next === "dark"
    ? "bi bi-brightness-high-fill"
    : "bi bi-moon-stars-fill";
});
const saved = localStorage.getItem("theme");
if (saved) {
  document.documentElement.setAttribute("data-theme", saved);
  icon.className = saved === "dark"
    ? "bi bi-brightness-high-fill"
    : "bi bi-moon-stars-fill";
}

/* === Scroll Reveal === */
const revealEls = document.querySelectorAll(".reveal");
function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;
  revealEls.forEach((el) => {
    if (el.getBoundingClientRect().top < trigger) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* === Staggered Animations === */
const staggerGroups = document.querySelectorAll(".reveal-stagger");
function staggerReveal() {
  staggerGroups.forEach(group => {
    const rect = group.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && !group.classList.contains("shown")) {
      group.classList.add("shown");
      const children = group.children;
      [...children].forEach((child, i) => {
        setTimeout(() => {
          child.style.opacity = 1;
          child.style.transform = "translateY(0)";
        }, i * 120);
      });
    }
  });
}
window.addEventListener("scroll", staggerReveal);
staggerReveal();

/* === Back to Top === */
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  toTop.style.display = window.scrollY > 400 ? "flex" : "none";
});
toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

/* === Burger Menu === */
const burger = document.getElementById("burger");
const nav = document.getElementById("navLinks");
burger.addEventListener("click", () => nav.classList.toggle("show"));

/* === Smooth Scroll === */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      nav.classList.remove("show");
    }
  });
});

/* === Auto Year === */
document.getElementById("year").textContent = new Date().getFullYear();

/* === Parallax Hero === */
window.addEventListener("scroll", () => {
  const bg = document.querySelector(".hero-bg");
  if (bg) bg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.1)`;
});
/* === Education Timeline Stagger === */
const eduItems = document.querySelectorAll(".edu-item");
function revealEdu() {
  eduItems.forEach((item, i) => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85 && !item.classList.contains("shown")) {
      setTimeout(() => item.classList.add("shown"), i * 150);
    }
  });
}
window.addEventListener("scroll", revealEdu);
revealEdu();
/* === Contact Section Reveal === */
const contactBlocks = document.querySelectorAll(".contact-wrapper > *");
function revealContact() {
  contactBlocks.forEach((block, i) => {
    const top = block.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85 && !block.classList.contains("shown")) {
      setTimeout(() => block.classList.add("shown"), i * 200);
    }
  });
}
window.addEventListener("scroll", revealContact);
revealContact();
/* === 3D Tilt Effect === */
document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / rect.height) * 10;
    const tiltY = -(x / rect.width) * 10;
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
/* === Skill Card Reveal Glow === */
const skillCards = document.querySelectorAll(".skill-card");
function revealSkills() {
  skillCards.forEach((card, i) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && !card.classList.contains("shown")) {
      setTimeout(() => card.classList.add("shown"), i * 150);
    }
  });
}
window.addEventListener("scroll", revealSkills);
revealSkills();

/* === 3D Tilt Effect for Project Cards === */
document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / 20).toFixed(2);
    const rotateY = ((x - rect.width / 2) / -20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0) rotateY(0)`;
  });
});
