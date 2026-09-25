document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelectorAll(".site-nav a");
const rotatingQuote = document.querySelector("#rotating-quote");
const apkDownloadLinks = document.querySelectorAll("[data-apk-download]");
const revealItems = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const motionAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const apkDownloadUrl = "https://drive.google.com/file/d/13u65qMGvtVIZIT2ULHI4uqakduDmhXAH/view?usp=sharing";

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

// Interactive Feature Tabs
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.feature-tab');
  const panes = document.querySelectorAll('.feature-pane');

  if(tabs.length > 0) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding pane
        const targetId = tab.getAttribute('data-target');
        const targetPane = document.getElementById(targetId);
        if(targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
});

// Mini Journal Interaction
document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('mini-journal-btn');
  const input = document.getElementById('mini-journal-input');
  const response = document.getElementById('mini-journal-response');

  if (saveBtn && input && response) {
    saveBtn.addEventListener('click', () => {
      const text = input.value.trim();
      if (text.length > 0) {
        saveBtn.innerText = 'Saving...';
        saveBtn.style.opacity = '0.7';
        
        // Simulate soft delay like the app
        setTimeout(() => {
          response.innerHTML = '<i>? Your thought has been gently safely tucked away.</i><br><br><span style="font-size:14px; color:#506864; font-weight:normal;">Muni is proud of you for sharing.</span>';
          response.classList.add('show');
          
          setTimeout(() => {
            input.value = '';
            response.classList.remove('show');
            saveBtn.innerText = 'Save to your stars';
            saveBtn.style.opacity = '1';
          }, 4000);
        }, 800);
      } else {
        input.focus();
        input.placeholder = "Try writing just one small thought first...";
      }
    });
  }
});
// Full Journal Spread Interactions
document.addEventListener('DOMContentLoaded', () => {
  const muniText = document.getElementById('muni-typing-text');
  if (muniText) {
    const textToType = "It's okay if today was heavy. I'm here to listen.";
    let i = 0;
    
    // Typewriter effect
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        muniText.innerText = textToType.substring(0, i);
        i++;
        if (i > textToType.length) {
          clearInterval(typeInterval);
          muniText.style.borderRight = "none";
        }
      }, 70);
    }, 1000);

    const saveBtn = document.getElementById('main-journal-btn');
    const input = document.getElementById('main-journal-input');
    const response = document.getElementById('main-journal-response');

    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
          if (input.value.trim().length > 0) {
            saveBtn.innerText = 'Saving...';
            saveBtn.style.opacity = '0.7';
            
            setTimeout(() => {
              response.innerHTML = '<i>? Your thought has been softly tucked away into the stars.</i><br><br><span style="font-size:16px; color:#506864; font-family:sans-serif; font-weight:normal;">Muni is proud of you for sharing.</span>';
              response.classList.add('show');
              
              setTimeout(() => {
                input.value = '';
                response.classList.remove('show');
                saveBtn.innerText = 'Save to your stars';
                saveBtn.style.opacity = '1';
              }, 4000);
            }, 800);
          } else {
            input.focus();
            input.placeholder = "Take a breath, and write even just a single word...";
          }
        });
    }
  }
});

// FAQ Typing Animation
document.addEventListener('DOMContentLoaded', () => {
  const faqText = document.getElementById('faq-typing-text');
  if (faqText) {
    const textToType = "I'm here to answer your questions.";
    let i = 0;
    
    // Typewriter effect triggered by Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          setTimeout(() => {
            const typeInterval = setInterval(() => {
              faqText.innerText = textToType.substring(0, i);
              i++;
              if (i > textToType.length) {
                clearInterval(typeInterval);
                faqText.style.borderRight = "none";
              }
            }, 60);
          }, 500);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(faqText);
  }
});





// Interactive Muni Wardrobe - Flying Clothes (Hitbox Model)
document.addEventListener('DOMContentLoaded', () => {
  const hitboxes = document.querySelectorAll('.outfit-hitbox');
  const outfits = document.querySelectorAll('.floating-outfit');

  if(hitboxes.length > 0) {
    hitboxes.forEach(hitbox => {
      
      const targetId = hitbox.getAttribute('data-target');
      const targetOutfit = document.getElementById(targetId);

      const wearOutfit = () => {
        outfits.forEach(o => {
          if(o !== targetOutfit) o.classList.remove('wearing');
        });
        targetOutfit.classList.add('wearing');
      };

      hitbox.addEventListener('mouseenter', wearOutfit);
      
      hitbox.addEventListener('mouseleave', () => {
        targetOutfit.classList.remove('wearing');
      });
      
      hitbox.addEventListener('touchstart', (e) => {
        if(targetOutfit.classList.contains('wearing')) {
          targetOutfit.classList.remove('wearing');
        } else {
          wearOutfit();
        }
      });
    });
    
    document.addEventListener('touchstart', (e) => {
      if(!e.target.closest('.outfit-hitbox')) {
        outfits.forEach(o => o.classList.remove('wearing'));
      }
    });
  }
});





// Dismiss mobile navigation when clicking outside header
document.addEventListener("click", (event) => {
  const headerElem = document.querySelector(".site-header");
  const menuBtnElem = document.querySelector(".menu-button");
  if (headerElem && headerElem.classList.contains("nav-open") && !headerElem.contains(event.target)) {
    headerElem.classList.remove("nav-open");
    menuBtnElem?.setAttribute("aria-expanded", "false");
  }
});
