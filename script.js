// Enhanced Registration Modal functionality
function openModal(courseName = '') {
    const modal = document.getElementById('registration-modal');
    const modalContent = document.getElementById('modal-content');
    const courseSelect = document.getElementById('course-select');
    
    if (courseName) {
        courseSelect.value = courseName;
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Animate modal entrance
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('registration-modal');
    const modalContent = document.getElementById('modal-content');
    
    // Animate modal exit
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Enhanced Mobile menu toggle
document.getElementById('menu-toggle').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Enhanced Registration form submission
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state to button
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message with better styling
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 animate-slide-down';
        successDiv.innerHTML = `
            <div class="flex items-center space-x-3 space-x-reverse">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <span class="font-semibold">تم إرسال طلبك بنجاح! سنتواصل معك قريباً.</span>
            </div>
        `;
        document.body.appendChild(successDiv);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
        
        // Reset form and close modal
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeModal();
    }, 1500);
});

// Enhanced Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Enhanced Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('registration-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Enhanced Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Enhanced Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.borderBottom = 'none';
    }
});

// Enhanced Scroll animations with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
        }
    });
}, observerOptions);

// Enhanced Course cards animation
document.addEventListener('DOMContentLoaded', function() {
    // Observe course cards for scroll animations
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe other elements
    const animatedElements = document.querySelectorAll('.card-hover, .stats-counter');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Enhanced parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Enhanced course card interactions
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Enhanced typing effect for hero text
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'slideDown 1s ease-out';
        }, 500);
    }
    
    // Enhanced stats counter animation
    const statsCounters = document.querySelectorAll('.stats-counter');
    const animateCounters = () => {
        statsCounters.forEach(counter => {
            const target = parseInt(counter.querySelector('div').textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.querySelector('div').textContent = Math.floor(current) + (counter.querySelector('div').textContent.includes('+') ? '+' : '');
            }, 50);
        });
    };
    
    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats-counter').parentElement;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Enhanced form validation with real-time feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('border-red-500')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'هذا الحقل مطلوب';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
        } else if (field.type === 'tel' && value && !isValidPhone(value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال رقم هاتف صحيح';
        }
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        if (isValid) {
            field.classList.remove('border-red-500', 'focus:ring-red-100', 'focus:border-red-500');
            field.classList.add('border-green-500', 'focus:ring-green-100', 'focus:border-green-500');
        } else {
            field.classList.remove('border-green-500', 'focus:ring-green-100', 'focus:border-green-500');
            field.classList.add('border-red-500', 'focus:ring-red-100', 'focus:border-red-500');
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-2 animate-slide-up';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function isValidPhone(phone) {
        return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
    }
});

// Enhanced page load animations
window.addEventListener('load', function() {
    // Trigger initial animations
    const heroElements = document.querySelectorAll('[class*="animate-"]');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Enhanced performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Amiri:wght@400;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
});