/**
 * Form Management Module
 * Handles form validation, submission, and transaction processing
 */

// ============================================
// FORM VALIDATION FUNCTIONS
// ============================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
function validatePhone(phone) {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 7;
}

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {boolean}
 */
function validateName(name) {
    return name.trim().length >= 2 && name.trim().length <= 100;
}

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean}
 */
function isRequired(value) {
    return value.trim().length > 0;
}

/**
 * Validate minimum text length
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length required
 * @returns {boolean}
 */
function validateMinLength(text, minLength) {
    return text.trim().length >= minLength;
}

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('[v0] Contact Form - Submission initiated');

        // Clear previous messages
        document.getElementById('contactSuccess').style.display = 'none';
        document.getElementById('contactError').style.display = 'none';
        clearFormErrors('contact');

        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const message = document.getElementById('contactMessage').value;

        // Validate form
        const validation = validateContactForm(name, email, phone, message);

        if (!validation.isValid) {
            displayContactFormErrors(validation.errors);
            console.log('[v0] Contact Form - Validation failed');
            return;
        }

        console.log('[v0] Contact Form - Validation passed');

        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Prepare form data
            const formData = {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                message: message.trim()
            };

            // Store transaction data (simulated database)
            const stored = storeTransactionData('contact', formData);
            console.log('[v0] Contact Form - Data stored:', stored);

            // Send email via EmailJS (or simulation)
            const emailResult = await sendContactEmail(formData);

            if (emailResult.success) {
                // Show success message
                document.getElementById('contactSuccess').style.display = 'flex';
                contactForm.reset();
                console.log('[v0] Contact Form - Submission successful');

                // Close modal after 3 seconds
                setTimeout(() => {
                    document.getElementById('contactModal').style.display = 'none';
                }, 3000);
            } else {
                // Show error message
                document.getElementById('contactErrorText').textContent = 
                    emailResult.error || 'An error occurred. Please try again.';
                document.getElementById('contactError').style.display = 'flex';
                console.error('[v0] Contact Form - Email send failed');
            }
        } catch (error) {
            console.error('[v0] Contact Form - Submission error:', error);
            document.getElementById('contactErrorText').textContent = 
                'An unexpected error occurred. Please try again later.';
            document.getElementById('contactError').style.display = 'flex';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

/**
 * Validate contact form data
 * @param {string} name - Full name
 * @param {string} email - Email address
 * @param {string} phone - Phone number
 * @param {string} message - Message content
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
function validateContactForm(name, email, phone, message) {
    const errors = {};

    if (!isRequired(name)) {
        errors.name = 'Name is required';
    } else if (!validateName(name)) {
        errors.name = 'Name must be between 2 and 100 characters';
    }

    if (!isRequired(email)) {
        errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (phone && !validatePhone(phone)) {
        errors.phone = 'Please enter a valid phone number';
    }

    if (!isRequired(message)) {
        errors.message = 'Message is required';
    } else if (!validateMinLength(message, 10)) {
        errors.message = 'Message must be at least 10 characters long';
    } else if (message.length > 5000) {
        errors.message = 'Message must not exceed 5000 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Display contact form validation errors
 * @param {Object} errors - Validation errors
 */
function displayContactFormErrors(errors) {
    const fieldMap = {
        name: 'contactName',
        email: 'contactEmail',
        phone: 'contactPhone',
        message: 'contactMessage'
    };

    for (const [field, message] of Object.entries(errors)) {
        const fieldId = fieldMap[field];
        if (fieldId) {
            const input = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${field}Error`);
            
            if (input && errorElement) {
                input.classList.add('error');
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        }
    }
}

// ============================================
// PROJECT INQUIRY FORM VALIDATION & SUBMISSION
// ============================================

const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('[v0] Inquiry Form - Submission initiated');

        // Clear previous messages
        document.getElementById('inquirySuccess').style.display = 'none';
        document.getElementById('inquiryError').style.display = 'none';
        clearFormErrors('inquiry');

        // Get form values
        const name = document.getElementById('inquiryName').value;
        const email = document.getElementById('inquiryEmail').value;
        const company = document.getElementById('inquiryCompany').value;
        const budget = document.getElementById('inquiryBudget').value;
        const details = document.getElementById('inquiryDetails').value;
        const projectName = document.getElementById('projectName').textContent.replace('Inquiring about: ', '');

        // Validate form
        const validation = validateInquiryForm(name, email, budget, details);

        if (!validation.isValid) {
            displayInquiryFormErrors(validation.errors);
            console.log('[v0] Inquiry Form - Validation failed');
            return;
        }

        console.log('[v0] Inquiry Form - Validation passed');

        // Disable submit button
        const submitBtn = inquiryForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        try {
            // Prepare form data
            const formData = {
                name: name.trim(),
                email: email.trim(),
                company: company.trim(),
                budget: budget,
                details: details.trim(),
                projectName: projectName
            };

            // Store transaction data (simulated database)
            const stored = storeTransactionData('inquiry', formData);
            console.log('[v0] Inquiry Form - Data stored:', stored);

            // Send email via EmailJS (or simulation)
            const emailResult = await sendInquiryEmail(formData);

            if (emailResult.success) {
                // Show success message
                document.getElementById('inquirySuccess').style.display = 'flex';
                inquiryForm.reset();
                console.log('[v0] Inquiry Form - Submission successful');

                // Close modal after 3 seconds
                setTimeout(() => {
                    document.getElementById('inquiryModal').style.display = 'none';
                }, 3000);
            } else {
                // Show error message
                document.getElementById('inquiryErrorText').textContent = 
                    emailResult.error || 'An error occurred. Please try again.';
                document.getElementById('inquiryError').style.display = 'flex';
                console.error('[v0] Inquiry Form - Email send failed');
            }
        } catch (error) {
            console.error('[v0] Inquiry Form - Submission error:', error);
            document.getElementById('inquiryErrorText').textContent = 
                'An unexpected error occurred. Please try again later.';
            document.getElementById('inquiryError').style.display = 'flex';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

/**
 * Validate inquiry form data
 * @param {string} name - Full name
 * @param {string} email - Email address
 * @param {string} budget - Budget range
 * @param {string} details - Project details
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
function validateInquiryForm(name, email, budget, details) {
    const errors = {};

    if (!isRequired(name)) {
        errors.name = 'Name is required';
    } else if (!validateName(name)) {
        errors.name = 'Name must be between 2 and 100 characters';
    }

    if (!isRequired(email)) {
        errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
        errors.email = 'Please enter a valid email address';
    }

    if (!isRequired(budget)) {
        errors.budget = 'Please select a budget range';
    }

    if (!isRequired(details)) {
        errors.details = 'Project details are required';
    } else if (!validateMinLength(details, 20)) {
        errors.details = 'Project details must be at least 20 characters long';
    } else if (details.length > 5000) {
        errors.details = 'Project details must not exceed 5000 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Display inquiry form validation errors
 * @param {Object} errors - Validation errors
 */
function displayInquiryFormErrors(errors) {
    const fieldMap = {
        name: 'inquiryName',
        email: 'inquiryEmail',
        budget: 'inquiryBudget',
        details: 'inquiryDetails'
    };

    for (const [field, message] of Object.entries(errors)) {
        const fieldId = fieldMap[field];
        if (fieldId) {
            const input = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${field}Error`);
            
            if (input && errorElement) {
                input.classList.add('error');
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        }
    }
}

// ============================================
// REAL-TIME FORM VALIDATION
// ============================================

// Contact form real-time validation
['contactName', 'contactEmail', 'contactPhone', 'contactMessage'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', () => {
            validateContactField(fieldId);
        });

        field.addEventListener('input', () => {
            // Clear error on input if field becomes valid
            if (field.classList.contains('error')) {
                const errorElement = document.getElementById(`${fieldId.replace('contact', '').toLowerCase()}Error`);
                if (errorElement && errorElement.textContent === '') {
                    field.classList.remove('error');
                }
            }
        });
    }
});

