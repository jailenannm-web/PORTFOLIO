# Demo Data & Sample Submissions Guide

This guide provides sample data for testing all features of the portfolio website.

---

## Contact Form - Sample Submissions

Use these data sets to test the contact form validation and submission.

### Sample 1: Professional Inquiry
```
Name: Maria Garcia
Email: maria.garcia@company.com
Phone: +63 921 234 5678
Message: I'm very impressed with your portfolio and technical skills demonstrated in your projects. I would like to discuss potential collaboration opportunities for web application development. Please let me know your availability for a meeting this month.
```

**Expected Result:** ✓ Success - Form submits and stores data

---

### Sample 2: Minimal Submission
```
Name: John Smith
Email: john@email.com
Phone: [empty]
Message: Hi! I think your work is great. Would love to collaborate in the future!
```

**Expected Result:** ✓ Success - Phone is optional, form submits

---

### Sample 3: Extended Message
```
Name: Dr. Sarah Johnson
Email: sarah.johnson@university.edu
Phone: +1 (212) 555-8800
Message: Dear Jailen, I am reaching out regarding a unique opportunity at our institution. We are looking to build a comprehensive student management system and would like to leverage your skills in database design and full-stack development. Your portfolio demonstrates excellent understanding of both frontend and backend technologies. We would appreciate discussing the technical requirements and timeline for this project. Please contact us at your earliest convenience.
```

**Expected Result:** ✓ Success - Long message is valid (10-5000 chars allowed)

---

### Sample 4: Test Validation - Invalid Data

#### Invalid Email
```
Name: Test User
Email: notanemail
Phone: 123
Message: This should show an email error
```

**Expected Result:** ✗ Error - "Please enter a valid email address"

---

#### Message Too Short
```
Name: Test
Email: test@example.com
Phone: [empty]
Message: Short
```

**Expected Result:** ✗ Error - "Message must be at least 10 characters long"

---

#### Name Too Short
```
Name: J
Email: john@example.com
Phone: [empty]
Message: This is a test message that is long enough
```

**Expected Result:** ✗ Error - "Name must be between 2 and 100 characters"

---

## Project Inquiry Form - Sample Submissions

Use these data sets to test the inquiry form for different projects.

### Inquiry 1: Student Management System - Startup
```
Project: Student Management System
Name: Alex Thompson
Email: alex@startupventure.com
Company: StartUp Venture Inc.
Budget: Under $1,000
Details: We're a small startup looking to build a basic student management system for our online tutoring platform. We need features for student registration, course enrollment, and simple grade tracking. Timeline is flexible - we can work with what fits your schedule.
```

**Expected Result:** ✓ Success - Inquiry submitted and stored

---

### Inquiry 2: Online Portfolio Website - Enterprise
```
Project: Online Portfolio Website
Name: Catherine Lee
Email: catherine.lee@megacorp.com
Company: MegaCorp Digital Solutions
Budget: $5,000 - $10,000
Details: We need to build multiple professional portfolio websites for our company's design team. Each portfolio should showcase projects, have contact forms, integrate with GitHub, and be fully responsive. We need it completed within 6 weeks. The design should be modern and reflect our brand identity. We also require integration with our email notification system and analytics dashboard.
```

**Expected Result:** ✓ Success - Inquiry submitted and stored

---

### Inquiry 3: Inventory Management System - Large Company
```
Project: Inventory Management System
Name: Michael Chen
Email: m.chen@enterprise.corp
Company: Enterprise Corp - Supply Chain Division
Budget: Above $10,000
Details: Our organization needs a comprehensive inventory management system to track products across multiple warehouses. Requirements include: Real-time stock monitoring, automated reorder alerts, supplier integration, barcode scanning support, advanced reporting with charts and analytics, multi-user access with role-based permissions, mobile app support, and API integration with our existing ERP system. We need this fully integrated and ready for deployment in 3 months. Team of 3 developers would be ideal.
```

**Expected Result:** ✓ Success - High-budget inquiry submitted and stored

---

### Inquiry 4: Minimal Information
```
Project: Student Management System
Name: Bob Wilson
Email: bob@email.com
Company: [empty]
Budget: $1,000 - $5,000
Details: We need a student management system. Simple features needed. Please provide a quote.
```

**Expected Result:** ✗ Error - "Project details must be at least 20 characters"

---

### Inquiry 5: No Budget Selected
```
Project: Online Portfolio Website
Name: Lisa Anderson
Email: lisa.anderson@company.com
Company: Digital Agency
Budget: [Not selected]
Details: We want to create a stunning portfolio website that will impress our clients and showcase our work. Please provide your rate and availability.
```

