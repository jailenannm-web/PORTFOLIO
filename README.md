# Professional Portfolio Website - Jailen Ann A. Mostoles

## Project Overview

This is a comprehensive, fully responsive professional portfolio website built with pure HTML, CSS, and JavaScript. The portfolio showcases the skills, projects, and professional background of **Jailen Ann A. Mostoles**, a Bachelor of Science in Information Technology (BSIT) student from Camarines Norte State College.

The project demonstrates advanced web development skills including API integration, form validation, transaction processing, and modern web design principles.

### Key Features
- ✅ **One-Page Responsive Design** - 4 main sections (Home, About, Skills, Projects)
- ✅ **3 API Integrations** - GitHub, EmailJS, and Leaflet Maps
- ✅ **2 Transaction Features** - Contact Form and Project Inquiry Form
- ✅ **Complete Form Validation** - Real-time and on-submit validation
- ✅ **Mobile-Friendly** - Fully responsive design for all devices
- ✅ **Professional UI/UX** - Modern design with smooth animations
- ✅ **No Broken Links** - All navigation and buttons are functional

---

## Technologies Used

### Core Technologies
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling, flexbox, grid, and animations
- **JavaScript (ES6+)** - Modern JavaScript with async/await

### External Libraries & APIs
- **Font Awesome** - Icon library for visual elements
- **Leaflet.js** - Interactive mapping library
- **OpenStreetMap** - Free map provider
- **EmailJS** - Email delivery service (optional configuration)

### Third-Party API Integrations
1. **GitHub API** - Fetch and display user repositories
2. **EmailJS API** - Send transactional emails (with simulation fallback)
3. **Leaflet Maps API** - Display interactive location map

---

## API Integrations Guide

### 1. GitHub API

**Purpose:** Fetches GitHub repositories to display recent projects

**Endpoint:** `https://api.github.com/users/{username}/repos`

**Configuration:**
```javascript
// In js/api.js
const GITHUB_USERNAME = 'jailenann'; // Replace with actual GitHub username
```

**Features:**
- Fetches up to 6 most recently updated repositories
- Displays repository name, description, language, stars, and forks
- Links directly to GitHub repository pages
- Error handling for API failures

**How to Use:**
1. Go to the Projects section
2. Click "Load My GitHub Projects" button
3. The API fetches and displays your repositories in real-time

**Example Response:**
```json
{
  "name": "portfolio-website",
  "description": "Personal responsive portfolio",
  "language": "JavaScript",
  "stargazers_count": 5,
  "forks_count": 2,
  "html_url": "https://github.com/user/repo"
}
```

---

### 2. EmailJS API

**Purpose:** Sends transactional emails from contact and inquiry forms

