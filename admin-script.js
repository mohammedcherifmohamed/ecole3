// Enhanced Admin Dashboard functionality

// Navigation functionality with smooth transitions
function showSection(sectionName) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Hide all sections with fade out
    const sections = ['dashboard-section', 'courses-section', 'students-section', 'analytics-section'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && !element.classList.contains('hidden')) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            setTimeout(() => {
                element.classList.add('hidden');
            }, 300);
        }
    });
    
    // Show selected section with fade in
    setTimeout(() => {
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 50);
        }
    }, 300);
    
    // Add active class to clicked nav item
    event.target.closest('.nav-item').classList.add('active');
}

// Enhanced Course Modal functionality
function openCourseModal() {
    const modal = document.getElementById('course-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Animate modal entrance
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
}

function closeCourseModal() {
    const modal = document.getElementById('course-modal');
    modal.classList.remove('visible');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Enhanced Sidebar toggle for mobile
document.getElementById('sidebar-toggle').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.mr-80');
    
    sidebar.classList.toggle('-translate-x-full');
    
    if (sidebar.classList.contains('-translate-x-full')) {
        mainContent.classList.remove('mr-80');
        mainContent.classList.add('mr-0');
    } else {
        mainContent.classList.remove('mr-0');
        mainContent.classList.add('mr-80');
    }
});

// Enhanced Close course modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('course-modal');
    if (e.target === modal) {
        closeCourseModal();
    }
});

// Enhanced Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCourseModal();
    }
});

// Enhanced Responsive behavior
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.mr-80');
    
    if (window.innerWidth < 1024) {
        sidebar.classList.add('-translate-x-full');
        if (mainContent) {
            mainContent.classList.remove('mr-80');
            mainContent.classList.add('mr-0');
        }
    } else {
        sidebar.classList.remove('-translate-x-full');
        if (mainContent) {
            mainContent.classList.remove('mr-0');
            mainContent.classList.add('mr-80');
        }
    }
}

// Enhanced Form submission with loading states
document.addEventListener('DOMContentLoaded', function() {
    const courseForm = document.querySelector('#course-modal form');
    
    if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري الحفظ...
            `;
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success notification
                showNotification('تم إضافة الدورة بنجاح!', 'success');
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Close modal
                closeCourseModal();
                
                // Refresh courses section if visible
                if (!document.getElementById('courses-section').classList.contains('hidden')) {
                    // Add new course to table (simulation)
                    addCourseToTable();
                }
            }, 2000);
        });
    }
});

// Enhanced Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    
    notification.className = `fixed top-6 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-8 py-4 rounded-2xl shadow-2xl z-50 transition-all duration-300 translate-y-[-100px] opacity-0`;
    notification.innerHTML = `
        <div class="flex items-center space-x-3 space-x-reverse">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="font-semibold">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, 0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translate(-50%, -100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Enhanced Add course to table (simulation)
function addCourseToTable() {
    // This would typically make an API call to add the course
    // For now, we'll just show a success message
    console.log('Course added successfully');
}

// Enhanced Initialize responsive behavior and animations
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', function() {
    handleResize();
    showSection('dashboard');
    
    // Add entrance animations to dashboard elements
    const dashboardCards = document.querySelectorAll('#dashboard-section .card-hover');
    dashboardCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Enhanced table row animations
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(30px)';
        row.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, index * 100);
    });
});

// Enhanced Real-time clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Enhanced Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const tableRows = document.querySelectorAll('.table-row');
            
            tableRows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                    row.style.opacity = '1';
                } else {
                    row.style.opacity = '0.3';
                }
            });
        });
    }
}

// Enhanced Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
    initializeSearch();
    
    // Add smooth transitions to all sections
    const sections = document.querySelectorAll('[id$="-section"]');
    sections.forEach(section => {
        section.style.transition = 'all 0.3s ease';
    });
    
    // Enhanced hover effects for action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});