const VALID_SECTIONS = ['hero','about','experience','skills','projects','impact','certifications','academics','contact'];
let isTransitioning = false;
let typingTimeout = null;

function isValidSection(id) {
    return VALID_SECTIONS.includes(id);
}

function showSection(sectionId) {
    if (isTransitioning) return;

    // Validate before touching history – prevents blank page on invalid hash
    if (!isValidSection(sectionId)) {
        sectionId = 'hero';
        if (location.hash !== '#hero') history.replaceState(null, '', '#hero');
    } else if (location.hash !== '#' + sectionId) {
        history.pushState(null, '', '#' + sectionId);
    }

    const loader = document.getElementById('pageLoader');
    const current = document.querySelector('.content-section.active-section, #hero.active-section');

    // Already on target – just highlight nav, no reload
    if (current && current.id === sectionId) {
        updateActiveNav(sectionId);
        return;
    }

    if (current) {
        const isFromHero = current.id === 'hero';
        const delay = isFromHero ? 200 : 300;
        if (!isFromHero) {
            current.style.opacity = '0';
            current.style.transform = 'translateY(10px)';
        }
        loader.classList.add('active');
        isTransitioning = true;
        setTimeout(() => {
            switchSection(sectionId);
            loader.classList.remove('active');
            isTransitioning = false;
        }, delay);
    } else {
        switchSection(sectionId);
    }
}

function switchSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const hero = document.getElementById('hero');

    sections.forEach(sec => { sec.style.display = 'none'; sec.classList.remove('active-section'); });
    if (hero) { hero.style.display = 'none'; hero.classList.remove('active-section'); }

    const activeSection = document.getElementById(sectionId);
    if (!activeSection) {
        // Fallback – should never happen due to validation, but guard blank page
        const fallback = document.getElementById('hero');
        if (fallback) {
            fallback.style.display = 'flex';
            fallback.classList.add('active-section');
            updateActiveNav('hero');
        }
        return;
    }

    if (sectionId === 'hero') {
        activeSection.style.display = 'flex';
        if (!typingDone && !typingTimeout) typing();
        typeFloatCards();
        animateStats();
        resumeParticles();
    } else {
        activeSection.style.display = 'block';
        animateIn(activeSection);
        pauseParticles();
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
    setTimeout(() => activeSection.classList.remove('section-enter'), 450);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateActiveNav(sectionId);
}

