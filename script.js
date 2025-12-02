/**
 * YASH KALATHIYA — PORTFOLIO
 * Next-Level Interactive Experience
 */

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initHeaderScroll();
    initSmoothScroll();
    initScrollReveal();
    initTypingEffect();
    initMobileMenu();
    initParallaxOrbs();
    initCommandPalette();
    initMagneticButtons();
    initTiltCards();
    initTextScramble();
    animateCounters();
    initKeyboardShortcuts();
});

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
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tags span, .cmd-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    
    function animate() {
        // Smooth follow for dot
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        
        // Slower follow for ring
        ringX += (mouseX - ringX) * 0.1;
        ringY += (mouseY - ringY) * 0.1;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ==========================================
   HEADER SCROLL
   ========================================== */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   SCROLL REVEAL
   ========================================== */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll(
        '.project-card, .exp-card, .stat, .skill-group, .section-header, .about-text, .about-skills, .achievement'
    );
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index % 6 * 0.08}s`;
        observer.observe(el);
    });
    
    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
}

/* ==========================================
   TYPING EFFECT
   ========================================== */
function initTypingEffect() {
    const terminal = document.querySelector('.terminal-body pre');
    if (!terminal) return;
    
    const originalHTML = terminal.innerHTML;
    terminal.innerHTML = '<span class="typing-cursor">|</span>';
    
    const code = `class AIEngineer:
    def __init__(self):
        self.name = "Yash Kalathiya"
        self.focus = [
            "RAG & GraphRAG",
            "Vision-Language Models",
            "MLOps & Edge AI",
        ]
        self.currently = "building cool stuff"
    
    def solve(self, problem):
        return self.innovate(problem) # ✨`;
    
    let i = 0;
    const speed = 25;
    
    function type() {
        if (i < code.length) {
            const char = code[i];
            terminal.innerHTML = code.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
            i++;
            setTimeout(type, char === '\n' ? 100 : speed);
        } else {
            // Add syntax highlighting after typing complete
            setTimeout(() => {
                terminal.innerHTML = originalHTML;
            }, 500);
        }
    }
    
    // Add cursor blink style
    const style = document.createElement('style');
    style.textContent = `
        .typing-cursor {
            animation: blink 0.7s infinite;
            color: var(--accent);
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Start typing after a delay
    setTimeout(type, 800);
}

/* ==========================================
   MOBILE MENU
   ========================================== */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle || !navLinks) return;
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = navLinks.innerHTML;
    document.body.appendChild(mobileMenu);
    
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(5, 5, 5, 0.98);
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 32px;
            z-index: 99;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .mobile-menu.open { opacity: 1; visibility: visible; }
        .mobile-menu a {
            font-size: 1.5rem;
            color: var(--text-secondary);
            transition: color 0.2s ease;
        }
        .mobile-menu a:hover { color: var(--text); }
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        .mobile-toggle.active span:nth-child(2) { opacity: 0; }
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    `;
    document.head.appendChild(mobileStyles);
    
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
   PARALLAX ORBS
   ========================================== */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    if (!orbs.length || window.innerWidth < 768) return;
    
    let mouseX = 0, mouseY = 0;
    let orbPositions = Array.from(orbs).map(() => ({ x: 0, y: 0 }));
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        orbs.forEach((orb, index) => {
            const speed = 0.02 + (index * 0.01);
            const range = 40 + (index * 15);
            
            orbPositions[index].x += (mouseX * range - orbPositions[index].x) * speed;
            orbPositions[index].y += (mouseY * range - orbPositions[index].y) * speed;
            
            orb.style.transform = `translate(${orbPositions[index].x}px, ${orbPositions[index].y}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* ==========================================
   COMMAND PALETTE
   ========================================== */
function initCommandPalette() {
    const palette = document.getElementById('cmdPalette');
    const input = document.getElementById('cmdInput');
    const results = document.getElementById('cmdResults');
    const trigger = document.getElementById('cmdTrigger');
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
        const items = results.querySelectorAll('.cmd-item');
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
        
        // Reset active index
        activeIndex = 0;
        updateActiveItem();
    }
    
    function updateActiveItem() {
        const items = [...results.querySelectorAll('.cmd-item')].filter(
            item => item.style.display !== 'none'
        );
        items.forEach((item, i) => {
            item.classList.toggle('active', i === activeIndex);
        });
    }
    
    function executeCommand(item) {
        const action = item.dataset.action;
        
        switch (action) {
            case 'scroll':
                closePalette();
                const target = document.querySelector(item.dataset.target);
                if (target) {
                    setTimeout(() => {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
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
                document.body.classList.remove('light-mode', 'party-mode');
                if (theme === 'light') {
                    document.body.classList.add('light-mode');
                    showToast('Light mode activated ☀️');
                } else if (theme === 'party') {
                    document.body.classList.add('party-mode');
                    showToast('Party mode! 🎉');
                } else {
                    showToast('Dark mode activated 🌙');
                }
                closePalette();
                break;
        }
    }
    
    // Event listeners
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
            if (items[activeIndex]) {
                executeCommand(items[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            closePalette();
        }
    });
    
    results.querySelectorAll('.cmd-item').forEach(item => {
        item.addEventListener('click', () => executeCommand(item));
    });
    
    // Keyboard shortcut to open
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (palette.classList.contains('open')) {
                closePalette();
            } else {
                openPalette();
            }
        }
    });
}

/* ==========================================
   TOAST NOTIFICATIONS
   ========================================== */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ==========================================
   MAGNETIC BUTTONS
   ========================================== */
function initMagneticButtons() {
    if (window.innerWidth < 768) return;
    
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-ghost, .contact-social a, .nav-cta');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* ==========================================
   TILT CARDS
   ========================================== */
function initTiltCards() {
    if (window.innerWidth < 768) return;
    
    document.querySelectorAll('.project-card, .exp-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ==========================================
   TEXT SCRAMBLE EFFECT
   ========================================== */
function initTextScramble() {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = chars;
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.chars[Math.floor(Math.random() * this.chars.length)];
                        this.queue[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
    }
    
    // Add scramble style
    const style = document.createElement('style');
    style.textContent = `.scramble-char { color: var(--accent); }`;
    document.head.appendChild(style);
    
    // Apply to project titles on hover
    document.querySelectorAll('.project-title').forEach(title => {
        const originalText = title.innerText;
        const fx = new TextScramble(title);
        
        title.parentElement.parentElement.addEventListener('mouseenter', () => {
            fx.setText(originalText);
        });
    });
}

/* ==========================================
   COUNTER ANIMATION
   ========================================== */
function animateCounters() {
    const stats = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const text = stat.textContent;
                const number = parseFloat(text.replace(/[^\d.]/g, ''));
                const suffix = text.replace(/[\d.]/g, '');
                const hasDecimal = text.includes('.');
                const duration = 2000;
                let start = null;
                
                function animate(timestamp) {
                    if (!start) start = timestamp;
                    const progress = Math.min((timestamp - start) / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = number * easeOut;
                    
                    if (hasDecimal) {
                        stat.textContent = current.toFixed(1) + suffix;
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        stat.textContent = text;
                    }
                }
                
                requestAnimationFrame(animate);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

/* ==========================================
   KEYBOARD SHORTCUTS
   ========================================== */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Don't trigger if in input
        if (e.target.tagName === 'INPUT') return;
        
        const key = e.key.toLowerCase();
        
        // Quick navigation
        switch (key) {
            case 'p':
                if (!e.metaKey && !e.ctrlKey) {
                    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                }
                break;
            case 'e':
                document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'a':
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'c':
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'g':
                window.open('https://github.com/yash-kalathiya', '_blank');
                break;
            case 'l':
                window.open('https://linkedin.com/in/yashkalathiya', '_blank');
                break;
            case 'm':
                window.location.href = 'mailto:yashkalathiya164@gmail.com';
                break;
            case 'h':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    });
}

/* ==========================================
   CONSOLE EASTER EGG
   ========================================== */
console.log(`
%c ██╗   ██╗ █████╗ ███████╗██╗  ██╗
%c ╚██╗ ██╔╝██╔══██╗██╔════╝██║  ██║
%c  ╚████╔╝ ███████║███████╗███████║
%c   ╚██╔╝  ██╔══██║╚════██║██╔══██║
%c    ██║   ██║  ██║███████║██║  ██║
%c    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝

%c🚀 Hey there, curious developer!

%c📧 yashkalathiya164@gmail.com
%c💼 linkedin.com/in/yashkalathiya  
%c🐙 github.com/yash-kalathiya

%c⌨️  Keyboard Shortcuts:
%c   Cmd/Ctrl + K  →  Open Command Palette
%c   P  →  Projects  |  E  →  Experience
%c   A  →  About     |  C  →  Contact
%c   G  →  GitHub    |  L  →  LinkedIn
%c   H  →  Go Home   |  M  →  Email Me
`, 
'color: #00d4ff',
'color: #00c4ef',
'color: #00b4df',
'color: #00a4cf',
'color: #0094bf',
'color: #0084af',
'color: #888; font-size: 14px',
'color: #00d4ff',
'color: #00d4ff',
'color: #00d4ff',
'color: #888; font-size: 12px',
'color: #666',
'color: #666',
'color: #666',
'color: #666',
'color: #666'
);
