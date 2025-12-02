/**
 * YASH KALATHIYA — MERGED PORTFOLIO
 * Best of Both Worlds: Particles + Interactive
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCustomCursor();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initCounters();
    initTypingEffect();
    initParallaxOrbs();
    initTiltCards();
    initCommandPalette();
    initKeyboardShortcuts();
});

/* ==========================================
   PARTICLES BACKGROUND
   ========================================== */
function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: { enable: true, value_area: 800 }
            },
            color: { value: '#6366f1' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1 }
            },
            size: {
                value: 3,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1 }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6366f1',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

/* ==========================================
   CUSTOM CURSOR
   ========================================== */
function initCustomCursor() {
    if (window.innerWidth < 768) return;
    
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;
    
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-item, .exp-card, .cmd-item');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    
    function animate() {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ==========================================
   MOBILE MENU
   ========================================== */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = navLinks.innerHTML;
    document.body.appendChild(mobileMenu);
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* ==========================================
   SCROLL REVEAL
   ========================================== */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });
    
    document.querySelectorAll('.project-card, .exp-card, .skill-category, .section-header, .about-content, .contact-content, .achievement-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i % 4 * 0.1}s`;
        observer.observe(el);
    });
}

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                const isDecimal = String(target).includes('.');
                const duration = 2000;
                let start = null;
                
                function animate(timestamp) {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = target * easeOut;
                    
                    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = isDecimal ? target.toFixed(1) : target;
                    }
                }
                
                requestAnimationFrame(animate);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

/* ==========================================
   TYPING EFFECT
   ========================================== */
function initTypingEffect() {
    const codeBlock = document.querySelector('.code-block code');
    if (!codeBlock) return;
    
    const originalHTML = codeBlock.innerHTML;
    const text = codeBlock.textContent;
    codeBlock.innerHTML = '<span class="typing-cursor">|</span>';
    
    // Add cursor style
    const style = document.createElement('style');
    style.textContent = `
        .typing-cursor {
            animation: cursorBlink 0.8s infinite;
            color: var(--accent-primary);
        }
        @keyframes cursorBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    let i = 0;
    function type() {
        if (i < text.length) {
            codeBlock.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
            i++;
            setTimeout(type, text[i-1] === '\n' ? 100 : 25);
        } else {
            setTimeout(() => {
                codeBlock.innerHTML = originalHTML;
            }, 500);
        }
    }
    
    setTimeout(type, 1000);
}

/* ==========================================
   PARALLAX ORBS
   ========================================== */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    if (!orbs.length || window.innerWidth < 768) return;
    
    let mouseX = 0, mouseY = 0;
    let positions = Array.from(orbs).map(() => ({ x: 0, y: 0 }));
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        orbs.forEach((orb, i) => {
            const speed = 0.02 + i * 0.01;
            const range = 30 + i * 15;
            
            positions[i].x += (mouseX * range - positions[i].x) * speed;
            positions[i].y += (mouseY * range - positions[i].y) * speed;
            
            orb.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================
   TILT CARDS
   ========================================== */
function initTiltCards() {
    if (window.innerWidth < 768) return;
    
    document.querySelectorAll('.project-card, .exp-card, .skill-category').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 8;
            const tiltY = (x - 0.5) * -8;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ==========================================
   COMMAND PALETTE
   ========================================== */
function initCommandPalette() {
    const palette = document.getElementById('cmdPalette');
    const input = document.getElementById('cmdInput');
    const results = document.getElementById('cmdResults');
    const trigger = document.querySelector('.cmd-trigger');
    const overlay = palette?.querySelector('.cmd-overlay');
    
    if (!palette || !input) return;
    
    let activeIndex = 0;
    
    function openPalette() {
        palette.classList.add('open');
        input.focus();
        input.value = '';
        filterCommands('');
        document.body.style.overflow = 'hidden';
    }
    
    function closePalette() {
        palette.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    function filterCommands(query) {
        const groups = results.querySelectorAll('.cmd-group');
        query = query.toLowerCase();
        
        groups.forEach(group => {
            let hasVisible = false;
            group.querySelectorAll('.cmd-item').forEach(item => {
                const text = item.querySelector('span').textContent.toLowerCase();
                const matches = text.includes(query);
                item.style.display = matches ? 'flex' : 'none';
                if (matches) hasVisible = true;
            });
            group.style.display = hasVisible ? 'block' : 'none';
        });
        
        activeIndex = 0;
        updateActiveItem();
    }
    
    function updateActiveItem() {
        const items = [...results.querySelectorAll('.cmd-item')].filter(
            item => item.style.display !== 'none'
        );
        items.forEach((item, i) => item.classList.toggle('active', i === activeIndex));
    }
    
    function executeCommand(item) {
        const action = item.dataset.action;
        
        switch (action) {
            case 'scroll':
                closePalette();
                const target = document.querySelector(item.dataset.target);
                if (target) {
                    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
                }
                break;
            case 'link':
                window.open(item.dataset.url, '_blank');
                closePalette();
                break;
            case 'email':
                window.location.href = 'mailto:yashkalathiya164@gmail.com';
                closePalette();
                break;
            case 'copy':
                navigator.clipboard.writeText(item.dataset.value);
                showToast('Email copied to clipboard!');
                closePalette();
                break;
            case 'theme':
                const theme = item.dataset.theme;
                document.body.className = theme === 'default' ? '' : `theme-${theme}`;
                showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme activated!`);
                closePalette();
                break;
        }
    }
    
    // Events
    trigger?.addEventListener('click', openPalette);
    overlay?.addEventListener('click', closePalette);
    input.addEventListener('input', (e) => filterCommands(e.target.value));
    
    input.addEventListener('keydown', (e) => {
        const items = [...results.querySelectorAll('.cmd-item')].filter(
            item => item.style.display !== 'none'
        );
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = (activeIndex + 1) % items.length;
            updateActiveItem();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = (activeIndex - 1 + items.length) % items.length;
            updateActiveItem();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (items[activeIndex]) executeCommand(items[activeIndex]);
        } else if (e.key === 'Escape') {
            closePalette();
        }
    });
    
    results.querySelectorAll('.cmd-item').forEach(item => {
        item.addEventListener('click', () => executeCommand(item));
    });
    
    // Cmd+K to toggle
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            palette.classList.contains('open') ? closePalette() : openPalette();
        }
    });
}

