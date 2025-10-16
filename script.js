
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    

    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    

    const animatedElements = document.querySelectorAll('[class*="animate__"], [class*="showcase-"], .feature-card, .company-stat-item, .icon-circle-purple, .gradient-small-circle, .image-showcase img, .feature-icon-wrapper, .top-left-image, .bottom-right-image');

    const elementAnimations = new Map();

    animatedElements.forEach(element => {

        const style = window.getComputedStyle(element);
        const originalAnimation = style.animation || style.getPropertyValue('-webkit-animation');
        
        if (originalAnimation && originalAnimation !== 'none') {
            elementAnimations.set(element, {
                animation: originalAnimation,
                delay: style.animationDelay || '0s'
            });
            
            element.style.animationPlayState = 'paused';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                if (elementAnimations.has(element)) {
                    element.style.animationPlayState = 'running';
                } else {
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
 
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        if (!elementAnimations.has(element)) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }

        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {

    const featureCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                featureCardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        featureCardObserver.observe(card);
    });
});

// Add this to your existing DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', function() {

    const grayscaleBgRow = document.querySelector('.grayscale-bg-row');
    
    const grayscaleBgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-bg');
                grayscaleBgObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    if (grayscaleBgRow) {
        grayscaleBgObserver.observe(grayscaleBgRow);
    }
});

// Add this to your existing DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', function() {

    const serviceCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                serviceCardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all service cards
    document.querySelectorAll('.service-card-animate').forEach(card => {
        serviceCardObserver.observe(card);
    });
});


document.addEventListener('DOMContentLoaded', function() {

    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                benefitsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe benefits content
    document.querySelectorAll('.benefits-content-wrapper').forEach(element => {
        benefitsObserver.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Observer for right column animation
    const rightColumnObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                rightColumnObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    // Observe the right column
    document.querySelectorAll('.animate-from-right').forEach(element => {
        rightColumnObserver.observe(element);
    });
});


document.addEventListener('DOMContentLoaded', function() {

    // Animation for top-to-bottom elements
    const topColumnObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                topColumnObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    // Observe elements that should animate from top
    document.querySelectorAll('.animate-from-top').forEach(element => {
        topColumnObserver.observe(element);
    });
});