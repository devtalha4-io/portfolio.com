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
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const body = document.body;

    // Toggle classes immediately
    navbar.classList.toggle("mobile-open");
    navLinks.classList.toggle("open");
    
    // Update menu icon and body scroll
    if (navbar.classList.contains("mobile-open")) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        body.style.overflow = 'hidden';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        body.style.overflow = '';
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById("menuToggle");
    
    // Add touchstart event for mobile
    menuToggle.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        toggleMenu();
    }, { passive: false });
    
    // Keep click event for desktop
    menuToggle.addEventListener('click', toggleMenu);
    
    // Handle navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbar = document.querySelector(".navbar");
            const menuToggle = document.getElementById("menuToggle");
            const navLinks = document.getElementById("navLinks");
            
            navbar.classList.remove("mobile-open");
            navLinks.classList.remove("open");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });

    // Fix View Projects button functionality
    const viewProjectsBtn = document.querySelector('.view-projects-btn');
    if (viewProjectsBtn) {
        // Add both click and touchstart events
        ['click', 'touchstart'].forEach(eventType => {
            viewProjectsBtn.addEventListener(eventType, function(e) {
                e.preventDefault();
                
                const projectsSection = document.querySelector('#projects');
                if (projectsSection) {
                    // Calculate offset based on device
                    const isMobile = window.innerWidth <= 768;
                    const offset = isMobile ? 80 : 60;
                    
                    // Calculate target position
                    const targetPosition = projectsSection.offsetTop - offset;

                    // Smooth scroll to projects section
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbar = document.querySelector('.navbar');
                    const menuToggle = document.getElementById('menuToggle');
                    if (navbar && navbar.classList.contains('mobile-open')) {
                        navbar.classList.remove('mobile-open');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        document.body.style.overflow = '';
                    }

                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#projects') {
                            link.classList.add('active');
                        }
                    });
                }
            }, { passive: false });
        });
    }
});

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

  // Using EmailJS
  emailjs.sendForm('service_kf61skd', 'template_h7oe699', this)
      .then(() => {
          showCustomAlert('Message sent successfully! Thank you for contacting.', 'success');
          this.reset();
      }, (error) => {
          showCustomAlert('Failed to send message. Please try again.', 'error');
      })
      .finally(() => {
          submitBtn.textContent = 'Send message';
          submitBtn.disabled = false;
      });
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
    // Check if file exists first
    fetch('Talha.resume.pdf')
        .then(response => {
            if (response.ok) {
                showCustomAlert('Downloading resume...', 'success');
                window.location.href = 'Talha.resume.pdf';
            } else {
                showCustomAlert('Resume file not available.', 'error');
            }
        })
        .catch(() => {
            showCustomAlert('Failed to download resume.', 'error');
        });
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

function showCustomAlert(message, type = 'success') {
    const alertEl = document.getElementById('customAlert');
    const messageEl = alertEl.querySelector('.alert-message');
    
    // Set message and type
    messageEl.textContent = message;
    alertEl.classList.remove('success', 'error');
    alertEl.classList.add(type);
    
    // Show alert
    alertEl.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        alertEl.classList.remove('show');
    }, 3000);
    
    // Close button functionality
    const closeBtn = alertEl.querySelector('.alert-close');
    closeBtn.onclick = () => alertEl.classList.remove('show');
}