**Expected Result:** ✗ Error - "Please select a budget range"

---

## Data Validation Testing

### Phone Number Tests

#### Valid Phone Numbers (should pass)
- `+1 (555) 123-4567`
- `555-123-4567`
- `5551234567`
- `+63 9123456789`
- `(555) 123-4567`
- `+1-555-123-4567`

#### Invalid Phone Numbers (should fail)
- `abc` - Letters only
- `12345` - Too short (< 7 digits)
- `@@@-@@@@` - Invalid characters
- `55` - Too short

---

### Email Validation Tests

#### Valid Email Addresses (should pass)
- `john@example.com`
- `user.name@company.co.uk`
- `test+tag@email.com`
- `a@b.io`

#### Invalid Email Addresses (should fail)
- `notanemail` - No @ symbol
- `test@` - No domain
- `@example.com` - No local part
- `user @example.com` - Space in email
- `test@domain` - No TLD

---

### Name Validation Tests

#### Valid Names (should pass)
- `John Doe`
- `Maria Garcia`
- `Dr. Sarah Johnson`
- `Anne-Marie Smith`
- `李 明` (non-English names also supported)

#### Invalid Names (should fail)
- `J` - Too short (1 character)
- `` - Empty field
- `This is a very long name that exceeds the maximum allowed length of 100 characters and should be rejected` - Too long

---

### Message Validation Tests

#### Valid Messages (should pass, 10-5000 chars)
- `Hello, I wanted to reach out about your portfolio.` (52 chars ✓)
- `Hi!` - Nope, too short ✗
- `This is a longer test message...` (anything >= 10 chars ✓)

#### Invalid Messages (should fail)
- `Short` - 5 characters, needs 10+ ✗
- `` - Empty field ✗
- [Message with 5001+ characters] - Exceeds limit ✗

---

### Details Validation Tests (Inquiry Form)

#### Valid Details (should pass, 20-5000 chars)
- `We need a comprehensive system for managing student records.` (61 chars ✓)
- `Short` - Too short, needs 20+ ✗
- [Anything 20-5000 characters] ✓

#### Invalid Details (should fail)
- `Need a system` - 13 characters, needs 20+ ✗
- `` - Empty field ✗
- [More than 5000 characters] - Exceeds limit ✗

---

## Testing Scenarios

### Scenario 1: Complete Happy Path
1. Fill contact form with all valid data
2. Submit form
3. ✓ Success message appears
4. ✓ Data stored in localStorage
5. ✓ Modal closes after 3 seconds

**Testing Data:**
```javascript
// Contact Form
name: "Jane Doe"
email: "jane@example.com"
phone: "+1 (555) 987-6543"
message: "I'm interested in discussing your development services and would like to know more about your availability."
```

---

### Scenario 2: Validation Error Recovery
1. Submit contact form with empty Name
2. ✗ Error message appears: "Name is required"
3. Enter a valid name "John Smith"
4. Error clears automatically
5. Click Submit
6. ✓ Form submits successfully

**Testing Data:**
```javascript
// First attempt
name: ""
email: "john@example.com"
phone: ""
message: "Test message content"

// After error, fill name
name: "John Smith"
// Submit again - should succeed
```

---

### Scenario 3: Multiple Submissions
1. Submit contact form (first time)
2. ✓ Success, modal closes
3. Click "Get In Touch" again
4. Form is empty (reset)
5. Submit again with different data
6. ✓ Second submission succeeds
7. Check localStorage - both submissions stored

**localStorage should contain:**
```json
[
  {
    "id": 1704067200000,
    "type": "contact",
    "data": {"name": "John Doe", ...},
    "timestamp": "2024-01-01T12:00:00.000Z"
  },
  {
    "id": 1704067260000,
    "type": "contact",
    "data": {"name": "Jane Smith", ...},
    "timestamp": "2024-01-01T12:01:00.000Z"
  }
]
```

---

### Scenario 4: Mixed Form Tests
1. Contact form - submit successfully
2. Go to Projects section
3. Inquiry form - submit successfully on different projects
4. Check localStorage - should have mixed types

**localStorage should contain:**
```json
[
  {"type": "contact", "data": {...}},
  {"type": "inquiry", "data": {...}},
  {"type": "inquiry", "data": {...}}
]
```

---

## API Response Examples