**Service:** EmailJS (https://www.emailjs.com/)

**Configuration Instructions:**

1. **Sign up for EmailJS:**
   - Visit https://www.emailjs.com/
   - Create a free account
   - Note your Public Key

2. **Add Email Service:**
   - Go to Email Services section
   - Create a new service (Gmail, Outlook, etc.)
   - Note the Service ID

3. **Create Email Templates:**
   - Create template for Contact Form
   - Create template for Inquiry Form
   - Note the Template IDs

4. **Update Configuration in js/api.js:**
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // From EmailJS account
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // From Email Services
   const EMAILJS_CONTACT_TEMPLATE = 'YOUR_CONTACT_TEMPLATE_ID';
   const EMAILJS_INQUIRY_TEMPLATE = 'YOUR_INQUIRY_TEMPLATE_ID';
   ```

5. **Simulation Mode:**
   - If EmailJS is not configured, the forms will use simulation mode
   - Simulated submissions will appear to succeed (90% success rate)
   - Actual data is still stored in local storage for demo purposes

**Features:**
- Real-time email validation
- Support for contact forms and project inquiry forms
- Automatic email to portfolio owner
- Reply-to email functionality
- Timestamps and metadata inclusion

**Test Submission:**
```javascript
// You can test with this data:
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+63 9123456789",
  message: "Your portfolio is impressive! I'd like to discuss a project."
}
```

---

### 3. Leaflet Maps API

**Purpose:** Display interactive map with location marker

**Provider:** OpenStreetMap (free and open-source)

**Configuration:**
```javascript
// In js/main.js - initializeMap()
const map = L.map('map').setView([14.1995, 122.5705], 13);
// Coordinates: Labo, Camarines Norte, Philippines
```

**Features:**
- Interactive map with zoom and pan capabilities
- Location marker with popup
- Responsive map sizing
- No API key required (uses OpenStreetMap)

**Location Information:**
- **Place:** Labo, Camarines Norte
- **Coordinates:** 14.1995°N, 122.5705°E
- **Region:** Bicol Region, Philippines

**How to Change Location:**
1. Find new latitude/longitude coordinates
2. Update in `js/main.js`:
   ```javascript
   L.map('map').setView([latitude, longitude], zoomLevel);
   L.marker([latitude, longitude]).addTo(map).bindPopup('<b>Location</b><br>Description');
   ```

---

## Transaction Features

### Transaction Feature #1: Contact Form Submission

**Purpose:** Allow visitors to send contact messages

**Location:** Click "Get In Touch" button on the website

**Form Fields:**
- Full Name (required, 2-100 characters)
- Email Address (required, valid email format)
- Phone Number (optional, valid phone format)
- Message (required, 10-5000 characters)

**Validation Rules:**
```javascript
// Name: 2-100 characters
// Email: Valid email format (example@domain.com)
// Phone: Valid phone format (optional)
// Message: 10-5000 characters minimum
```

**Data Flow:**
1. User fills out form
2. Real-time validation on blur
3. On submit: Complete validation
4. If valid: Attempt to send via EmailJS
5. Store in local storage (simulated database)
6. Show success or error message
7. Auto-close modal after 3 seconds

**Success Response:**
```
✓ Thank you! Your message has been sent successfully. I'll get back to you soon.
```

**Error Response:**
```
✗ [Error message explaining what went wrong]
```

**Data Stored (Local Storage):**
```json
{
  "id": 1703456789000,
  "type": "contact",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+63 9123456789",
    "message": "Your portfolio is great!"
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "status": "completed"
}
```

---

### Transaction Feature #2: Project Inquiry Form

**Purpose:** Allow potential clients to inquire about projects

**Location:** Click "Inquire" button on any project card

**Form Fields:**
- Full Name (required, 2-100 characters)
- Email Address (required, valid email format)
- Company/Organization (optional)
- Budget Range (required, dropdown selection)
- Project Details (required, 20-5000 characters)

**Budget Options:**
- Under $1,000
- $1,000 - $5,000
- $5,000 - $10,000
- Above $10,000

**Validation Rules:**
```javascript
// Name: 2-100 characters
// Email: Valid email format
// Budget: Must select one option
// Details: 20-5000 characters minimum
```

**Data Flow:**
1. User clicks "Inquire" button on project
2. Modal opens with selected project name
3. User fills out inquiry form
4. Real-time validation on blur
5. On submit: Complete validation
6. If valid: Attempt to send via EmailJS
7. Store in local storage
8. Show success or error message
9. Auto-close modal after 3 seconds

**Success Response:**
```
✓ Thank you! Your inquiry has been submitted successfully.
```

**Error Response:**
```
✗ [Error message explaining what went wrong]
```

**Data Stored (Local Storage):**
```json
{
  "id": 1703456789001,
  "type": "inquiry",
  "data": {
    "name": "Jane Smith",
    "email": "jane@company.com",
    "company": "TechCorp Inc.",
    "budget": "5000-10000",
    "details": "We need a student management system for our institution...",
    "projectName": "Student Management System"
  },
  "timestamp": "2024-01-01T12:30:00.000Z",
  "status": "completed"
}
```

---

## Form Validation Details

### Contact Form Validation

| Field | Required | Validation Rules | Error Message |
|-------|----------|------------------|----------------|
| Name | Yes | 2-100 characters | "Name must be between 2 and 100 characters" |
| Email | Yes | Valid email format | "Please enter a valid email address" |
| Phone | No | Valid phone format | "Please enter a valid phone number" |
| Message | Yes | 10-5000 characters | "Message must be at least 10 characters" |

### Project Inquiry Validation

| Field | Required | Validation Rules | Error Message |
|-------|----------|------------------|----------------|
| Name | Yes | 2-100 characters | "Name must be between 2 and 100 characters" |
| Email | Yes | Valid email format | "Please enter a valid email address" |
| Company | No | Any text | N/A |
| Budget | Yes | Must select option | "Please select a budget range" |
| Details | Yes | 20-5000 characters | "Project details must be at least 20 characters" |

### Validation Features

✅ **Real-time Validation**
- Validates on field blur
- Shows immediate feedback
- Error messages clear on valid input

✅ **Submit Validation**
- Complete validation before submission
- Displays all errors at once
- Prevents submission if invalid

✅ **Error Handling**
- Field highlighting with red border
- Error messages below each field
- Clear, user-friendly error text

✅ **Success Feedback**
- Green success box with check icon
- Auto-close modal after 3 seconds
- Form reset for new submission

---

## Data Storage & Simulation

### Local Storage Implementation

All transaction data is stored in the browser's local storage for demo purposes:

```javascript
// View stored transactions in browser console
console.log(JSON.parse(localStorage.getItem('portfolioTransactions')));
```

### Transaction Management

**Retrieve All Transactions:**
```javascript
const transactions = getTransactionData();
console.table(transactions);
```

**Clear All Transactions:**
```javascript
clearTransactionData();
```

### Simulated Database Structure

Each transaction includes:
- **ID:** Unique timestamp-based identifier
- **Type:** 'contact' or 'inquiry'
- **Data:** Full form data submitted
- **Timestamp:** ISO format timestamp
- **Status:** 'completed' (for future expansion)

---

## How to Run the Project

### Option 1: Direct File Access
1. Download all files from the repository
2. Open `index.html` in a web browser
3. Navigate through sections using the navigation menu

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Using Live Server (VS Code)
1. Install Live Server extension
2. Right-click index.html
3. Select "Open with Live Server"
```

