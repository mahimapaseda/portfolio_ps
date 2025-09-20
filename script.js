// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Professional Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Add animation classes to elements with staggered effects
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .stat-item, .education-item, .ps-category');
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.classList.add(`animate-delay-${(index % 6) + 1}`);
        observer.observe(el);
    });

    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });

    // Hero text elements with staggered animation
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.classList.add(`animate-delay-${index + 1}`);
    });

    // Professional hero section animations with staggered reveals
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');

    // Trigger hero animations on page load
    window.addEventListener('load', () => {
        if (heroTitle) {
            setTimeout(() => heroTitle.classList.add('visible'), 300);
        }
        if (heroSubtitle) {
            setTimeout(() => heroSubtitle.classList.add('visible'), 500);
        }
        if (heroDescription) {
            setTimeout(() => heroDescription.classList.add('visible'), 700);
        }
        if (heroButtons) {
            setTimeout(() => heroButtons.classList.add('visible'), 900);
        }
        if (heroImage) {
            setTimeout(() => heroImage.classList.add('visible'), 1100);
        }
    });

    // Professional text reveal animation
    function revealText(element, speed = 50) {
        const text = element.textContent;
        element.innerHTML = '';
        element.style.opacity = '1';
        
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply text reveal to hero title on load
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            setTimeout(() => {
                revealText(heroTitle, 80);
            }, 500);
        }
    });

    // Initialize EmailJS
    (function() {
        // Initialize EmailJS with your public key
        emailjs.init('ABN6QhCvWc75O7xqu');
    })();

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;

            // Send email using EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'mahimapasedakusumsiri@gmail.com'
            };

            // Send email using your EmailJS service and template
            emailjs.send('service_s4rfy28', 'template_ato2ete', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                });
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;

        // Add to DOM
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Professional parallax effects
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        // Hero section parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Floating shapes parallax
        const floatingShapes = document.querySelector('.floating-shapes');
        if (floatingShapes) {
            const shapes = floatingShapes.querySelectorAll('div');
            shapes.forEach((shape, index) => {
                const rate = scrolled * (0.1 + index * 0.05);
                shape.style.transform += ` translateY(${rate}px)`;
            });
        }

        // Background particles parallax
        const bodyAfter = document.querySelector('body::after');
        if (bodyAfter) {
            const rate = scrolled * 0.2;
            document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
        }
    });

    // Professional skill items hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Professional button micro-interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        // Add click animation
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });

    // Professional project cards 3D tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
            this.style.transition = 'transform 0.1s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
            this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        }
        
        updateCounter();
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-item h3');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Professional scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    // Update scroll progress
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Professional loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        // Hide scroll progress during loading
        scrollProgress.style.opacity = '0';
        setTimeout(() => {
            scrollProgress.style.opacity = '1';
        }, 500);
    });

    // Add loading class initially
    document.body.classList.add('loading');

    // Professional floating geometric shapes
    function createFloatingShapes() {
        const shapesContainer = document.createElement('div');
        shapesContainer.className = 'floating-shapes';
        shapesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;

        // Create floating shapes
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            const size = Math.random() * 100 + 50;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const animationDuration = Math.random() * 20 + 15;
            const animationDelay = Math.random() * 5;

            shape.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
                border-radius: ${Math.random() > 0.5 ? '50%' : '20%'};
                animation: floatShape ${animationDuration}s ease-in-out infinite;
                animation-delay: ${animationDelay}s;
                opacity: 0.6;
            `;

            shapesContainer.appendChild(shape);
        }

        document.body.appendChild(shapesContainer);
    }

    // Add floating shapes animation keyframes
    const floatingShapesStyle = document.createElement('style');
    floatingShapesStyle.textContent = `
        @keyframes floatShape {
            0%, 100% {
                transform: translateY(0) translateX(0) rotate(0deg) scale(1);
                opacity: 0.6;
            }
            25% {
                transform: translateY(-20px) translateX(10px) rotate(90deg) scale(1.1);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-10px) translateX(-15px) rotate(180deg) scale(0.9);
                opacity: 0.7;
            }
            75% {
                transform: translateY(-30px) translateX(5px) rotate(270deg) scale(1.05);
                opacity: 0.9;
            }
        }
    `;
    document.head.appendChild(floatingShapesStyle);

    // Initialize floating shapes
    createFloatingShapes();

    // Initialize tech background animations
    initializeTechAnimations();

    // Test social media links
    testSocialLinks();

    // Initialize AI Chat Widget
    initializeAIChat();

    // Add subtle noise texture overlay
    const noiseOverlay = document.createElement('div');
    noiseOverlay.className = 'noise-overlay';
    document.body.appendChild(noiseOverlay);

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
    });

    // Professional preloader with modern design
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <span class="logo-letter">M</span>
                <span class="logo-letter">P</span>
                <span class="logo-letter">K</span>
            </div>
            <div class="preloader-text">Loading Portfolio</div>
            <div class="preloader-spinner">
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
                <div class="spinner-ring"></div>
            </div>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f172a;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    preloader.querySelector('.preloader-content').style.cssText = `
        text-align: center;
        color: #ffffff;
    `;

    preloader.querySelector('.preloader-logo').style.cssText = `
        font-size: 4rem;
        font-weight: 800;
        margin-bottom: 1rem;
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    `;

    preloader.querySelector('.preloader-text').style.cssText = `
        font-size: 1rem;
        color: #cbd5e1;
        margin-bottom: 2rem;
        font-weight: 500;
    `;

    preloader.querySelector('.preloader-spinner').style.cssText = `
        width: 60px;
        height: 60px;
        position: relative;
        margin: 0 auto;
    `;

    // Style individual logo letters
    const logoLetters = preloader.querySelectorAll('.logo-letter');
    logoLetters.forEach((letter, index) => {
        letter.style.cssText = `
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: pulse 2s ease-in-out infinite;
            animation-delay: ${index * 0.2}s;
        `;
    });

    // Style spinner rings
    const spinnerRings = preloader.querySelectorAll('.spinner-ring');
    spinnerRings.forEach((ring, index) => {
        ring.style.cssText = `
            position: absolute;
            width: ${60 - index * 15}px;
            height: ${60 - index * 15}px;
            border: 2px solid transparent;
            border-top: 2px solid #667eea;
            border-radius: 50%;
            animation: spin 1.5s linear infinite;
            animation-delay: ${index * 0.1}s;
            top: ${index * 7.5}px;
            left: ${index * 7.5}px;
        `;
    });

    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(preloader);

    // Remove preloader after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });

    // Initialize tech background animations
    function initializeTechAnimations() {
        // Add code content to code snippets
        const codeSnippets = document.querySelectorAll('.code-snippet');
        codeSnippets.forEach(snippet => {
            const code = snippet.getAttribute('data-code');
            if (code) {
                snippet.textContent = code;
            }
        });

        // Add interactive hover effects to tech icons
        const techIcons = document.querySelectorAll('.tech-icon');
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(360deg)';
                this.style.background = 'rgba(102, 126, 234, 0.3)';
                this.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
            });

            icon.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.background = 'rgba(102, 126, 234, 0.1)';
                this.style.boxShadow = '';
            });
        });

        // Add dynamic binary rain effect
        createBinaryRain();

        // Add mouse parallax effect to tech background
        addParallaxEffect();
    }

    // Create dynamic binary rain
    function createBinaryRain() {
        const binaryRain = document.querySelector('.binary-rain');
        if (!binaryRain) return;

        // Add binary characters to columns
        const columns = binaryRain.querySelectorAll('.binary-column');
        columns.forEach((column, index) => {
            const binaryChars = ['0', '1'];
            let binaryText = '';
            
            for (let i = 0; i < 20; i++) {
                binaryText += binaryChars[Math.floor(Math.random() * 2)] + '<br>';
            }
            
            column.innerHTML = binaryText;
            column.style.fontFamily = 'Courier New, monospace';
            column.style.fontSize = '12px';
            column.style.color = 'rgba(102, 126, 234, 0.8)';
            column.style.textAlign = 'center';
            column.style.lineHeight = '1.2';
        });
    }

    // Add parallax effect to tech background
    function addParallaxEffect() {
        const techBackground = document.querySelector('.tech-background');
        if (!techBackground) return;

        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            // Parallax effect for different elements
            const codeSnippets = techBackground.querySelectorAll('.code-snippet');
            const techIcons = techBackground.querySelectorAll('.tech-icon');
            const gridLines = techBackground.querySelectorAll('.grid-line');

            codeSnippets.forEach((snippet, index) => {
                const speed = 0.02 + (index * 0.01);
                const x = (mouseX - 0.5) * speed * 100;
                const y = (mouseY - 0.5) * speed * 100;
                snippet.style.transform = `translate(${x}px, ${y}px)`;
            });

            techIcons.forEach((icon, index) => {
                const speed = 0.01 + (index * 0.005);
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;
                icon.style.transform = `translate(${x}px, ${y}px)`;
            });

            gridLines.forEach((line, index) => {
                const speed = 0.005 + (index * 0.002);
                const x = (mouseX - 0.5) * speed * 30;
                const y = (mouseY - 0.5) * speed * 30;
                line.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Test social media links functionality
    function testSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        console.log('Found social links:', socialLinks.length);
        
        socialLinks.forEach((link, index) => {
            console.log(`Link ${index + 1}:`, link.href);
            
            // Add click event listener for debugging
            link.addEventListener('click', function(e) {
                console.log('Social link clicked:', this.href);
                // Let the default behavior happen (opening the link)
            });
            
            // Add visual feedback on hover
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.1)';
                this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.5)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
            });
        });
    }

    // AI Chat Widget Functionality
    function initializeAIChat() {
        const chatWidget = document.getElementById('aiChatWidget');
        const chatToggle = document.getElementById('aiChatToggle');
        const chatClose = document.getElementById('chatClose');
        const chatInput = document.getElementById('chatInput');
        const chatSend = document.getElementById('chatSend');
        const chatMessages = document.getElementById('chatMessages');
        const chatNotification = document.getElementById('chatNotification');
        const suggestionBtns = document.querySelectorAll('.suggestion-btn');

        let isChatOpen = false;
        let messageCount = 0;

        // Toggle chat widget
        chatToggle.addEventListener('click', function() {
            isChatOpen = !isChatOpen;
            if (isChatOpen) {
                chatWidget.classList.add('active');
                chatNotification.style.display = 'none';
                chatInput.focus();
            } else {
                chatWidget.classList.remove('active');
            }
        });

        // Close chat widget
        chatClose.addEventListener('click', function() {
            isChatOpen = false;
            chatWidget.classList.remove('active');
        });

        // Send message function
        function sendMessage(message) {
            if (!message.trim()) return;

            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';

            // Simulate AI typing
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                addMessage(aiResponse, 'ai');
            }, 1000 + Math.random() * 1000);
        }

        // Add message to chat
        function addMessage(content, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;

            const avatar = document.createElement('div');
            avatar.className = 'message-avatar';
            avatar.innerHTML = sender === 'ai' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            
            const messageText = document.createElement('p');
            messageText.textContent = content;
            
            const messageTime = document.createElement('span');
            messageTime.className = 'message-time';
            messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            messageContent.appendChild(messageText);
            messageContent.appendChild(messageTime);
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);

            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            messageCount++;
        }

        // Generate AI response based on user input
        function generateAIResponse(userMessage) {
            const message = userMessage.toLowerCase();
            
            // Skills related responses
            if (message.includes('skill') || message.includes('expertise') || message.includes('technology')) {
                return "Mahima has extensive skills in programming languages like Java, HTML, CSS, JavaScript, Kotlin, SQL, C, and C++. He's also proficient in app development, web development, video editing with DaVinci Resolve and CapCut, CCTV systems, and robotics. Additionally, he's skilled in Adobe Photoshop, Adobe Illustrator, and Figma for design work. He also focuses on Professional Skills (PS Chapters) including communication, leadership, problem-solving, time management, critical thinking, emotional intelligence, adaptability, and innovation.";
            }
            
            // Projects related responses
            if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
                return "Mahima has worked on several exciting projects including his YouTube channel with creative vlogs and tutorials, professional event photography and videography services, and CCTV security system installations. He's also developing web applications at Delta Gemunupura College.";
            }
            
            // Experience related responses
            if (message.includes('experience') || message.includes('job') || message.includes('career')) {
                return "Mahima has 6+ years of experience in multimedia work. He's currently a Web Developer and Social Media Manager at Delta Gemunupura College, and has been working as a self-employed videographer and photographer since 2019. He's also pursuing Computer Science at SLIIT City UNI (2023-2027).";
            }
            
            // Contact related responses
            if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('phone')) {
                return "You can contact Mahima through email at mahimapasedakusumsiri@gmail.com or phone at +94 77 011 4407. He's located in Pussellawa, Sri Lanka. You can also connect with him on LinkedIn, YouTube, Instagram, and Facebook through the social media links on this page.";
            }
            
            // Education related responses
            if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('study')) {
                return "Mahima is currently pursuing a Bachelor's Degree in Computer Science at SLIIT City UNI (2023-2027). He completed his Advanced Level education at Delta Gemunupura College Kothmale (2019-2022) and his Ordinary Level at Harangala National School (2013-2019).";
            }
            
            // PS Chapters related responses
            if (message.includes('ps chapters') || message.includes('professional skills') || message.includes('soft skills') || message.includes('employability')) {
                return "PS Chapters refers to Professional Skills, also known as soft skills or employability skills. These are the non-technical, interpersonal abilities essential for workplace success. Mahima focuses on developing skills like communication, leadership, problem-solving, time management, critical thinking, emotional intelligence, adaptability, and innovation. These skills complement technical expertise and are crucial for career advancement and team collaboration.";
            }
            
            // Multimedia related responses
            if (message.includes('video') || message.includes('photo') || message.includes('multimedia') || message.includes('youtube')) {
                return "Mahima is a passionate multimedia professional with expertise in videography, photography, video editing, vlogging, and social media management. He has created 100+ videos and photographed 50+ events. His YouTube channel features creative content and tutorials.";
            }
            
            // General greeting responses
            if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
                return "Hello! I'm here to help you learn more about Mahima Paseda Kusumsiri. He's a Full-Stack Developer and Multimedia Professional with 6+ years of experience. Feel free to ask me about his skills, projects, experience, or how to contact him!";
            }
            
            // Default response
            return "That's an interesting question! Mahima is a talented Full-Stack Developer and Multimedia Professional. You can ask me about his skills, projects, experience, education, or how to contact him. I'm here to help you learn more about his work and expertise.";
        }

        // Send button click
        chatSend.addEventListener('click', function() {
            const message = chatInput.value.trim();
            if (message) {
                sendMessage(message);
            }
        });

        // Enter key to send
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = chatInput.value.trim();
                if (message) {
                    sendMessage(message);
                }
            }
        });

        // Suggestion buttons
        suggestionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const message = this.getAttribute('data-message');
                sendMessage(message);
            });
        });

        // Show notification after 3 seconds if chat hasn't been opened
        setTimeout(() => {
            if (!isChatOpen) {
                chatNotification.style.display = 'flex';
            }
        }, 3000);

        // Auto-hide notification when chat is opened
        chatToggle.addEventListener('click', function() {
            if (isChatOpen) {
                chatNotification.style.display = 'none';
            }
        });
    }
});
