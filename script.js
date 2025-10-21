// top navbar scroll effect
document.addEventListener('DOMContentLoaded', function () {
    const topRow = document.getElementById('top-row');
    const headerContainer = document.getElementById('header-container');

    let lastScrollPosition = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', function () {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollPosition > scrollThreshold) {
            headerContainer.classList.add('scrolled');
        } else {
            headerContainer.classList.remove('scrolled');
        }

        lastScrollPosition = currentScrollPosition;
    });
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    scrollToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// roadmap slider functionality
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.roadmap-track');
    const items = document.querySelectorAll('.roadmap-item');
    const prevBtn = document.querySelector('.roadmap-prev');
    const nextBtn = document.querySelector('.roadmap-next');

    let currentIndex = 0;
    let itemWidth = items[0].offsetWidth;
    let maxIndex = items.length - (window.innerWidth > 991 ? 3 : window.innerWidth > 767 ? 2 : 1);


    window.addEventListener('resize', function () {
        itemWidth = items[0].offsetWidth;
        maxIndex = items.length - (window.innerWidth > 991 ? 3 : window.innerWidth > 767 ? 2 : 1);
        goToSlide(currentIndex);
    });

    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
    });

    setInterval(function () {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);
});

// nav link functionality
document.addEventListener('DOMContentLoaded', function () {
    const servicesLink = document.querySelector('#navbarDropdown2');

    servicesLink.addEventListener('click', function (e) {
        if (window.innerWidth < 1200) {
            return;
        } else {
            e.preventDefault();
            window.location.href = this.getAttribute('href');
        }
    });
});

// Add event listeners to close mobile menu when nav items are clicked
document.addEventListener('DOMContentLoaded', function () {
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
    });

    const navLinks = document.querySelectorAll('#navbarNav .nav-link:not(.dropdown-toggle), #navbarNav .dropdown-item');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth < 1200) {
                const href = link.getAttribute('href');

                if (href && href.includes('#') &&
                    (href.split('#')[0] === '' ||
                        href.split('#')[0] === window.location.pathname.split('/').pop())) {
                    setTimeout(() => {
                        bsCollapse.hide();
                    }, 50);
                } else {
                    bsCollapse.hide();
                }
            }
        });
    });
});


// contact form functionality

// the fetch url(###) in line 128 can be replaced with your own formspree url

// formspree is free for up to 50 submissions per month || tested and works fine

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();


            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'SENDING...';
            submitBtn.disabled = true;


            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            fetch('https://formspree.io/f/###', {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    contactForm.innerHTML = `
                    <div class="text-center text-white">
                        <i class="bi bi-check-circle-fill" style="font-size: 3rem;"></i>
                        <h3 class="mt-3 mb-3">Message Sent!</h3>
                        <p>Thank you for contacting us. We'll get back to you shortly.</p>
                    </div>
                `;
                })
                .catch(error => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    alert('There was a problem sending your message. Please try again or email us directly.');
                    console.error('Error:', error);
                });
        });
    }
});

// Letter animation for hero carousel headings
document.addEventListener('DOMContentLoaded', function() {
    // Add data attributes to slides to identify which animation to use
    const slides = document.querySelectorAll('#heroCarousel .carousel-item');
    slides[0].setAttribute('data-animation', 'from-right');
    slides[1].setAttribute('data-animation', 'from-bottom');
    slides[2].setAttribute('data-animation', 'from-top');
    
    // Initialize all slides to have invisible headings
    slides.forEach(slide => {
        const headings = slide.querySelectorAll('.animated-text.first, .animated-text.second');
        headings.forEach(heading => {
            // Store original text
            if (!heading.hasAttribute('data-original-text')) {
                heading.setAttribute('data-original-text', heading.textContent.trim());
            }
            // Set initially invisible
            heading.style.opacity = '0';
            heading.style.visibility = 'hidden';
        });
    });
    
    // Initialize the active slide animation after a delay
    setTimeout(() => {
        const activeSlide = document.querySelector('#heroCarousel .carousel-item.active');
        if (activeSlide) {
            applyLetterAnimations(activeSlide);
        }
    }, 100);
    
    // Handle carousel slide events
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        // BEFORE the slide changes - preemptively reset the target slide
        carousel.addEventListener('slide.bs.carousel', function(e) {
            // Ensure target slide headings are completely invisible
            const nextSlide = e.relatedTarget;
            const headings = nextSlide.querySelectorAll('.animated-text.first, .animated-text.second');
            headings.forEach(heading => {
                heading.style.opacity = '0';
                heading.style.visibility = 'hidden';
                heading.classList.remove('animated');
            });
        });
        
        // AFTER the slide has completed changing
        carousel.addEventListener('slid.bs.carousel', function(e) {
            // First reset the current slide completely
            resetLetterAnimations(e.relatedTarget);
            
            // Then apply new animations with a longer delay
            setTimeout(() => {
                applyLetterAnimations(e.relatedTarget);
            }, 100); // Increased delay for smoother transition
        });
    }
});

function resetLetterAnimations(slide) {
    if (!slide) return;
    
    // Get all headings in the slide
    const headings = slide.querySelectorAll('.animated-text.first, .animated-text.second');
    
    headings.forEach(function(heading) {
        // Store original text content
        if (!heading.hasAttribute('data-original-text')) {
            heading.setAttribute('data-original-text', heading.textContent.trim());
        }
        
        // Reset to original state
        heading.style.opacity = '0';
        heading.style.visibility = 'hidden';
        heading.classList.remove('animated');
        heading.innerHTML = heading.getAttribute('data-original-text');
    });
}

function applyLetterAnimations(slide) {
    if (!slide) return;
    
    // Get animation class from slide data attribute
    const animationClass = slide.getAttribute('data-animation');
    if (!animationClass) return;
    
    // Get all headings in the slide
    const headings = slide.querySelectorAll('.animated-text.first, .animated-text.second');
    
    headings.forEach(function(heading, headingIndex) {
        // Store original text if not already stored
        if (!heading.hasAttribute('data-original-text')) {
            heading.setAttribute('data-original-text', heading.textContent.trim());
        }
        
        const text = heading.getAttribute('data-original-text');
        heading.innerHTML = ''; // Clear current content
        heading.classList.add('animated'); // Mark as animated
        
        // Create spans for each letter with appropriate animation
        Array.from(text).forEach((letter, i) => {
            const span = document.createElement('span');
            span.className = 'letter ' + animationClass;
            
            // Set delay based on letter position and heading
            const baseDelay = headingIndex * 0.25; // Increased delay between headings
            span.style.animationDelay = (baseDelay + 0.08 * i) + 's';
            
            span.textContent = letter === ' ' ? '\u00A0' : letter; // Preserve spaces
            heading.appendChild(span);
        });
        
        // Make heading visible but letters will still be initially hidden
        heading.style.visibility = 'visible';
        heading.style.opacity = '1';
    });
}