Then open http://localhost:8000 in your browser

### Option 3: Deploy to Vercel
```bash
# Using Vercel CLI
vercel deploy

# Or connect GitHub repository to Vercel dashboard
```

---

## Project Structure

```
portfolio-website/
│
├── index.html              # Main HTML file with all sections
├── styles.css              # All styling and responsive design
├── README.md              # This documentation file
│
└── js/
    ├── main.js            # Main functionality, navigation, map initialization
    ├── api.js             # API integrations (GitHub, EmailJS, Maps)
    └── forms.js           # Form validation and submission handling
```

---

## File Descriptions

### index.html (365 lines)
Contains the complete page structure including:
- Navigation bar with responsive menu
- Hero section with introduction
- About me section with location map
- Skills section with categorized skills
- Projects section with project cards
- GitHub projects section
- Contact form modal
- Project inquiry modal
- Footer with social links

### styles.css (747 lines)
Complete styling including:
- CSS variables for colors and typography
- Responsive design with media queries
- Mobile-first approach
- Component styling (buttons, cards, forms, modals)
- Animation and transition effects
- Layout grids and flexbox

### js/main.js (112 lines)
Core functionality:
- Mobile menu toggle
- Navigation smooth scrolling
- Modal open/close functions
- Map initialization (Leaflet)
- Form reset functions

### js/api.js (342 lines)
API integrations:
- GitHub API integration with error handling
- EmailJS configuration and sending
- Email simulation for demo purposes
- Local storage transaction management
- API status logging

### js/forms.js (528 lines)
Form handling:
- Comprehensive validation functions
- Contact form submission handler
- Project inquiry form submission handler
- Real-time field validation
- Error display and clearing
- Success message handling

---

## Security Considerations

### Implemented Security Measures

1. **Input Validation**
   - All fields validated on client-side
   - Length restrictions enforced
   - Email format validation
   - Phone number format validation

2. **XSS Prevention**
   - All user input sanitized
   - No innerHTML usage for user data
   - Parameterized EmailJS calls

3. **CORS Handling**
   - GitHub API uses public endpoints
   - EmailJS handles CORS on their servers
   - Leaflet Maps uses public tiles

4. **Data Privacy**
   - No sensitive data stored
   - Local storage for demo only
   - No tracking or analytics

### Recommendations for Production

1. **Backend API:**
   - Create backend endpoint for form submissions
   - Use server-side validation
   - Store data in secure database

