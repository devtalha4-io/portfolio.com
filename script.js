window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const pageContent = document.querySelectorAll(".page-content");
  setTimeout(() => {
    loader.classList.add("hidden");
    pageContent.forEach((item) => item.classList.add("loaded"));

    // Run animations
    animateTextReveal();
    animateCounters();
    animateSkillTags();
    initSectionAnimations();
    createStars(); // Initialize stars animation
  }, 2500);
});

// =============================
// Section Animations on Scroll
// =============================
function initSectionAnimations() {
  const sections = document.querySelectorAll("section");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// =============================
// Animate Text Reveal
// =============================
function animateTextReveal() {
  const lines = document.querySelectorAll(".text-reveal-line");
  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.animationDelay = `${index * 0.2}s`;
    }, 500);
  });
}

// =============================
// Animate Counters
// =============================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-count]");

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const increment = target / 50;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      counter.textContent = Math.floor(current);

      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      }
    }, 50);
  };

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => animateCounter(counter));
          aboutObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
}

// =============================
// Animate Skill Tags
// =============================
function animateSkillTags() {
  const skillTags = document.querySelectorAll(".skill-tag");

  const tagObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transform = "translateY(0)";
            entry.target.style.opacity = "1";
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillTags.forEach((tag) => {
    tag.style.transform = "translateY(20px)";
    tag.style.opacity = "0";
    tag.style.transition = "all 0.5s ease";
    tagObserver.observe(tag);
  });
}

// =============================
// Stars Background Animation
// =============================
function createStars() {
  const stars = document.getElementById('stars');
  const total = 80;
  
  // Clear existing stars first
  stars.innerHTML = '';
  
  for (let i = 0; i < total; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = '-10px'; // Start above viewport
    
    // Random size
    const size = Math.random() * 3 + 0.5;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    // Random animation duration
    const duration = 8 + Math.random() * 12;
    star.style.animationDuration = duration + 's';
    
    // Random delay for staggered effect
    star.style.animationDelay = Math.random() * duration + 's';
    
    // Random opacity
    star.style.opacity = Math.random() * 0.8 + 0.3;
    
    stars.appendChild(star);
  }
}

// =============================
// Reveal on Scroll
// =============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, index) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.transform = "translateY(0)";
          e.target.style.opacity = "1";
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(
    ".card, section, .tech .item, .resume-item, .education-item"
  )
  .forEach((el) => {
    el.style.transform = "translateY(60px)";
    el.style.opacity = "0";
    el.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
  });

// =============================
// Mobile Menu Toggle
// =============================
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");
  navLinks.classList.toggle("open");
  menuToggle.innerHTML = navLinks.classList.contains("open")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
}

function closeMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");

  navLinks.classList.remove("open");
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
}

document.addEventListener("click", (e) => {
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.querySelector(".menu-toggle");

  if (
    navLinks.classList.contains("open") &&
    !navLinks.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    closeMenu();
  }
});

// =============================
// Smooth Scrolling Navbar with Active Link Detection
// =============================
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Remove active class from all links
      document
        .querySelectorAll(".nav-link")
        .forEach((l) => l.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      if (window.innerWidth <= 980) {
        setTimeout(closeMenu, 300);
      }
    }
  });
});

// =============================
// Active Link Detection on Scroll
// =============================
function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollPos = window.pageYOffset + 150;

  let activeSection = "";

  // Check which section is currently in view
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      activeSection = sectionId;
    }
  });

  // Special case for top of page - show Home as active
  if (window.pageYOffset < 100) {
    activeSection = "home";
  }

  // Update active link
  navLinks.forEach((link) => {
    const linkTarget = link.getAttribute("href").substring(1);
    
    if (linkTarget === activeSection) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
}

// Throttled scroll event listener
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateActiveLink, 10);
});

// Set initial active link on page load
document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.querySelector('.nav-link[href="#home"]');
  if (homeLink) {
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
    homeLink.classList.add("active");
  }
});

// =============================
// Back to Top Button
// =============================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  
  // Update active link to Home when going to top
  setTimeout(() => {
    document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active"));
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) homeLink.classList.add("active");
  }, 100);
});

// =============================
// Project Filters
// =============================
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));

    this.classList.add("active");

    const filter = this.getAttribute("data-filter");
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "block";
        card.style.animation = "scaleIn 0.6s ease";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// =============================
// Success Message Function
// =============================
function showSuccessMessage() {
  const form = document.querySelector('form');
  const submitBtn = form.querySelector('.submit');
  
  // Show success state
  submitBtn.textContent = 'Message Sent! ✓';
  submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
  
  // Reset form
  form.reset();
  
  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.textContent = 'Send message';
    submitBtn.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-light))';
  }, 3000);
}

