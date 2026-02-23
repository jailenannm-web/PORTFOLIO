// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Project data
const projectsData = {
    sonder: {
        title: "Sonder - Mental Health Awareness Website",
        description: "Sonder is a comprehensive mental health awareness platform dedicated to promoting psychological wellness and breaking the stigma surrounding mental health. The platform provides evidence-based resources, peer support communities, professional consultation booking, and educational content curated by mental health experts.",
        fullDescription: "Sonder combines modern web technologies with a compassionate design approach to create a safe, accessible space for mental health awareness and support. The platform features interactive articles, community forums with moderation, appointment scheduling with licensed professionals, wellness tracking tools, and crisis resource integration. Built with responsive design to ensure accessibility across all devices.",
        technologies: ["HTML", "CSS", "JavaScript"],
        features: [
            "Comprehensive mental health resource library",
            "Peer support communities and forums",
            "Professional consultation booking system",
            "Wellness tracking and progress monitoring",
            "Crisis resource hotline integration",
            "Personalized mental health recommendations",
            "Secure user authentication and privacy protection"
        ],
        screenshot: "public/Sonder.png"
    },
    escpms: {
        title: "Sta. Cruz Elementary School Property Custodian Management System",
        description: "A specialized property management system designed specifically for Sta. Cruz Elementary School's custodial operations. This system streamlines the tracking, maintenance, and accountability of school assets, enabling efficient resource management and reducing administrative overhead.",
        fullDescription: "The system provides comprehensive tools for managing school property inventory, scheduling maintenance tasks, tracking repairs and replacements, and maintaining custodial records. Features include real-time asset tracking, maintenance request workflows, automated reporting, staff assignment management, and compliance documentation. Designed to improve operational efficiency while maintaining detailed records for accountability.",
        technologies: ["Visual Basic", "MySQL", ".NET", "WinForms"],
        features: [
            "Comprehensive property inventory management",
            "Maintenance scheduling and tracking",
            "Work order assignment and monitoring",
            "Repair and replacement documentation",
            "Custodial task assignment system",
            "Automated compliance reporting",
            "Real-time asset status updates"
        ],
        screenshot: "public/StaCruz.png"
    },
    cnscpos: {
        title: "CNSC Auxiliary - Local Only Point of Sale System",
        description: "A dedicated point-of-sale system developed for CNSC Auxiliary's local operations. The system is designed for offline-first functionality, enabling seamless transaction processing, inventory management, and sales reporting for local-only retail operations without requiring internet connectivity.",
        fullDescription: "This POS system prioritizes reliability and ease of use for local auxiliary operations. It features transaction processing, inventory tracking, real-time sales analytics, receipt generation, and secure payment handling. The system is optimized for standalone deployment with no cloud dependencies, making it ideal for local-only retail environments. Includes comprehensive sales reporting and inventory reconciliation features.",
        technologies: ["JAVA", "PHP"],
        features: [
            "Fast transaction processing and checkout",
            "Real-time inventory management",
            "Sales analytics and reporting",
            "Receipt and invoice generation",
            "Product categorization and pricing",
            "Inventory reconciliation tools",
            "Secure local data storage"
        ],
        screenshot: "public/CNSC.png"
    }
};

// Modal functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Scroll modal content into view
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
    document.getElementById('inquiryModal').style.display = 'none';
    document.getElementById('projectModal').style.display = 'none';
    document.getElementById('contactModal').classList.remove('show');
    document.getElementById('inquiryModal').classList.remove('show');
    document.getElementById('projectModal').classList.remove('show');
}

function closeInquiryModal() {
    const inquiryModal = document.getElementById('inquiryModal');
    inquiryModal.style.display = 'none';
    inquiryModal.classList.remove('show');
}

function closeProjectModal() {
    const projectModal = document.getElementById('projectModal');
    projectModal.style.display = 'none';
    projectModal.classList.remove('show');
}



function openInquiryModal(projectName) {
    const modal = document.getElementById('inquiryModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.getElementById('inquiryProject').textContent = `Inquiring about: ${projectName}`;
    // Scroll modal content into view
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    // Populate modal with project data
    document.getElementById('projectDetailTitle').textContent = project.title;
    document.getElementById('projectDetailDescription').textContent = project.description;
    document.getElementById('projectDetailImg').src = project.screenshot;
    
    // Populate technologies
    const techList = document.getElementById('projectDetailTechList');
    techList.innerHTML = project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
    
    // Populate features
    const featuresList = document.getElementById('projectDetailFeatures');
    featuresList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
    
    // Store current project for inquiry
    window.currentProject = project.title;
    
    // Show modal
    const modal = document.getElementById('projectModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Scroll modal content into view
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

function openInquiryModalFromDetail() {
    closeProjectModal();
    openInquiryModal(window.currentProject || 'Project');
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    const contactModal = document.getElementById('contactModal');
    const inquiryModal = document.getElementById('inquiryModal');
    const projectModal = document.getElementById('projectModal');
    
    if (event.target === contactModal) {
        contactModal.style.display = 'none';
    }
    if (event.target === inquiryModal) {
        inquiryModal.style.display = 'none';
    }
    if (event.target === projectModal) {
        projectModal.style.display = 'none';
    }
});

// Initialize map on page load
function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    setTimeout(() => {
        const map = L.map('map').setView([14.1995, 122.5705], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);

        // Add marker for Labo, Camarines Norte
        L.marker([14.1995, 122.5705]).addTo(map)
            .bindPopup('<b>Labo, Camarines Norte</b><br>Philippines')
            .openPopup();
    }, 100);
}

// Initialize map when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMap);
} else {
    initializeMap();
}

