let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
let slideInterval;
let isTransitioning = false;

// Initialize the slider
function initSlider() {
    if (slides.length > 0) {
        showSlide(0);
        startSlideTimer();
    }
    
    // Add touch support
    const slider = document.querySelector('.slider-container');
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1);
            } else {
                changeSlide(-1);
            }
        }
    }
}

// Start automatic slideshow
function startSlideTimer() {
    stopSlideTimer(); // Clear any existing interval
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000); // Changed to 5 seconds for better viewing experience
}

// Stop automatic slideshow
function stopSlideTimer() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// Show specific slide
function showSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Hide all slides with fade out
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        slides[i].style.opacity = 0;
    }
    
    // Show and fade in the target slide
    setTimeout(() => {
        slides[index].classList.add("active");
        setTimeout(() => {
            slides[index].style.opacity = 1;
            isTransitioning = false;
        }, 50);
    }, 500);
}

// Change slide with direction
function changeSlide(direction) {
    if (isTransitioning) return;
    
    slideIndex += direction;
    
    // Handle loop
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    
    showSlide(slideIndex);
    startSlideTimer(); // Reset timer when manually changed
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Pause slideshow when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopSlideTimer();
    } else {
        startSlideTimer();
    }
});

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlider);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Gallery image click handler for fullscreen view
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', e => {
        const fullscreen = document.createElement('div');
        fullscreen.className = 'fullscreen-view';
        
        const img = document.createElement('img');
        img.src = e.target.src;
        
        fullscreen.appendChild(img);
        document.body.appendChild(fullscreen);
        
        fullscreen.addEventListener('click', () => {
            fullscreen.remove();
        });
    });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});
