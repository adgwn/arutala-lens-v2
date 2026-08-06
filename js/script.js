/* ============================================================
   ARUTALA LENS v2 — Interactions
   Smooth, professional, minimal.
   ============================================================ */

(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  /* ---------- Navbar solid + shadow on scroll ---------- */
  function onScrollNav() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  /* ---------- Active link on scroll ---------- */
  function highlightNav() {
    let current = "home";
    const pos = window.scrollY + 120;
    sections.forEach((sec) => {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    navLinks.forEach((link) =>
      link.classList.toggle("active", link.getAttribute("href") === "#" + current)
    );
  }

  function onScroll() {
    onScrollNav();
    highlightNav();
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (fade-up) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.setProperty("--d", (el.dataset.delay || 0) + "ms");
          el.classList.add("in-view");
          io.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ---------- Floating elements (subtle) ---------- */
  const floats = document.querySelectorAll(".hero__blob, .hero__dot, .cta__swatch");
  floats.forEach((el, i) => {
    el.style.animationDuration = 6 + (i % 3) + "s";
    el.style.animationDelay = (i * 0.5) + "s";
  });

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 880 && menu.classList.contains("open")) setMenu(false);
  });
})();
