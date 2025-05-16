document.addEventListener('DOMContentLoaded', function() {
            // Theme Toggle Functionality
            const themeToggle = document.querySelector('.theme-toggle');
            
            themeToggle.addEventListener('click', function() {
                document.body.classList.toggle('theme-dark');
                document.body.classList.toggle('theme-light');
                this.classList.toggle('active');
                
                // Save theme preference to local storage
                const isDarkMode = document.body.classList.contains('theme-dark');
                localStorage.setItem('darkMode', isDarkMode);
            });
            
            // Check for saved theme preference
            const savedDarkMode = localStorage.getItem('darkMode') === 'true';
            if (savedDarkMode) {
                document.body.classList.add('theme-dark');
                document.body.classList.remove('theme-light');
                themeToggle.classList.add('active');
            }
            
            // Mobile Navigation Toggle
            const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
            const mobileNav = document.querySelector('.mobile-nav');
            
            mobileNavToggle.addEventListener('click', function() {
                mobileNav.classList.toggle('open');
                document.body.classList.toggle('nav-open');
                
                // Animate the hamburger icon
                const spans = this.querySelectorAll('span');
                spans.forEach(span => span.classList.toggle('active'));
            });
            
            // Close mobile nav when clicking on a link
            const mobileNavLinks = document.querySelectorAll('.mobile-nav .nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileNav.classList.remove('open');
                    document.body.classList.remove('nav-open');
                    
                    const spans = mobileNavToggle.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                });
            });
            
            // Scroll to section when clicking on nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Header scroll effect
            const header = document.querySelector('.header');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.add('scroll');
                } else {
                    header.classList.remove('scroll');
                }
            });
            
            // Typed Text Animation
            const typedTextElement = document.querySelector('.typed-text');
            const textArray = [ "software Developer",, "python fullstack Developer","Software Engineer", "SQL developer"];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingDelay = 200;
            
            function type() {
                const currentText = textArray[textIndex];
                
                if (isDeleting) {
                    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    typingDelay = 100;
                } else {
                    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    typingDelay = 200;
                }
                
                if (!isDeleting && charIndex === currentText.length) {
                    isDeleting = true;
                    typingDelay = 1000; // Pause at end of word
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % textArray.length;
                    typingDelay = 500; // Pause before typing new word
                }
                
                setTimeout(type, typingDelay);
            }
            
            // Start the typing animation
            setTimeout(type, 1000);
            
            // Animate skill bars on scroll
            const skillProgressBars = document.querySelectorAll('.skill-progress');
            
            function animateSkillBars() {
                skillProgressBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width') + '%';
                    bar.style.width = targetWidth;
                });
            }
            
            // Project filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    projectCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
            
            // Form validation
            const contactForm = document.getElementById('contactForm');
            
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    let isValid = true;
                    
                    // Validate name
                    const nameInput = document.getElementById('name');
                    const nameError = document.getElementById('nameError');
                    if (nameInput.value.trim() === '') {
                        nameError.style.display = 'block';
                        isValid = false;
                    } else {
                        nameError.style.display = 'none';
                    }
                    
                    // Validate email
                    const emailInput = document.getElementById('email');
                    const emailError = document.getElementById('emailError');
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailInput.value)) {
                        emailError.style.display = 'block';
                        isValid = false;
                    } else {
                        emailError.style.display = 'none';
                    }
                    
                    // Validate subject
                    const subjectInput = document.getElementById('subject');
                    const subjectError = document.getElementById('subjectError');
                    if (subjectInput.value.trim() === '') {
                        subjectError.style.display = 'block';
                        isValid = false;
                    } else {
                        subjectError.style.display = 'none';
                    }
                    
                    // Validate message
                    const messageInput = document.getElementById('message');
                    const messageError = document.getElementById('messageError');
                    if (messageInput.value.trim() === '') {
                        messageError.style.display = 'block';
                        isValid = false;
                    } else {
                        messageError.style.display = 'none';
                    }
                    
                    // If valid, submit form (in this case, just show a success message)
                    if (isValid) {
                        alert('Message sent successfully! (This is a demo)');
                        contactForm.reset();
                    }
                });
            }
            
            // Animate elements on scroll
            const animatedElements = document.querySelectorAll('.animate');
            
            function checkIfInView() {
                const windowHeight = window.innerHeight;
                const windowTopPosition = window.scrollY;
                const windowBottomPosition = windowTopPosition + windowHeight;
                
                animatedElements.forEach(element => {
                    const elementHeight = element.offsetHeight;
                    const elementTopPosition = element.offsetTop;
                    const elementBottomPosition = elementTopPosition + elementHeight;
                    
                    // Check if element is in viewport
                    if (elementBottomPosition >= windowTopPosition && 
                        elementTopPosition <= windowBottomPosition) {
                        element.classList.add('animated');
                    }
                });
                
                // Animate skill bars when skills section is in view
                const skillsSection = document.getElementById('skills');
                if (skillsSection) {
                    const skillsSectionTop = skillsSection.offsetTop;
                    const skillsSectionBottom = skillsSectionTop + skillsSection.offsetHeight;
                    
                    if (skillsSectionBottom >= windowTopPosition && 
                        skillsSectionTop <= windowBottomPosition) {
                        animateSkillBars();
                    }
                }
            }
            
            // Run on load
            checkIfInView();
            
            // Run on scroll
            window.addEventListener('scroll', checkIfInView);
        });