function updateActiveNav(sectionId) {
    document.querySelectorAll('nav a').forEach(a => {
        a.classList.remove('active');
        a.setAttribute('aria-current', 'false');
        if (a.getAttribute('href') === '#' + sectionId) {
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        }
    });
    document.querySelectorAll('.dot-nav .dot').forEach(d => {
        const isActive = d.dataset.section === sectionId;
        d.classList.toggle('active', isActive);
        d.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
}

// ── Animate section items on reveal ─────────
function animateIn(section) {
    const items = section.querySelectorAll(
        '.project-card, .skill-group, .contact-card, .timeline-item, .cert-highlight-card, .about-grid, .exp-card, .content-card, .milestone-card, .testi-card, .filter-bar'
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
    // Guard duplicate chains
    if (typingTimeout) clearTimeout(typingTimeout);
    if (typingDone) return;

    function typeNext() {
        if (charIndex < typingText.length) {
            el.textContent += typingText.charAt(charIndex);
            charIndex++;
            typingTimeout = setTimeout(typeNext, 80);
        } else {
            typingDone = true;
            typingTimeout = null;
            el.classList.add('cursor-done');
        }
    }
    typeNext();
}

// ── Floating cards typing animation ──────────
let cardsTypingStarted = false;

function typeFloatCards() {
    const wrap = document.querySelector('.hero-side-cards');
    if (!wrap || cardsTypingStarted) return;
    cardsTypingStarted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const data = Array.from(wrap.querySelectorAll('.float-card')).map(card => {
        const title = card.querySelector('.fc-title');
        const sub = card.querySelector('.fc-sub');
        return {
            card,
            title,
            sub,
            titleText: title.textContent.trim(),
            subText: sub.textContent.trim()
        };
    });

    wrap.classList.add('typing-mode');
    data.forEach(d => {
        d.title.textContent = '';
        d.sub.textContent = '';
    });

    let finished = 0;
    data.forEach((d, i) => {
        setTimeout(() => {
            d.card.classList.add('typing-start');
            let ci = 0;
            d.title.classList.add('typing');
            const titleTimer = setInterval(() => {
                ci++;
                d.title.textContent = d.titleText.slice(0, ci);
                if (ci >= d.titleText.length) {
                    clearInterval(titleTimer);
                    d.title.classList.remove('typing');
                    let si = 0;
                    d.sub.classList.add('typing');
                    const subTimer = setInterval(() => {
                        si++;
                        d.sub.textContent = d.subText.slice(0, si);
                        if (si >= d.subText.length) {
                            clearInterval(subTimer);
                            d.sub.classList.remove('typing');
                            finished++;
                            if (finished === data.length) wrap.classList.remove('typing-mode');
                        }
                    }, 30);
                }
            }, 45);
        }, 400 + i * 600);
    });
}

// ── Certification toggle ──────────────────────
function toggleCert(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const btn = document.querySelector(`button[aria-controls="${id}"]`) || el.previousElementSibling;
    const isOpen = el.classList.contains('open') || el.style.display === 'block';

    // Close all first
    document.querySelectorAll('.cert-list').forEach(list => {
        list.style.display = 'none';
        list.classList.remove('open');
    });
    document.querySelectorAll('.cert-toggle').forEach(b => {
        b.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
        el.style.display = 'block';
        el.classList.add('open');
        if (btn) {
            btn.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    }
}

// ── Mobile nav ────────────────────────────────
function closeMobileMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.getElementById('navToggle');
    if (menu) menu.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

document.addEventListener('DOMContentLoaded', () => {
    // Nav toggle (hamburger)
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== navToggle && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Throttled scroll handler (single RAF) for header / backToTop / progress
    const header = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.setAttribute('aria-hidden', 'true');
    document.body.prepend(progressBar);

    let ticking = false;
    function onScroll() {
        if (header) header.classList.toggle('scrolled', window.scrollY > 20);
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
        ticking = false;
    }
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // Back to top click handler (replaces inline onclick)
    if (backToTop) {
        backToTop.addEventListener('click', () => showSection('hero'));
    }

    // Footer year
    const footerYear = document.getElementById('footerYear');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // Contact form success message after FormSubmit redirect
    const params = new URLSearchParams(location.search);
    if (params.get('sent') === '1') {
        const status = document.getElementById('formStatus');
        if (status) {
            status.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
            status.hidden = false;
            status.classList.add('success');
        }
        params.delete('sent');
        const cleanQuery = params.toString();
        try {
            history.replaceState(null, '', location.pathname + (cleanQuery ? '?' + cleanQuery : '') + location.hash);
        } catch (e) { /* file:// URLs may disallow history updates */ }
    }

    // Contact form submit feedback (prevent double submits)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        contactForm.addEventListener('submit', () => {
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';
            }
        });
        window.addEventListener('pageshow', () => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane" aria-hidden="true"></i>';
            }
        });
    }

    // Active nav link highlight on click (any nav link)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelectorAll('nav a').forEach(a => { a.classList.remove('active'); a.setAttribute('aria-current','false'); });
            this.classList.add('active');
            this.setAttribute('aria-current','page');
        });
    });

    // Hash routing - back/forward support (validate)
    window.addEventListener('hashchange', () => {
        const id = location.hash.slice(1) || 'hero';
        showSection(isValidSection(id) ? id : 'hero');
    });

    // ── Section dot navigation ─────────────────
    const SECTION_LABELS = {
        hero: 'Home', about: 'About', experience: 'Experience', skills: 'Skills',
        projects: 'Projects', impact: 'Impact', certifications: 'Certifications',
        academics: 'Academics', contact: 'Contact'
    };
    const dotNav = document.getElementById('dotNav');
    if (dotNav) {
        VALID_SECTIONS.forEach(id => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'dot';
            dot.dataset.section = id;
            dot.title = SECTION_LABELS[id];
            dot.setAttribute('aria-label', 'Go to ' + SECTION_LABELS[id]);
            dot.addEventListener('click', () => showSection(id));
            dotNav.appendChild(dot);
        });
    }

    // ── Keyboard section navigation ────────────
    function getCurrentSectionIndex() {
        const hash = location.hash.slice(1) || 'hero';
        const idx = VALID_SECTIONS.indexOf(hash);
        return idx === -1 ? 0 : idx;
    }

    function navigateSection(direction) {
        const idx = getCurrentSectionIndex();
        const next = (idx + direction + VALID_SECTIONS.length) % VALID_SECTIONS.length;
        showSection(VALID_SECTIONS[next]);
    }

    document.addEventListener('keydown', (e) => {
        // Ignore when typing in inputs
        if (e.target.matches('input, textarea, [contenteditable]')) return;
        // Skip arrow nav when lightbox or mobile menu is open
        const lb = document.getElementById('lightbox');
        const menu = document.getElementById('navMenu');
        if ((lb && lb.classList.contains('open')) || (menu && menu.classList.contains('open'))) return;
        if (e.key === 'ArrowLeft') { navigateSection(-1); }
        if (e.key === 'ArrowRight') { navigateSection(1); }
    });

    // Start app - typing is deferred until hero is shown
    const initialSection = location.hash.slice(1) || 'hero';
    showSection(isValidSection(initialSection) ? initialSection : 'hero');

    // ── Lightbox for certificate images ─────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    document.querySelectorAll('.cert-list a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                if (lightboxImg && lightbox) {
                    lightboxImg.src = this.getAttribute('href');
                    lightboxImg.alt = this.textContent.trim();
                    lightbox.classList.add('open');
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    if (lightboxImg) {
        lightboxImg.addEventListener('click', (e) => e.stopPropagation());
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ── Particles ────────────────────────────────
    const canvas = document.getElementById('particles-canvas');
    let particles = [];
    let animId = null;
    let particlesPaused = false;

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    if (canvas) {
        const ctx = canvas.getContext('2d');

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
            if (particlesPaused) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            animId = requestAnimationFrame(animateParticles);
        }

        // Expose pause/resume for section switching
        window.pauseParticles = function() {
            particlesPaused = true;
            if (animId) { cancelAnimationFrame(animId); animId = null; }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        window.resumeParticles = function() {
            if (!particlesPaused) return;
            particlesPaused = false;
            animateParticles();
        };

        function onResize() {
            resizeCanvas();
            initParticles();
            if (!particlesPaused && !animId) animateParticles();
        }

        // Debounced resize
        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(onResize, 150);
        });

        resizeCanvas();
        initParticles();
        animateParticles();

        // Pause if user prefers reduced motion
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            pauseParticles();
        }

        // Visibility change – pause when tab hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (animId) { cancelAnimationFrame(animId); animId = null; }
            } else if (!particlesPaused && !animId) {
                animateParticles();
            }
        });
    } else {
        window.pauseParticles = function(){};
        window.resumeParticles = function(){};
    }

});