/* ==========================================
   TOAST
   ========================================== */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast) return;
    
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ==========================================
   KEYBOARD SHORTCUTS
   ========================================== */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        
        const shortcuts = {
            'h': '#hero',
            'a': '#about',
            'e': '#experience',
            'p': '#projects',
            's': '#skills',
            'c': '#contact'
        };
        
        if (shortcuts[e.key]) {
            document.querySelector(shortcuts[e.key])?.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'g') {
            window.open('https://github.com/yash-kalathiya', '_blank');
        } else if (e.key === 'l') {
            window.open('https://linkedin.com/in/yashkalathiya', '_blank');
        } else if (e.key === 'm') {
            window.location.href = 'mailto:yashkalathiya164@gmail.com';
        }
    });
}

/* ==========================================
   CONSOLE EASTER EGG
   ========================================== */
console.log(`
%c╔═══════════════════════════════════════╗
%c║     YASH KALATHIYA                    ║
%c║     AI/ML Engineer                    ║
%c╚═══════════════════════════════════════╝

%c🚀 Welcome, curious developer!

%c📧 yashkalathiya164@gmail.com
%c💼 linkedin.com/in/yashkalathiya
%c🐙 github.com/yash-kalathiya

%c⌨️  Keyboard Shortcuts:
%c   ⌘/Ctrl + K → Command Palette
%c   H → Home | A → About | E → Experience
%c   P → Projects | S → Skills | C → Contact
%c   G → GitHub | L → LinkedIn | M → Email
`,
'color: #6366f1; font-weight: bold',
'color: #8b5cf6',
'color: #06b6d4',
'color: #6366f1; font-weight: bold',
'font-size: 14px',
'color: #6366f1',
'color: #6366f1',
'color: #6366f1',
'color: #888',
'color: #666',
'color: #666',
'color: #666',
'color: #666'
);
