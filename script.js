document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    // **UPDATED PHRASES**
    const phrases = ["Linux", "Azure Cloud Practitioner", "Networking"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!typewriterElement) return; // Exit if element not found

        const currentPhrase = phrases[phraseIndex];
        const currentLength = currentPhrase.length;
        let typeSpeed = 150;

        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex--);
            typeSpeed = 75;
        } else {
            // Typing text
            typewriterElement.textContent = currentPhrase.substring(0, charIndex++);
        }

        // Check for state changes after text has been updated
        if (!isDeleting && charIndex > currentLength) {
            // Finished typing the phrase, so pause before deleting
            isDeleting = true;
            typeSpeed = 2000; // This is the pause duration
            charIndex--; // Correct index to point to the end of the word for deletion
        } else if (isDeleting && charIndex < 0) {
            // Finished deleting the phrase, so move to the next one
            isDeleting = false;
            charIndex = 0; // Reset index for the new phrase
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }

        setTimeout(type, typeSpeed);
    }
    // Start the typing effect
    type();
    
    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        // Close mobile nav when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLi = document.querySelectorAll('.nav-links a');
    const headerHeightStyle = getComputedStyle(document.documentElement).getPropertyValue('--header-height').trim();
    const headerHeight = parseInt(headerHeightStyle, 10);
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - headerHeight - 40) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // --- Scroll Animations (Fade-in) & Progress Bars ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate progress bars only when they become visible
                if (entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        // Set width based on data-width attribute
                        if (bar.dataset.width) {
                           bar.style.width = bar.dataset.width;
                        }
                    });
                }
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // --- Contact Form Submission ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // This is a demo. In a real application, you would send this data to a server.
            alert('Thank you for your message! This is a demo form.');
            contactForm.reset();
        });
    }
});