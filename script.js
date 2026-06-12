/* ============================================
   HIMANSHU RATHI PORTFOLIO — script.js
   ============================================ */

// ── Section visibility ──────────────────────
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const hero = document.getElementById('hero');

    sections.forEach(sec => sec.style.display = 'none');
    hero.style.display = 'none';

    const activeSection = document.getElementById(sectionId);
    if (!activeSection) return;

    if (sectionId === 'hero') {
        activeSection.style.display = 'flex';
    } else {
        activeSection.style.display = 'block';
        // Animate cards in on reveal
        animateIn(activeSection);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update active nav link
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + sectionId) {
            a.classList.add('active');
        }
    });
}

// ── Animate section items on reveal ─────────
function animateIn(section) {
    const items = section.querySelectorAll(
        '.project-card, .skill-group, .contact-card, .timeline-item, .cert-highlight-card, .about-grid'
    );
    items.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 80);
    });
}

// ── Typing animation ─────────────────────────
const typingText = "HIMANSHU SHAILESH RATHI";
let charIndex = 0;
let typingDone = false;

function typing() {
    const el = document.getElementById('typing');
    if (!el) return;
    if (charIndex < typingText.length) {
        el.textContent += typingText.charAt(charIndex);
        charIndex++;
        setTimeout(typing, 80);
    } else {
        typingDone = true;
        // Start cursor blink after done
        el.classList.add('cursor-done');
    }
}

// ── Certification toggle ──────────────────────
function toggleCert(id) {
    const el = document.getElementById(id);
    const btn = el.previousElementSibling;
    const isOpen = el.style.display === 'block';

    // Close all first
    document.querySelectorAll('.cert-list').forEach(list => {
        list.style.display = 'none';
    });
    document.querySelectorAll('.cert-toggle').forEach(b => {
        b.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
        el.style.display = 'block';
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }
}

// ── Mobile nav ────────────────────────────────
function closeMobileMenu() {
    const menu = document.getElementById('navMenu');
    if (menu) menu.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
    // Nav toggle (hamburger)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Navbar scroll shrink
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }
    });

    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 300);
        });
    }

    // Active nav link highlight on click (any nav link)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Start app
    typing();
    showSection('hero');
});
