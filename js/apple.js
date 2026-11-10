/**
 * Apple Design Interactivity - Luís Morais Portfolio
 * Pure vanilla JavaScript - Zero dependencies, ultra lightweight & performant
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Apple Header Scroll Blur & Border state
  const header = document.querySelector(".apple-nav");
  const updateHeaderScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // 2. Mobile Menu Sheet Toggle
  const menuToggle = document.querySelector(".apple-menu-toggle");
  const mobileMenu = document.querySelector(".apple-mobile-menu");
  const mobileLinks = document.querySelectorAll(".apple-mobile-link, .apple-mobile-cta a");

  if (menuToggle && mobileMenu) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileMenu.classList.contains("is-open");
      menuToggle.classList.toggle("is-active", isOpen);
      mobileMenu.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    menuToggle.addEventListener("click", () => toggleMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  }

  // 3. Apple Subtitle Text Rotating Ticker
  const tickerElement = document.querySelector(".hero-ticker-text");
  if (tickerElement) {
    const roles = [
      "Java Application Developer",
      "Especialista em Microsserviços & Spring Boot",
      "Formado em Análise e Desenvolvimento de Sistemas",
      "Engenharia Backend & Arquitetura Cloud"
    ];
    let currentIndex = 0;

    setInterval(() => {
      tickerElement.style.opacity = "0";
      tickerElement.style.transform = "translateY(8px)";

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % roles.length;
        tickerElement.textContent = roles[currentIndex];
        tickerElement.style.opacity = "1";
        tickerElement.style.transform = "translateY(0)";
      }, 300);
    }, 3600);
  }

  // 4. Active Nav Link on Scroll (Intersection Observer)
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".apple-nav-link");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }
});
