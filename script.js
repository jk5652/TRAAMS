
// ===========================
// TRAAMS GLOBAL PROPERTY - JAVASCRIPT
// ===========================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // NAVIGATION FUNCTIONALITY
    // ===========================
    
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================
    // SCROLL ANIMATIONS
    // ===========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // ===========================
    // PROPERTY CARDS INTERACTION
    // ===========================
    
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('click', function() {
            const propertyTitle = this.querySelector('.property-title').textContent;
            const propertyPrice = this.querySelector('.property-price').textContent;
            
            // Show alert with property details (in a real application, this would open a modal or navigate to a detail page)
            alert(`You clicked on:\
${propertyTitle}\
Price: ${propertyPrice}\
\
In a full application, this would show detailed property information.`);
        });
        
        // Add hover effect for property image
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('.property-image');
            image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('.property-image');
            image.style.transform = 'scale(1)';
        });
    });
    
    // ===========================
    // CONTACT FORM HANDLING
    // ===========================
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // In a real application, this would send data to a server
        console.log('Form submitted:', { name, email, phone, message });
        
        // Show success message
        alert(`Thank you, ${name}! Your message has been received.\
\
We'll get back to you at ${email} as soon as possible.`);
        
        // Reset form
        contactForm.reset();
        
        // Add visual feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent! \u2713';
        submitButton.style.background = '#4f8a6d';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    });
    
    // ===========================
    // SCROLL TO TOP BUTTON
    // ===========================
    
    const scrollTopButton = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===========================
    // STATISTICS COUNTER ANIMATION
    // ===========================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounter(element) {
        const target = element.textContent;
        const isPercentage = target.includes('%');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        const duration = 2000; // 2 seconds
        const increment = numericValue / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            
            if (isPercentage) {
                element.textContent = Math.floor(current) + '%';
            } else if (target.includes('+')) {
                element.textContent = Math.floor(current).toLocaleString() + '+';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }
    
    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ===========================
    // SERVICE CARDS INTERACTION
    // ===========================
    
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceTitle = this.querySelector('h3').textContent;
            const serviceDescription = this.querySelector('p').textContent;
            
            // In a real application, this would show more details or navigate to a service page
            console.log('Service clicked:', serviceTitle);
            
            // Add a subtle scale effect on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // ===========================
    // DYNAMIC YEAR IN FOOTER
    // ===========================
    
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = footerText.innerHTML.replace('2025', currentYear);
    }
    
    // ===========================
    // PARALLAX EFFECT FOR HERO
    // ===========================
    
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // ===========================
    // PROPERTY FILTER (PLACEHOLDER)
    // ===========================
    
    // This is a placeholder for future property filtering functionality
    function filterProperties(type) {
        const properties = document.querySelectorAll('.property-card');
        
        properties.forEach(property => {
            const badge = property.querySelector('.property-badge').textContent;
            
            if (type === 'all' || badge.toLowerCase().includes(type.toLowerCase())) {
                property.style.display = 'block';
                setTimeout(() => {
                    property.style.opacity = '1';
                    property.style.transform = 'translateY(0)';
                }, 100);
            } else {
                property.style.opacity = '0';
                property.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    property.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // ===========================
    // LOADING ANIMATION
    // ===========================
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===========================
    // KEYBOARD NAVIGATION
    // ===========================
    
    document.addEventListener('keydown', function(e) {
        // Press 'Escape' to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // ===========================
    // CONSOLE WELCOME MESSAGE
    // ===========================
    
    console.log('%c Welcome to Traams Global Property! ', 'background: #1a4d2e; color: #d4af37; font-size: 20px; padding: 10px;');
    console.log('%c Find your dream property with us! ', 'background: #4f8a6d; color: white; font-size: 14px; padding: 5px;');
    
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}