// Inquiry form real-time validation
['inquiryName', 'inquiryEmail', 'inquiryBudget', 'inquiryDetails'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', () => {
            validateInquiryField(fieldId);
        });

        field.addEventListener('input', () => {
            // Clear error on input if field becomes valid
            if (field.classList.contains('error')) {
                const errorElement = document.getElementById(`${fieldId.replace('inquiry', '').toLowerCase()}Error`);
                if (errorElement && errorElement.textContent === '') {
                    field.classList.remove('error');
                }
            }
        });
    }
});

/**
 * Validate individual contact form field
 * @param {string} fieldId - Field ID to validate
 */
function validateContactField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId.replace('contact', '').toLowerCase()}Error`);
    
    if (!field || !errorElement) return;

    let isValid = true;
    let errorMessage = '';

    const value = field.value;
    const fieldName = fieldId.replace('contact', '').toLowerCase();

    if (fieldName === 'name') {
        if (!isRequired(value)) {
            isValid = false;
            errorMessage = 'Name is required';
        } else if (!validateName(value)) {
            isValid = false;
            errorMessage = 'Name must be between 2 and 100 characters';
        }
    } else if (fieldName === 'email') {
        if (!isRequired(value)) {
            isValid = false;
            errorMessage = 'Email is required';
        } else if (!validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (fieldName === 'phone') {
        if (value && !validatePhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    } else if (fieldName === 'message') {
        if (!isRequired(value)) {
            isValid = false;
            errorMessage = 'Message is required';
        } else if (!validateMinLength(value, 10)) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

/**
 * Validate individual inquiry form field
 * @param {string} fieldId - Field ID to validate
 */
function validateInquiryField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId.replace('inquiry', '').toLowerCase()}Error`);
    
    if (!field || !errorElement) return;

    let isValid = true;
    let errorMessage = '';

    const value = field.value;
    const fieldName = fieldId.replace('inquiry', '').toLowerCase();

    if (fieldName === 'name') {
        if (!isRequired(value)) {
            isValid = false;
            errorMessage = 'Name is required';
        } else if (!validateName(value)) {
            isValid = false;
            errorMessage = 'Name must be between 2 and 100 characters';
        }
    } else if (fieldName === 'email') {
        if (!isRequired(value)) {
            isValid = false;
            errorMessage = 'Email is required';
        } else if (!validateEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (fieldName === 'budget') {
        if (!isRequired(value)) {
            isValid = false;
            errorMessage = 'Please select a budget range';
        }
    } else if (fieldName === 'details') {
        if (!isRequired(value)) {
            isValid = false;
            errorMessage = 'Project details are required';
        } else if (!validateMinLength(value, 20)) {
            isValid = false;
            errorMessage = 'Project details must be at least 20 characters';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// ============================================
// FORM SUBMISSION HANDLERS
// ============================================

/**
 * Handle contact form submission
 * @param {Event} event - Form submission event
 */
async function handleContactSubmit(event) {
    event.preventDefault();
    console.log('[v0] Contact form submission initiated');

    // Get form elements
    const form = event.target;
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;
    const responseDiv = document.getElementById('contactResponse');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validate form
    const validation = validateContactForm(name, email, phone, message);
    if (!validation.isValid) {
        displayContactFormErrors(validation.errors);
        console.log('[v0] Contact form validation failed');
        return;
    }

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // Send email
        const result = await sendContactEmail({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim()
        });

        if (result.success) {
            responseDiv.innerHTML = '<div style="color: #ff8c00; padding: 1rem; background: rgba(255,140,0,0.1); border-radius: 8px; border-left: 4px solid #ff8c00; margin-top: 1rem;">✓ Message sent successfully! Thank you for reaching out.</div>';
            form.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                document.getElementById('contactModal').style.display = 'none';
                responseDiv.innerHTML = '';
            }, 2000);
        } else {
            responseDiv.innerHTML = '<div style="color: #ff6600; padding: 1rem; background: rgba(255,102,0,0.1); border-radius: 8px; border-left: 4px solid #ff6600; margin-top: 1rem;">✗ ' + (result.error || 'Failed to send message') + '</div>';
        }
    } catch (error) {
        console.error('[v0] Contact form error:', error);
        responseDiv.innerHTML = '<div style="color: #ff6600; padding: 1rem; background: rgba(255,102,0,0.1); border-radius: 8px; border-left: 4px solid #ff6600; margin-top: 1rem;">✗ An error occurred. Please try again.</div>';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/**
 * Handle project inquiry form submission
 * @param {Event} event - Form submission event
 */
async function handleInquirySubmit(event) {
    event.preventDefault();
    console.log('[v0] Inquiry form submission initiated');

    // Get form elements
    const form = event.target;
    const name = document.getElementById('inquiryName').value;
    const email = document.getElementById('inquiryEmail').value;
    const company = document.getElementById('inquiryCompany').value;
    const budget = document.getElementById('inquiryBudget').value;
    const details = document.getElementById('inquiryDetails').value;
    const responseDiv = document.getElementById('inquiryResponse');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validate form
    const validation = validateInquiryForm(name, email, budget, details);
    if (!validation.isValid) {
        displayInquiryFormErrors(validation.errors);
        console.log('[v0] Inquiry form validation failed');
        return;
    }

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        // Send email
        const result = await sendInquiryEmail({
            name: name.trim(),
            email: email.trim(),
            company: company.trim(),
            budget: budget,
            details: details.trim()
        });

        if (result.success) {
            responseDiv.innerHTML = '<div style="color: #ff8c00; padding: 1rem; background: rgba(255,140,0,0.1); border-radius: 8px; border-left: 4px solid #ff8c00; margin-top: 1rem;">✓ Inquiry submitted successfully! I\'ll review it shortly.</div>';
            form.reset();
            
            // Close modal after 2 seconds
            setTimeout(() => {
                document.getElementById('inquiryModal').style.display = 'none';
                responseDiv.innerHTML = '';
            }, 2000);
        } else {
            responseDiv.innerHTML = '<div style="color: #ff6600; padding: 1rem; background: rgba(255,102,0,0.1); border-radius: 8px; border-left: 4px solid #ff6600; margin-top: 1rem;">✗ ' + (result.error || 'Failed to submit inquiry') + '</div>';
        }
    } catch (error) {
        console.error('[v0] Inquiry form error:', error);
        responseDiv.innerHTML = '<div style="color: #ff6600; padding: 1rem; background: rgba(255,102,0,0.1); border-radius: 8px; border-left: 4px solid #ff6600; margin-top: 1rem;">✗ An error occurred. Please try again.</div>';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/**
 * Clear all form errors
 * @param {string} formType - 'contact' or 'inquiry'
 */
function clearFormErrors(formType) {
    const prefix = formType === 'contact' ? 'contact' : 'inquiry';
    const errorElements = document.querySelectorAll(`[id$="Error"][id^="${prefix}"]`);
    errorElements.forEach(el => {
        el.textContent = '';
        el.classList.remove('show');
    });
    const inputs = document.querySelectorAll(`#${prefix}Name, #${prefix}Email, #${prefix}Phone, #${prefix}Message, #${prefix}Budget, #${prefix}Details`);
    inputs.forEach(input => {
        if (input) input.classList.remove('error');
    });
}

console.log('[v0] Form validation module loaded');