// About Detail Modal Functions
function openAboutModal(modalType) {
    let modalId = '';
    
    switch(modalType) {
        case 'background':
            modalId = 'backgroundModal';
            break;
        case 'education':
            modalId = 'educationModal';
            break;
        case 'goals':
            modalId = 'goalsModal';
            break;
        case 'interests':
            modalId = 'interestsModal';
            break;
        default:
            return;
    }
    
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        
        // Scroll modal content into view
        setTimeout(() => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 50);
    }
}

function closeAboutModal() {
    const modals = document.querySelectorAll('.about-detail-modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('show');
    });
}

// Close about modals when clicking outside
window.addEventListener('click', (event) => {
    const aboutModals = document.querySelectorAll('.about-detail-modal');
    aboutModals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('show');
        }
    });
});

// Testimonials API Integration
// Function definition removed to prevent conflict with the updated version below

function createTestimonialCard(data) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    const initials = data.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    
    const stars = Array(data.rating)
        .fill(0)
        .map(() => '<i class="fas fa-star"></i>')
        .join('');
    
    card.innerHTML = `
        <div class="testimonial-header">
            <div class="testimonial-avatar">${initials}</div>
            <div>
                <div class="testimonial-name">${data.name}</div>
                <div class="testimonial-role">${data.role}</div>
            </div>
        </div>
        <div class="testimonial-text">"${data.message}"</div>
        <div class="testimonial-rating">${stars}</div>
    `;
    
    return card;
}

// Load testimonials when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadTestimonials();
        initFeedbackForm();
    });
} else {
    loadTestimonials();
    initFeedbackForm();
}

// Feedback Modal Functions
function openFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'flex';
    modal.classList.add('show');
    
    // Scroll modal content into view
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';
    modal.classList.remove('show');
}

// Close feedback modal when clicking outside
window.addEventListener('click', (event) => {
    const feedbackModal = document.getElementById('feedbackModal');
    if (event.target === feedbackModal) {
        feedbackModal.style.display = 'none';
        feedbackModal.classList.remove('show');
    }
});

// Initialize Feedback Form
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', submitFeedback);
    }
}

// Submit Feedback
async function submitFeedback(e) {
    e.preventDefault();
    
    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const role = document.getElementById('feedbackRole').value || 'Other';
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const message = document.getElementById('feedbackMessage').value.trim();
    const statusDiv = document.getElementById('feedbackStatus');
    
    // Validate input
    if (!name || !email || !rating || !message) {
        statusDiv.className = 'feedback-status error';
        statusDiv.textContent = 'Please fill in all required fields.';
        return;
    }
    
    if (!validateEmail(email)) {
        statusDiv.className = 'feedback-status error';
        statusDiv.textContent = 'Please enter a valid email address.';
        return;
    }
    
    // Show loading state
    statusDiv.className = 'feedback-status loading';
    statusDiv.textContent = 'Submitting your feedback...';
    
    try {
        // Create feedback object
        const newFeedback = {
            name,
            email,
            role,
            rating: parseInt(rating),
            message,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage (Simulating backend storage)
        const currentFeedbacks = JSON.parse(localStorage.getItem('portfolioFeedbacks') || '[]');
        currentFeedbacks.unshift(newFeedback);
        localStorage.setItem('portfolioFeedbacks', JSON.stringify(currentFeedbacks));
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        statusDiv.className = 'feedback-status success';
        statusDiv.textContent = 'Thank you! Your feedback has been submitted successfully.';
        
        // Reset form
        document.getElementById('feedbackForm').reset();
        
        // Close modal after 2 seconds
        setTimeout(() => {
            closeFeedbackModal();
            statusDiv.textContent = '';
            // Reload testimonials to show new feedback
            loadTestimonials();
        }, 2000);
        
    } catch (error) {
        console.error('[v0] Error submitting feedback:', error);
        statusDiv.className = 'feedback-status error';
        statusDiv.textContent = 'Failed to submit feedback. Please try again.';
    }
}

// Email validation helper
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Update loadTestimonials to include feedback from API
async function loadTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    let hasData = false;

    // 1. Try LocalStorage first (User submitted data takes precedence)
    try {
        const savedFeedbacks = localStorage.getItem('portfolioFeedbacks');
        if (savedFeedbacks) {
            const feedbacks = JSON.parse(savedFeedbacks);
            if (feedbacks && feedbacks.length > 0) {
                grid.innerHTML = '';
                feedbacks.forEach((feedback) => {
                    const testimonial = createTestimonialCard(feedback);
                    grid.appendChild(testimonial);
                });
                hasData = true;
            }
        }
    } catch (e) {
        console.error('[v0] Error parsing saved feedback:', e);
    }
    
    if (hasData) return;

    // 3. If absolutely nothing, show message
    grid.innerHTML = '<div class="loading-message">No testimonials yet. Be the first to share your feedback!</div>';
}

