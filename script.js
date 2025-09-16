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
    const counters = document.querySelectorAll('.stat-number');
    let hasStarted = false;

    function startCounting() {
        if (hasStarted) return;
        hasStarted = true;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50; // Smaller increment for smoother animation
            const updateInterval = 40; // Faster updates

            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);

                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, updateInterval);
        });
    }

    // Create Intersection Observer for stats section
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                // Add small delay to ensure DOM is ready
                setTimeout(startCounting, 100);
            } else if (!entry.isIntersecting) {
                // Reset counters when out of view
                hasStarted = false;
                counters.forEach(counter => {
                    counter.textContent = '0';
                });
            }
        });
    }, {
        threshold: 0.2, // Trigger earlier
        rootMargin: '50px' // Give some margin
    });

    // Observe the stats section
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
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
// Enhanced Mobile Menu Toggle
// =============================
function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const body = document.body;

  navbar.classList.toggle("mobile-open");

  if (navbar.classList.contains("mobile-open")) {
    menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    body.style.overflow = 'hidden'; // Prevent background scrolling
  } else {
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    body.style.overflow = ''; // Restore scrolling
  }
}

function closeMenu() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const body = document.body;

  navbar.classList.remove("mobile-open");
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  body.style.overflow = ''; // Restore scrolling
}

// Enhanced click event handling
document.addEventListener("click", (e) => {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");

  if (navbar.classList.contains("mobile-open") &&
    !navbar.contains(e.target) &&
    !menuToggle.contains(e.target)) {
    closeMenu();
  }
});

// Add event listener to menu toggle button
document.getElementById('menuToggle').addEventListener('click', toggleMenu);

// Close menu when a navigation link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    closeMenu();

    // Smooth scroll to section
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// =============================
// Smooth Scrolling Navbar with Active Link Detection
// =============================
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    document.querySelectorAll(".nav-links a").forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });

  // Back to top button visibility
  const backToTop = document.getElementById("backToTop");
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
// Form Submission Handling
// =============================
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const submitBtn = this.querySelector('.submit');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Simulate form submission success after 2 seconds
  setTimeout(() => {
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    this.reset();

    // Reset the button after another 3 seconds
    setTimeout(() => {
      submitBtn.textContent = 'Send message';
      submitBtn.style.background = ''; // Revert to original background
      submitBtn.style.color = '';
      submitBtn.disabled = false;
    }, 3000);
  }, 2000);
});

// =============================
// Utility Functions
// =============================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function downloadResume() {
  // Add your resume download logic here
  alert('Resume download functionality would be implemented here');
}

// =============================
// Keyboard Navigation Support
// =============================
document.addEventListener('keydown', (e) => {
  const navbar = document.querySelector(".navbar");

  // Close mobile menu with Escape key
  if (e.key === 'Escape' && navbar.classList.contains("mobile-open")) {
    closeMenu();
  }
});

// =============================
// Window Resize Handler
// =============================
window.addEventListener('resize', () => {
  const navbar = document.querySelector(".navbar");

  // Close mobile menu if window is resized to desktop size
  if (window.innerWidth > 980 && navbar.classList.contains("mobile-open")) {
    closeMenu();
  }
});

// initialize email js 
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_kf61skd', 'template_h7oe699', this)
        .then(() => {
            alert('Message sent successfully! ✅');
        }, (error) => {
            alert('Failed to send ❌ ' + JSON.stringify(error));
        });
});


