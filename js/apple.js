/**
 * Apple Design Interactivity - Luís Morais Portfolio
 * Vanilla JS — Zero dependencies, ultra lightweight & performant
 * Supports: Scroll FX, Mobile Menu, Ticker, Active Nav, Language Toggle
 */

document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------------------------------------------
  // 1. Apple Header Scroll State
  // ----------------------------------------------------------------
  const header = document.querySelector(".apple-nav");
  const updateHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // ----------------------------------------------------------------
  // 2. Mobile Menu Drawer
  // ----------------------------------------------------------------
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
    mobileLinks.forEach((link) => link.addEventListener("click", () => toggleMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) toggleMenu(false);
    });
  }

  // ----------------------------------------------------------------
  // 3. Hero Subtitle Rotating Ticker — PT and EN independently
  // ----------------------------------------------------------------
  const tickerConfig = {
    pt: {
      el: document.querySelector("#tickerPt"),
      roles: [
        "Java Application Developer",
        "Especialista em Microsserviços & Spring Boot",
        "Formado em Análise e Desenvolvimento de Sistemas",
        "Engenharia Backend & Arquitetura Cloud",
      ],
      index: 0,
    },
    en: {
      el: document.querySelector("#tickerEn"),
      roles: [
        "Java Application Developer",
        "Microservices & Spring Boot Specialist",
        "Systems Analysis & Development Graduate",
        "Backend Engineering & Cloud Architecture",
      ],
      index: 0,
    },
  };

  const rotateTicker = (config) => {
    if (!config.el) return;
    config.el.style.opacity = "0";
    config.el.style.transform = "translateY(8px)";
    setTimeout(() => {
      config.index = (config.index + 1) % config.roles.length;
      config.el.textContent = config.roles[config.index];
      config.el.style.opacity = "1";
      config.el.style.transform = "translateY(0)";
    }, 300);
  };

  setInterval(() => {
    rotateTicker(tickerConfig.pt);
    rotateTicker(tickerConfig.en);
  }, 3600);

  // ----------------------------------------------------------------
  // 4. Active Nav Link on Scroll (Intersection Observer)
  // ----------------------------------------------------------------
  const updateActiveNav = () => {
    const lang = document.documentElement.getAttribute("data-lang") || "pt";
    const sections = document.querySelectorAll("section[id].lang-" + lang);
    const navLinks = document.querySelectorAll(".apple-nav-link");

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const href = link.getAttribute("href");
              link.classList.toggle("active", href === "#" + id);
            });
          }
        });
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return observer;
  };

  let sectionObserver = updateActiveNav();

  // ----------------------------------------------------------------
  // 5. Language Toggle
  // ----------------------------------------------------------------
  const langToggleBtn = document.getElementById("langToggle");
  const optPt = document.querySelector(".lang-opt-pt");
  const optEn = document.querySelector(".lang-opt-en");
  const navCvLink = document.getElementById("navCvLink");

  const switchLang = (toLang) => {
    const html = document.documentElement;
    html.setAttribute("data-lang", toLang);
    html.setAttribute("lang", toLang === "pt" ? "pt-BR" : "en");

    const isEn = toLang === "en";

    // Toggle active state on the pill
    optPt.classList.toggle("active", !isEn);
    optEn.classList.toggle("active", isEn);

    // Show / hide all lang blocks in body
    document.querySelectorAll(".lang-pt").forEach((el) => {
      el.style.display = isEn ? "none" : "";
    });
    document.querySelectorAll(".lang-en").forEach((el) => {
      el.style.display = isEn ? "" : "none";
    });

    // Update nav desktop link texts & hrefs
    document.querySelectorAll("[data-pt][data-en]").forEach((el) => {
      if (el.classList.contains("apple-nav-link") || el.classList.contains("apple-mobile-link")) {
        el.textContent = isEn ? el.getAttribute("data-en") : el.getAttribute("data-pt");
        const href = isEn ? el.getAttribute("data-en-href") : el.getAttribute("data-pt-href");
        if (href) el.setAttribute("href", href);
      }
    });

    // Update nav CV download link
    if (navCvLink) {
      navCvLink.setAttribute(
        "href",
        isEn ? navCvLink.getAttribute("data-en-href") : navCvLink.getAttribute("data-pt-href")
      );
    }

    // Update <title> and <meta description>
    if (isEn) {
      document.title = "Luís Morais — Java Application Developer";
      const desc = document.querySelector("meta[name='description']");
      if (desc) desc.setAttribute("content", "Professional portfolio of Luís Morais, Java Developer specialized in microservices, distributed architecture, messaging and cloud.");
    } else {
      document.title = "Luís Morais — Java Application Developer";
      const desc = document.querySelector("meta[name='description']");
      if (desc) desc.setAttribute("content", "Portfólio profissional de Luís Morais, Desenvolvedor Java especializado em microsserviços, arquitetura distribuída, mensageria e cloud.");
    }

    // Scroll to top of active hero
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Persist preference
    localStorage.setItem("prefLang", toLang);

    // Re-init intersection observer for new sections
    if (sectionObserver) sectionObserver.disconnect();
    sectionObserver = updateActiveNav();
  };

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-lang") || "pt";
      switchLang(current === "pt" ? "en" : "pt");
    });
  }

  // Restore persisted language preference
  const savedLang = localStorage.getItem("prefLang");
  if (savedLang && savedLang !== "pt") {
    switchLang(savedLang);
  }

});
