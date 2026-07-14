function showSection(sectionId) {
    if (location.hash !== '#' + sectionId) {
        history.pushState(null, '', '#' + sectionId);
    }

    const loader = document.getElementById('pageLoader');
    const current = document.querySelector('.content-section.active-section, #hero.active-section');

    if (current && sectionId !== 'hero' && current.id !== 'hero') {
        current.style.opacity = '0';
        current.style.transform = 'translateY(10px)';
        loader.classList.add('active');
        setTimeout(() => {
            switchSection(sectionId);
            loader.classList.remove('active');
        }, 300);
    } else if (current && current.id === 'hero' && sectionId !== 'hero') {
        loader.classList.add('active');
        setTimeout(() => {
            switchSection(sectionId);
            loader.classList.remove('active');
        }, 200);
    } else {
        switchSection(sectionId);
    }
}

function switchSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const hero = document.getElementById('hero');

    sections.forEach(sec => { sec.style.display = 'none'; sec.classList.remove('active-section'); });
    hero.style.display = 'none';
    hero.classList.remove('active-section');

    const activeSection = document.getElementById(sectionId);
    if (!activeSection) return;

    if (sectionId === 'hero') {
        activeSection.style.display = 'flex';
        if (!typingDone) typing();
        animateStats();
    } else {
        activeSection.style.display = 'block';
        animateIn(activeSection);
    }

    activeSection.classList.add('active-section');
    activeSection.style.opacity = '0';
    activeSection.style.transform = 'translateY(10px)';
    activeSection.classList.remove('section-enter');
    void activeSection.offsetWidth;
    activeSection.classList.add('section-enter');
    requestAnimationFrame(() => {
        activeSection.style.opacity = '1';
        activeSection.style.transform = 'translateY(0)';
    });
    setTimeout(() => activeSection.classList.remove('section-enter'), 500);

    window.scrollTo({ top: 0, behavior: 'smooth' });

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
        '.project-card, .skill-group, .contact-card, .timeline-item, .cert-highlight-card, .about-grid, .exp-card, .content-card, .milestone-card'
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

    // Hash routing - back/forward support
    window.addEventListener('hashchange', () => {
        const id = location.hash.slice(1) || 'hero';
        showSection(id);
    });

    // ── Scroll progress bar ───────────────────
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
        const h = document.body.scrollHeight - window.innerHeight;
        progressBar.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
    });

    // Start app - typing is deferred until hero is shown
    const initialSection = location.hash.slice(1) || 'hero';
    showSection(initialSection);

    // ── Lightbox for certificate images ─────────
    document.querySelectorAll('.cert-list a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const img = document.getElementById('lightboxImg');
                img.src = this.getAttribute('href');
                document.getElementById('lightbox').classList.add('open');
            });
        }
    });

    // ── Particles ────────────────────────────────
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.3;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.7 + 0.3;
                this.twinkleSpeed = Math.random() * 0.02 + 0.005;
                this.twinklePhase = Math.random() * Math.PI * 2;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) this.reset();
                this.twinklePhase += this.twinkleSpeed;
            }
            draw() {
                const twinkle = 0.5 + 0.5 * Math.sin(this.twinklePhase);
                const alpha = this.opacity * twinkle;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 8000));
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            animId = requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

});

// ── Animated counters ──────────────────────────
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    const counters = document.querySelectorAll('#heroStats .stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        }, 40);
    });
}

// ── Lightbox close ──────────────────────────
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('open');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lb = document.getElementById('lightbox');
        if (lb.classList.contains('open')) closeLightbox();
    }
});
