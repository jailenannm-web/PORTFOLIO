/**
 * API Integration Module
 * Handles all API calls for the portfolio
 * 
 * APIs Integrated:
 * 1. GitHub API - Fetch repositories
 * 2. EmailJS - Send email notifications
 * 3. Leaflet Maps API - Display location map
 */

// ============================================
// 1. GITHUB API INTEGRATION
// ============================================

const GITHUB_USERNAME = 'jailenannm-web'; // Replace with actual GitHub username

/**
 * Fetches GitHub repositories for the user
 * @returns {Promise<void>}
 */
async function loadGitHubRepos() {
    const reposContainer = document.getElementById('githubRepos');
    const loadButton = event.target;
    
    // Show loading state
    loadButton.disabled = true;
    loadButton.textContent = 'Loading...';
    reposContainer.innerHTML = '<p class="loading-message">Fetching repositories from GitHub...</p>';

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error(`GitHub API Error: ${response.status}`);
        }

        const repos = await response.json();

        if (repos.length === 0) {
            reposContainer.innerHTML = '<p>No repositories found.</p>';
            return;
        }

        // Clear loading message
        reposContainer.innerHTML = '';

        // Display each repository
        repos.forEach(repo => {
            const repoCard = createGitHubRepoCard(repo);
            reposContainer.appendChild(repoCard);
        });

        console.log('[v0] GitHub API Success: Loaded', repos.length, 'repositories');

    } catch (error) {
        console.error('[v0] GitHub API Error:', error);
        reposContainer.innerHTML = `
            <div class="error-message-box">
                <i class="fas fa-exclamation-circle"></i>
                <p>Failed to load repositories. Please check if the GitHub username is correct and try again.</p>
            </div>
        `;
    } finally {
        loadButton.disabled = false;
        loadButton.textContent = 'Load My GitHub Projects';
    }
}

/**
 * Creates a card element for a GitHub repository
 * @param {Object} repo - Repository data from GitHub API
 * @returns {HTMLElement}
 */
function createGitHubRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'github-repo';
    
    const language = repo.language || 'N/A';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    
    card.innerHTML = `
        <div>
            <h4>
                <i class="fas fa-code-branch"></i>
                <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
            </h4>
            <p>${repo.description || 'No description provided'}</p>
            <div class="github-repo-stats">
                <span><i class="fas fa-code"></i> ${language}</span>
                <span><i class="fas fa-star"></i> ${stars} Stars</span>
                <span><i class="fas fa-code-branch"></i> ${forks} Forks</span>
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// 2. EMAILJS INTEGRATION
// ============================================

// Initialize EmailJS
// Replace with your actual Public Key from EmailJS
const EMAILJS_PUBLIC_KEY = '92y8BwA5JXl9ehFDc';
const EMAILJS_SERVICE_ID = 'service_iexfwj4';
const EMAILJS_CONTACT_TEMPLATE = 'template_4a2090c';
const EMAILJS_INQUIRY_TEMPLATE = 'template_4a2090c';

// Helper to load EmailJS dynamically
function loadEmailJS() {
    return new Promise(resolve => {
        if (window.emailjs) return resolve(window.emailjs);
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        script.onload = () => {
            window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
            resolve(window.emailjs);
        };
        script.onerror = () => resolve(null);
        document.head.appendChild(script);
    });
}

// For demo purposes, we'll simulate EmailJS
let emailJSInitialized = false;

/**
 * Initialize EmailJS service
 */
async function initializeEmailJS() {
    const ejs = await loadEmailJS();
    if (ejs) {
        emailJSInitialized = true;
        console.log('[v0] EmailJS initialized successfully');
    } else {
        console.warn('[v0] EmailJS not configured. Using simulation mode.');
        emailJSInitialized = false;
    }
}

/**
 * Send contact form email via EmailJS
 * @param {Object} formData - Form data to send
 * @returns {Promise<Object>}
 */
async function sendContactEmail(formData) {
    console.log('[v0] Contact Email - Processing:', formData.email);

    if (emailJSInitialized && typeof emailjs !== 'undefined') {
        try {
            const result = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_CONTACT_TEMPLATE,
                {
                    to_email: 'jailenannm@gmail.com',
                    from_email: formData.email,
                    from_name: formData.name,
                    reply_to: formData.email,
                    message: formData.message,
                    phone: formData.phone || 'Not provided',
                    timestamp: new Date().toLocaleString()
                }
            );
            console.log('[v0] EmailJS Contact Form - Success:', result.status);
            return { success: true, message: 'Email sent successfully!' };
        } catch (error) {
            console.error('[v0] EmailJS Contact Form - Error:', error);
            return { success: false, error: error.text || 'Failed to send email' };
        }
    } else {
        // Simulation mode
        return simulateEmailSend('contact', formData);
    }
}

/**
 * Send project inquiry email via EmailJS
 * @param {Object} formData - Form data to send
 * @returns {Promise<Object>}
 */
async function sendInquiryEmail(formData) {
    console.log('[v0] Inquiry Email - Processing:', formData.email);

    if (emailJSInitialized && typeof emailjs !== 'undefined') {
        try {
            const result = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_INQUIRY_TEMPLATE,
                {
                    to_email: 'jailenannm@gmail.com',
                    from_email: formData.email,
                    from_name: formData.name,
                    company: formData.company || 'Not specified',
                    budget: formData.budget,
                    project_name: formData.projectName,
                    details: formData.details,
                    reply_to: formData.email,
                    timestamp: new Date().toLocaleString()
                }
            );
            console.log('[v0] EmailJS Inquiry Form - Success:', result.status);
            return { success: true, message: 'Inquiry submitted successfully!' };
        } catch (error) {
            console.error('[v0] EmailJS Inquiry Form - Error:', error);
            return { success: false, error: error.text || 'Failed to submit inquiry' };
        }
    } else {
        // Simulation mode
        return simulateEmailSend('inquiry', formData);
    }
}

/**
 * Simulate email sending for demo purposes
 * @param {string} type - Type of email (contact or inquiry)
 * @param {Object} data - Email data
 * @returns {Promise<Object>}
 */
function simulateEmailSend(type, data) {
    return new Promise((resolve) => {
        // Simulate API call delay
        setTimeout(() => {
            console.log('[v0] Email Simulation - Type:', type);
            console.log('[v0] Email Simulation - Data:', data);
            
            // Simulate success (90% chance)
            if (Math.random() > 0.1) {
                console.log('[v0] Email Simulation - Success');
                resolve({
                    success: true,
                    message: `${type === 'contact' ? 'Message' : 'Inquiry'} sent successfully! (Simulated)`,
                    simulation: true
                });
            } else {
                console.log('[v0] Email Simulation - Failed');
                resolve({
                    success: false,
                    error: 'Simulated error: Please try again later',
                    simulation: true
                });
            }
        }, 1500);
    });
}

// ============================================
// 3. LOCAL DATA STORAGE (Transaction Simulation)
// ============================================

/**
 * Store transaction data to simulate database storage
 * @param {string} type - Type of transaction (contact or inquiry)
 * @param {Object} data - Transaction data
 * @returns {boolean}
 */
function storeTransactionData(type, data) {
    try {
        const transactions = JSON.parse(localStorage.getItem('portfolioTransactions') || '[]');
        
        const transaction = {
            id: Date.now(),
            type: type,
            data: data,
            timestamp: new Date().toISOString(),
            status: 'completed'
        };
        
        transactions.push(transaction);
        localStorage.setItem('portfolioTransactions', JSON.stringify(transactions));
        
        console.log('[v0] Transaction Stored:', type, '- ID:', transaction.id);
        return true;
    } catch (error) {
        console.error('[v0] Error storing transaction:', error);
        return false;
    }
}

/**
 * Retrieve all transaction data
 * @returns {Array}
 */
function getTransactionData() {
    try {
        return JSON.parse(localStorage.getItem('portfolioTransactions') || '[]');
    } catch (error) {
        console.error('[v0] Error retrieving transactions:', error);
        return [];
    }
}

/**
 * Clear all transaction data
 */
function clearTransactionData() {
    localStorage.removeItem('portfolioTransactions');
    console.log('[v0] Transaction data cleared');
}

// ============================================
// 4. API STATUS AND UTILITY FUNCTIONS
// ============================================

/**
 * Get API configuration status
 * @returns {Object}
 */
function getAPIStatus() {
    return {
        github: {
            name: 'GitHub API',
            endpoint: 'https://github.com/jailenannm-web',
            status: 'Ready',
            description: 'Fetches GitHub repositories and user data'
        },
        emailjs: {
            name: 'EmailJS API',
            status: emailJSInitialized ? 'Configured' : 'Simulation Mode',
            description: 'Sends transactional emails via forms'
        },
        maps: {
            name: 'Leaflet Maps API',
            endpoint: 'https://www.openstreetmap.org',
            status: 'Ready',
            description: 'Displays interactive map with location marker'
        },
        localStorage: {
            name: 'Local Storage',
            status: 'Active',
            description: 'Stores transaction data locally'
        }
    };
}

/**
 * Log all API information
 */
function logAPIInformation() {
    console.group('🔗 Portfolio API Integration Status');
    console.log('APIs loaded and initialized:');
    console.table(getAPIStatus());
    console.log('For full documentation, see README.md');
    console.groupEnd();
}

// Initialize on script load
initializeEmailJS();

// Log API info on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', logAPIInformation);
} else {
    logAPIInformation();
}
