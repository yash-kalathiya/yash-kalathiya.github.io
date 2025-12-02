/**
 * YASH KALATHIYA — PORTFOLIO
 * Next-Level Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initSmoothScroll();
    initScrollReveal();
    initTypingEffect();
    initMobileMenu();
    initParallaxOrbs();
});

/* Header Scroll Effect */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* Smooth Scroll */
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
                
                // Close mobile menu if open
                document.body.classList.remove('menu-open');
            }
        });
    });
}

/* Scroll Reveal Animation */
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
    
    // Add reveal class and observe elements
    const revealElements = document.querySelectorAll(
        '.project-card, .exp-card, .stat, .skill-group, .section-header, .about-text, .about-skills'
    );
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index % 4 * 0.1}s`;
        observer.observe(el);
    });
}

// Add revealed class styles
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

/* Typing Effect for Terminal */
function initTypingEffect() {
    const terminal = document.querySelector('.terminal-body pre');
    if (!terminal) return;
    
    const originalHTML = terminal.innerHTML;
    const textContent = terminal.textContent;
    
    terminal.innerHTML = '';
    terminal.style.opacity = '1';
    
    let charIndex = 0;
    const typingSpeed = 20;
    
    function type() {
        if (charIndex < textContent.length) {
            terminal.textContent += textContent[charIndex];
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Restore syntax highlighting
            terminal.innerHTML = originalHTML;
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

/* Mobile Menu */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!toggle) return;
    
    // Create mobile menu overlay
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = navLinks.innerHTML;
    document.body.appendChild(mobileMenu);
    
    // Add styles for mobile menu
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
        
        .mobile-menu.open {
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu a {
            font-size: 1.5rem;
            color: var(--text-secondary);
            transition: color 0.2s ease;
        }
        
        .mobile-menu a:hover {
            color: var(--text);
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
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
    
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* Parallax Orbs */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    if (!orbs.length || window.innerWidth < 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let orbPositions = Array.from(orbs).map(() => ({ x: 0, y: 0 }));
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function animate() {
        orbs.forEach((orb, index) => {
            const speed = 0.02 + (index * 0.01);
            const range = 30 + (index * 10);
            
            orbPositions[index].x += (mouseX * range - orbPositions[index].x) * speed;
            orbPositions[index].y += (mouseY * range - orbPositions[index].y) * speed;
            
            orb.style.transform = `translate(${orbPositions[index].x}px, ${orbPositions[index].y}px)`;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/* Counter Animation for Stats */
function animateCounters() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[\d.]/g, '');
        const hasDecimal = text.includes('.');
        
        let current = 0;
        const duration = 2000;
        const increment = number / (duration / 16);
        
        function update() {
            current += increment;
            if (current < number) {
                if (hasDecimal) {
                    stat.textContent = current.toFixed(1) + suffix;
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
                requestAnimationFrame(update);
            } else {
                stat.textContent = text;
            }
        }
        
        // Start animation when visible
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                update();
                observer.disconnect();
            }
        });
        
        observer.observe(stat);
    });
}

// Initialize counter animation
animateCounters();

/* Magnetic Buttons */
document.querySelectorAll('.btn-primary, .contact-social a').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

/* Project Card Tilt Effect */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 8;
        const tiltY = (x - 0.5) * -8;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* Cursor Glow Effect */
(function initCursorGlow() {
    if (window.innerWidth < 768) return;
    
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    
    const glowStyles = document.createElement('style');
    glowStyles.textContent = `
        .cursor-glow {
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(glowStyles);
    
    let glowX = 0;
    let glowY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        glowX = e.clientX;
        glowY = e.clientY;
    });
    
    function animateGlow() {
        currentX += (glowX - currentX) * 0.1;
        currentY += (glowY - currentY) * 0.1;
        
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        
        requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
})();

/* Console Easter Egg */
console.log(`
%c YASH KALATHIYA 
%c Data Engineer & AI/ML Enthusiast

📧 yashkalathiya164@gmail.com
💼 linkedin.com/in/yash-kalathiya
🐙 github.com/yash-kalathiya

Thanks for checking out my portfolio!
`, 
'font-size: 24px; font-weight: bold; color: #00d4ff;',
'font-size: 14px; color: #888;'
);