### GitHub API Response Example
```json
{
  "name": "portfolio-website",
  "description": "Personal responsive portfolio with API integrations",
  "html_url": "https://github.com/user/portfolio-website",
  "language": "JavaScript",
  "stargazers_count": 8,
  "forks_count": 2,
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

### EmailJS Simulation Response
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully. (Simulated)",
  "simulation": true,
  "id": 1704067200000,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

### Local Storage Data Example
```json
{
  "id": 1704067200000,
  "type": "contact",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "message": "I'm very impressed with your portfolio."
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "status": "completed"
}
```

---

## Browser Console Commands for Testing

### View All Submitted Data
```javascript
console.log(JSON.parse(localStorage.getItem('portfolioTransactions')));
```

### View in Table Format
```javascript
console.table(JSON.parse(localStorage.getItem('portfolioTransactions')));
```

### View Contact Submissions Only
```javascript
const data = JSON.parse(localStorage.getItem('portfolioTransactions'));
const contacts = data.filter(d => d.type === 'contact');
console.table(contacts);
```

### View Inquiry Submissions Only
```javascript
const data = JSON.parse(localStorage.getItem('portfolioTransactions'));
const inquiries = data.filter(d => d.type === 'inquiry');
console.table(inquiries);
```

### Clear All Data
```javascript
localStorage.removeItem('portfolioTransactions');
console.log('Data cleared');
```

### Get Count of Submissions
```javascript
const data = JSON.parse(localStorage.getItem('portfolioTransactions')) || [];
console.log(`Total submissions: ${data.length}`);
console.log(`Contacts: ${data.filter(d => d.type === 'contact').length}`);
console.log(`Inquiries: ${data.filter(d => d.type === 'inquiry').length}`);
```

### View Last Submission
```javascript
const data = JSON.parse(localStorage.getItem('portfolioTransactions')) || [];
if (data.length > 0) {
  console.table([data[data.length - 1]]);
}
```

---

## Common Test Results

### ✓ Successful Contact Form
```
Email sent to: jailen@example.com
From: john@example.com
Subject: Contact Form Submission
Status: Completed
Stored in localStorage: Yes
```

---

### ✗ Failed Validation
```
Field: Email
Error: "Please enter a valid email address"
User Input: "notvalid"
Status: Form not submitted
```

---

### ✓ Successful Inquiry
```
Project: Student Management System
Inquiry from: jane@company.com
Budget: $5,000 - $10,000
Status: Completed
Stored in localStorage: Yes
```

---

## Integration Test Data

### GitHub API Test
```
Username: jailenann
Expected Repositories: 0-6
Expected Response Time: < 1 second
Status: Working
```

---

### Maps Integration Test
```
Location: Labo, Camarines Norte
Coordinates: [14.1995, 122.5705]
Zoom Level: 13
Status: Interactive (zoom/pan working)
```

---

## Performance Test Data

### Load Time Test
```
First Page Load: < 3 seconds
API Response: 1-2 seconds
Form Submission: < 100ms
Map Rendering: < 2 seconds
```

---

## Real-World Scenarios

### Scenario A: Student Asking About Portfolio
```
Name: Michael Chen
Email: chen.michael@school.edu
Phone: +63 917 555 0123
Message: Hi Jailen! I'm a fellow BSIT student and I'm really impressed by your portfolio. How did you manage to integrate three different APIs? I'd love to pick your brain about your development process and maybe collaborate on a project.
```

---

### Scenario B: Freelance Client Looking for Work
```
Name: Angela Reyes
Email: angela@digitalagency.ph
Company: Digital Agency Solutions
Budget: $5,000 - $10,000
Details: We're looking for a junior developer to join our team for a 3-month contract. We need someone who can build responsive websites, work with APIs, and handle databases. Based on your portfolio, you seem like a great fit. We're looking to start immediately and can offer flexible arrangements.
```

---

### Scenario C: Internship Opportunity
```
Name: Director of HR
Email: hr@techcompany.com
Company: Tech Solutions Inc.
Project: Online Portfolio Website
Budget: $1,000 - $5,000
Details: We are currently offering internship positions for talented BSIT students. Your portfolio demonstrates excellent technical skills. We would like to discuss an internship opportunity that could lead to a full-time position. Please contact us for more details about salary, benefits, and job responsibilities.
```

---

## Testing Checklist with Sample Data

- [ ] Submit contact form with Sample 1 data
- [ ] Verify success message displays
- [ ] Check localStorage contains submission
- [ ] Submit inquiry form with Inquiry 1 data
- [ ] Test validation with invalid phone number
- [ ] Test validation with too-short message
- [ ] Test validation with invalid email
- [ ] Submit multiple forms and verify all stored
- [ ] Clear localStorage and verify forms still work
- [ ] Check GitHub API with valid username
- [ ] View map and interact with zoom/pan
- [ ] Test responsive design on mobile view

---

**Last Updated:** February 2024

*All data provided is for testing and demonstration purposes only.*

