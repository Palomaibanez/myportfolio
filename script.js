// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    mobileNav.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    mobileNav.classList.remove('active');
    menuBtn.classList.remove('active');
}

// Smooth Scrolling
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMobileMenu();
        }
    });
});

// Active Navigation
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section[id]');
    const scrollBtn = document.getElementById('scrollToTop');

    // Show/hide scroll button
    if (scrolled > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }

    // Update active nav link
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrolled > sectionTop && scrolled <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

// Scroll to Top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            if (entry.target.classList.contains('stat-card')) {
                const numberElement = entry.target.querySelector('.stat-number');
                const targetNumber = parseInt(numberElement.getAttribute('data-target'));
                animateCounter(numberElement, targetNumber);
            }
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe stat cards if they exist
document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
});

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('senderMessage').value;
    
    // Create personalized feedback message
    const feedbackMsg = document.getElementById('feedbackMessage');
    feedbackMsg.innerHTML = `
        <strong>Hi ${name}!</strong><br><br>
        Thank you for reaching out. I've received your message and will get back to you as soon as possible.<br><br>
        <strong>Your Information:</strong><br>
       
        I look forward to connecting with you! 🎉
    `;

    // Show success message
    const successMsg = document.getElementById('successMessage');
    successMsg.classList.add('show');
    
    // Reset form
    this.reset();
    
    // Auto-hide after 12 seconds
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 12000);
    
    // Scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Close mobile menu on outside click
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (!nav.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth scroll reveal for sections
const revealSections = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(section);
});

// ========== TYPING ANIMATION ==========
const text = "Aspiring Business Analyst";
const typingElement = document.getElementById('typingText');
let index = 0;

function typeText() {
    if (typingElement && index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100); // Speed ng typing (100ms per letter)
    } else if (typingElement) {
        setTimeout(() => {
            typingElement.classList.add('finished');
        }, 500);
    }
}

// Start typing when page loads
window.addEventListener('load', function() {
    setTimeout(typeText, 800);
});

// ========== PROJECT MODAL FUNCTIONS ==========
// Open Project Modal
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const allProjects = document.querySelectorAll('.modal-body');
    
    // Hide all project contents
    allProjects.forEach(project => {
        project.style.display = 'none';
    });
    
    // Show selected project
    const selectedProject = document.getElementById(projectId);
    if (selectedProject) {
        selectedProject.style.display = 'block';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close Project Modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when pressing ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});