// Fallbacks for particles if canvas missing (no-op)
if (typeof window !== 'undefined' && !window.pauseParticles) { window.pauseParticles = function(){}; }
if (typeof window !== 'undefined' && !window.resumeParticles) { window.resumeParticles = function(){}; }

// ── Animated counters ──────────────────────────
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    const counters = document.querySelectorAll('#heroStats .stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target, 10);
        if (isNaN(target)) return;
        const suffix = counter.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 30));
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(interval);
            } else {
                counter.textContent = current + suffix;
            }
        }, 40);
    });
}

// ── Project filtering ────────────────────────
function filterProjects(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    const cards = document.querySelectorAll('#projectGrid .project-card');
    let visible = 0;
    cards.forEach((card, i) => {
        const show = category === 'all' || card.dataset.category === category;
        if (show) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, visible * 80);
            visible++;
        } else {
            card.style.display = 'none';
        }
    });
}

// ── Lightbox close ──────────────────────────
function closeLightbox() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lb) {
        lb.classList.remove('open');
        lb.setAttribute('aria-hidden', 'true');
    }
    if (img) img.src = '';
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lb = document.getElementById('lightbox');
        if (lb && lb.classList.contains('open')) closeLightbox();
        const menu = document.getElementById('navMenu');
        if (menu && menu.classList.contains('open')) closeMobileMenu();
    }
});
