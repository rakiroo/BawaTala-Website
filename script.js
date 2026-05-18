document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".site-nav a");
const heroSection = document.querySelector(".hero-section");
const rotatingQuote = document.querySelector("#rotating-quote");
const apkDownloadLinks = document.querySelectorAll("[data-apk-download]");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const apkFileId = "1Df-ZsShPj6qlQ-H5uWXMkdP-pU9xkrPB";
const apkDownloadUrl = `https://drive.google.com/uc?export=download&id=${apkFileId}`;

const quotes = [
  "Small steps still count, especially on heavy days.",
  "You do not need to rush your healing to deserve peace.",
  "Rest counted today too.",
  "Starting gently is enough.",
];

let quoteIndex = 0;

apkDownloadLinks.forEach((link) => {
  link.href = apkDownloadUrl;
  link.setAttribute("aria-label", "Download Bawat Tala Android APK from Google Drive");
});

menuButton?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("nav-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const syncHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 20);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", isActive);
        });
      });
    },
    { rootMargin: "-35% 0px -50% 0px", threshold: 0.1 },
  );

  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (motionAllowed && rotatingQuote) {
  window.setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;

    rotatingQuote.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 520,
        easing: "ease-in-out",
      },
    );

    window.setTimeout(() => {
      rotatingQuote.textContent = quotes[quoteIndex];
    }, 240);
  }, 4200);
}

if (motionAllowed && window.matchMedia("(pointer: fine)").matches) {
  heroSection?.addEventListener("pointermove", (event) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroSection.style.setProperty("--hero-drift-x", `${x * 18}px`);
    heroSection.style.setProperty("--hero-drift-y", `${y * 18}px`);
  });

  heroSection?.addEventListener("pointerleave", () => {
    heroSection.style.setProperty("--hero-drift-x", "0px");
    heroSection.style.setProperty("--hero-drift-y", "0px");
  });

  tiltCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--tilt-x", `${x * 7}deg`);
      card.style.setProperty("--tilt-y", `${y * -7}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}
