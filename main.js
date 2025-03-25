// Main JavaScript file for portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Add 3D tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = mouseY * -0.05;
            const rotateY = mouseX * 0.05;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Add particle background effect
    function createParticles() {
        const particlesContainer = document.querySelector('.hero');
        if (!particlesContainer) return;
        
        particlesContainer.classList.add('particles-bg');
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 5px and 20px
            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration between 10s and 30s
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `floating ${duration}s ease-in-out infinite`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();

    // Add morphing shape to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const morphShape = document.createElement('div');
        morphShape.className = 'morph-shape';
        morphShape.style.position = 'absolute';
        morphShape.style.width = '500px';
        morphShape.style.height = '500px';
        morphShape.style.background = 'rgba(74, 107, 175, 0.05)';
        morphShape.style.zIndex = '-1';
        morphShape.style.right = '-250px';
        morphShape.style.bottom = '-250px';
        
        heroSection.appendChild(morphShape);
    }

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const highlightSpan = heroTitle.querySelector('.highlight');
        const highlightText = highlightSpan ? highlightSpan.textContent : '';
        
        let displayText = originalText.replace(`<span class="highlight">${highlightText}</span>`, '');
        let highlightIndex = displayText.length;
        
        heroTitle.innerHTML = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < displayText.length + highlightText.length) {
                if (charIndex < displayText.length) {
                    heroTitle.innerHTML += displayText.charAt(charIndex);
                } else if (charIndex === displayText.length) {
                    heroTitle.innerHTML += `<span class="highlight">`;
                } else {
                    const span = heroTitle.querySelector('.highlight');
                    span.textContent += highlightText.charAt(charIndex - displayText.length);
                }
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.innerHTML += '</span>';
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Add parallax effect to sections
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = scrollPosition - sectionTop;
            
            if (distance < 600 && distance > -600) {
                const parallaxElements = section.querySelectorAll('.parallax-element');
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.2;
                    element.style.transform = `translateY(${distance * speed}px)`;
                });
            }
        });
    });

    // Add skill bar animation
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    // Trigger skill bar animation when about section is in view
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(aboutSection);
    }

    // Form submission handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                alert('Thank you for your message! This is a demo form, so no actual message was sent.');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }
});

// Add CSS class for burger menu toggle
document.querySelector('.burger')?.addEventListener('click', function() {
    this.classList.toggle('toggle');
});

// Add CSS for toggle animation
document.head.insertAdjacentHTML('beforeend', `
<style>
.burger.toggle .line1 {
    transform: rotate(-45deg) translate(-5px, 6px);
}
.burger.toggle .line2 {
    opacity: 0;
}
.burger.toggle .line3 {
    transform: rotate(45deg) translate(-5px, -6px);
}
.scroll-top-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
}
.scroll-top-btn.show {
    opacity: 1;
    visibility: visible;
}
.scroll-top-btn:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
}
</style>
`);