// Add star rating interaction
function initStarRating() {
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    const starLabels = document.querySelectorAll('.star-label');
    
    starLabels.forEach((label, index) => {
        label.addEventListener('mouseover', () => {
            // Highlight stars on hover
            starLabels.forEach((l, i) => {
                if (i <= index) {
                    l.style.color = 'var(--primary-color)';
                } else {
                    l.style.color = 'rgba(255, 140, 0, 0.3)';
                }
            });
        });
        
        label.addEventListener('click', () => {
            // Set the corresponding input value
            ratingInputs[index].checked = true;
        });
    });
    
    // Reset stars when mouse leaves
    const ratingContainer = document.querySelector('.rating-input');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', () => {
            const checkedInput = document.querySelector('input[name="rating"]:checked');
            if (checkedInput) {
                const checkedIndex = Array.from(ratingInputs).indexOf(checkedInput);
                starLabels.forEach((l, i) => {
                    if (i <= checkedIndex) {
                        l.style.color = 'var(--primary-color)';
                    } else {
                        l.style.color = 'rgba(255, 140, 0, 0.3)';
                    }
                });
            } else {
                starLabels.forEach(l => {
                    l.style.color = 'rgba(255, 140, 0, 0.3)';
                });
            }
        });
    }
}

// Initialize star rating when feedback modal opens
document.addEventListener('DOMContentLoaded', () => {
    // Observe feedback modal for visibility changes
    const feedbackModal = document.getElementById('feedbackModal');
    if (feedbackModal) {
        const observer = new MutationObserver(() => {
            if (feedbackModal.style.display === 'flex' && feedbackModal.classList.contains('show')) {
                setTimeout(initStarRating, 100);
            }
        });
        
        observer.observe(feedbackModal, { attributes: true });
        
        // Also init on manual opens
        const originalOpen = window.openFeedbackModal;
        window.openFeedbackModal = function() {
            originalOpen();
            setTimeout(initStarRating, 100);
        };
    }
});

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggleBtn = document.getElementById('chatbotToggle');
    
    // Check computed style to handle initial CSS state
    const isHidden = chatbot.style.display === 'none' || getComputedStyle(chatbot).display === 'none';
    
    if (isHidden) {
        chatbot.style.display = 'flex';
        toggleBtn.style.display = 'none';
        // Focus input after transition
        setTimeout(() => {
            const input = document.getElementById('chatInput');
            if (input) input.focus();
        }, 100);
    } else {
        chatbot.style.display = 'none';
        toggleBtn.style.display = 'flex';
    }
}

function closeChatbot(event) {
    if (event) event.stopPropagation();
    const chatbot = document.getElementById('chatbot');
    const toggleBtn = document.getElementById('chatbotToggle');
    chatbot.style.display = 'none';
    toggleBtn.style.display = 'flex';
}

async function sendChatMessage(event) {
    event.preventDefault();
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    const messageText = input.value.trim();
    
    if (!messageText) return;
    
    // Add user message
    addChatMessage(messageText, 'user');
    input.value = '';
    
    // Simulate bot thinking
    const loadingId = showChatLoading();
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 500));
    
    // Remove loading indicator
    removeChatLoading(loadingId);
    
    // Generate response
    const response = getBotResponse(messageText);
    addChatMessage(response, 'bot');
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-message`;
    
    if (sender === 'bot') {
        msgDiv.innerHTML = `<div class="message-avatar">J</div><div class="message-content">${text}</div>`;
    } else {
        msgDiv.innerHTML = `<div class="message-content">${text}</div>`;
    }
    
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showChatLoading() {
    const messagesContainer = document.getElementById('chatMessages');
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message bot-message typing-indicator';
    msgDiv.id = id;
    msgDiv.innerHTML = `<div class="message-avatar">J</div><div class="message-content"><span>.</span><span>.</span><span>.</span></div>`;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return id;
}

function removeChatLoading(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}

function getBotResponse(text) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('hello') || lowerText.includes('hi')) return "Hi there! How can I help you today?";
    if (lowerText.includes('project')) return "You can check out my projects in the Projects section above!";
    if (lowerText.includes('contact') || lowerText.includes('email')) return "Feel free to use the contact form to reach me directly.";
    if (lowerText.includes('skill') || lowerText.includes('tech')) return "I specialize in React, Node.js, and Database Management.";
    return "Thanks for your message! I'm currently operating in offline mode, but please feel free to use the Contact form to reach me directly.";
}

// Initialize Chatbot State
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) chatbot.style.display = 'none';
});