2. **Authentication:**
   - Implement token-based authentication
   - Use HTTPS for all connections
   - Add rate limiting for API endpoints

3. **Data Encryption:**
   - Encrypt sensitive data in transit
   - Use environment variables for API keys
   - Never commit secrets to version control

4. **Monitoring:**
   - Add error tracking (Sentry, etc.)
   - Implement analytics
   - Monitor API usage

---

## Browser Compatibility

✅ **Fully Supported:**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

✅ **Features Used:**
- ES6+ JavaScript (async/await, fetch API)
- CSS Grid and Flexbox
- CSS Custom Properties (Variables)
- Modern HTML5 elements

---

## Common Issues & Solutions

### Issue: GitHub API returns 404
**Solution:** Update `GITHUB_USERNAME` in `js/api.js` to match actual GitHub username

### Issue: Maps not displaying
**Solution:** Ensure Leaflet libraries are loaded from CDN. Check internet connection.

### Issue: EmailJS not sending emails
**Solution:** Either configure EmailJS credentials or use simulation mode (default)

### Issue: Form validation not working
**Solution:** Clear browser cache and reload. Check that all JS files are loaded.

### Issue: Modal not closing
**Solution:** Try clearing localStorage and reloading. Check browser console for errors.

---

## Customization Guide

### Change Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;      /* Change blue to another color */
    --accent-color: #06b6d4;       /* Change cyan to another color */
    /* ... other colors */
}
```

### Update GitHub Username
In `js/api.js`:
```javascript
const GITHUB_USERNAME = 'your-github-username';
```

### Update Location on Map
In `js/main.js`:
```javascript
L.map('map').setView([newLatitude, newLongitude], zoomLevel);
```

### Change Project Information
Edit the project cards in `index.html`:
```html
<h3>Your Project Title</h3>
<p>Your project description</p>
```

### Add More Projects
Duplicate a project card and update the content:
```html
<div class="project-card">
    <!-- Duplicate and modify -->
</div>
```

---

## Performance Optimization

### Implemented Optimizations
- ✅ Minimal external dependencies
- ✅ Lazy loading for maps
- ✅ CSS media queries for responsive design
- ✅ Efficient JavaScript with event delegation
- ✅ Optimized animations with CSS transforms

### Recommendations for Further Optimization
1. Minify CSS and JavaScript for production
2. Use image optimization tools
3. Implement service worker for offline support
4. Add caching headers for static assets
5. Use CDN for external libraries

---

## SEO Optimization

### Implemented SEO Features
- ✅ Semantic HTML5 elements
- ✅ Meta viewport for mobile
- ✅ Clear page title and description
- ✅ Structured navigation
- ✅ Descriptive headings (H1, H2, H3)
- ✅ Image alt text

### Recommendations
1. Add meta description tag
2. Submit sitemap to search engines
3. Add Open Graph tags for social sharing
4. Implement JSON-LD structured data
5. Create XML sitemap

---

## Version History

**Version 1.0.0** - Initial Release
- Complete portfolio website
- 3 API integrations (GitHub, EmailJS, Leaflet Maps)
- 2 transaction features (Contact & Inquiry forms)
- Full form validation
- Responsive design
- Comprehensive documentation

---

## Support & Contact

For issues, questions, or improvements:

1. **Check Documentation** - Review this README thoroughly
2. **Browser Console** - Check for error messages in developer tools
3. **Verify Configuration** - Ensure all API keys are properly configured
4. **Clear Cache** - Try clearing browser cache and localStorage

---

## License

This project is created for educational purposes as part of BSIT coursework.

**Author:** Jailen Ann A. Mostoles  
**Institution:** Camarines Norte State College  
**Course:** Bachelor of Science in Information Technology  
**Date:** 2024

---

## Acknowledgments

- Font Awesome for icons
- Leaflet.js for maps
- OpenStreetMap for map tiles
- EmailJS for email service
- GitHub API for repository integration

---

## Future Enhancements

Potential features for future versions:
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Blog/Articles section
- [ ] Testimonials section
- [ ] Download resume functionality
- [ ] Real-time chat with visitor
- [ ] Animations on scroll
- [ ] Analytics integration
- [ ] Social media integration
- [ ] Newsletter subscription

---

**Last Updated:** February 2024  
**Status:** Production Ready ✅

