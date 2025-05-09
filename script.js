// top navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const topRow = document.getElementById('top-row');
    const headerContainer = document.getElementById('header-container');
    
    let lastScrollPosition = 0;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
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

// roadmap slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.roadmap-track');
    const items = document.querySelectorAll('.roadmap-item');
    const prevBtn = document.querySelector('.roadmap-prev');
    const nextBtn = document.querySelector('.roadmap-next');
    
    let currentIndex = 0;
    let itemWidth = items[0].offsetWidth;
    let maxIndex = items.length - (window.innerWidth > 991 ? 3 : window.innerWidth > 767 ? 2 : 1);
    

    window.addEventListener('resize', function() {
        itemWidth = items[0].offsetWidth;
        maxIndex = items.length - (window.innerWidth > 991 ? 3 : window.innerWidth > 767 ? 2 : 1);
        goToSlide(currentIndex); 
    });
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    prevBtn.addEventListener('click', function() {
        goToSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentIndex + 1);
    });
    
    setInterval(function() {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);
});

// nav link functionality
document.addEventListener('DOMContentLoaded', function() {
    const servicesLink = document.querySelector('#navbarDropdown2');
    
    servicesLink.addEventListener('click', function(e) {
        if (window.innerWidth < 1200) {
            return;
        } else {
            e.preventDefault();
            window.location.href = this.getAttribute('href');
        }
    });
});


// contact form functionality

// the fetch url(###) in line 128 can be replaced with your own formspree url

// formspree is free for up to 50 submissions per month || tested and works fine

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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