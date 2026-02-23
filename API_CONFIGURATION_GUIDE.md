# API Configuration Guide

This guide provides step-by-step instructions for configuring each of the three APIs used in the portfolio website.

## Quick Summary

| API | Required | Configuration | Fallback |
|-----|----------|---------------|----------|
| GitHub | No | Just update username | Works with any username |
| EmailJS | Optional | API keys needed | Simulation mode active |
| Leaflet Maps | No | Pre-configured | Works out of the box |

---

## 1. GitHub API Configuration

### What It Does
Fetches your GitHub repositories and displays them on the portfolio with:
- Repository name and description
- Programming language
- Stars and forks count
- Direct link to GitHub repo

### Setup Instructions

#### Step 1: Find Your GitHub Username
1. Go to https://github.com
2. Login to your account
3. Your username appears in the top-right corner
4. Example: `https://github.com/your-username`

#### Step 2: Update Configuration
1. Open `js/api.js`
2. Find line 11:
   ```javascript
   const GITHUB_USERNAME = 'jailenannm-web';
   ```
3. Replace `'jailenann'` with your GitHub username:
   ```javascript
   const GITHUB_USERNAME = 'jailenannm-web';
   ```
4. Save the file

#### Step 3: Test the Integration
1. Open the website in a browser
2. Navigate to the Projects section
3. Click "Load My GitHub Projects" button
4. Your repositories should load in 1-2 seconds

### How It Works

**API Endpoint:**
```
GET https://api.github.com/users/{username}/repos?sort=updated&per_page=6
```

**Example Response:**
```json
[
  {
    "id": 123456,
    "name": "portfolio-website",
    "description": "Personal portfolio with API integrations",
    "html_url": "https://github.com/user/portfolio-website",
    "language": "JavaScript",
    "stargazers_count": 5,
    "forks_count": 2,
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

### Troubleshooting

**Issue:** "Failed to load repositories" error
- **Solution 1:** Check if username is spelled correctly
- **Solution 2:** Ensure the GitHub user has public repositories
- **Solution 3:** Check internet connection and browser console for details

**Issue:** Shows old repositories after updating
- **Solution:** Clear browser cache (Ctrl+Shift+Delete)

**Issue:** Rate limit exceeded
- **Solution:** GitHub allows 60 unauthenticated requests per hour. Wait or authenticate with token.

### Add Personal Access Token (Optional - for higher limits)

If you want higher rate limits:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`
4. Copy the token
5. Update `js/api.js`:
   ```javascript
   // Add authentication to fetch
   const response = await fetch(url, {
     headers: {
       'Authorization': 'token YOUR_TOKEN_HERE'
     }
   });
   ```

---

## 2. EmailJS API Configuration

### What It Does
Sends emails from the contact form and project inquiry form:
- Contact form submissions sent to you
- Project inquiry form submissions sent to you
- Automatic reply-to capability
- Metadata and timestamps included

### Setup Instructions (Basic - Simulation Mode)

By default, the website uses **Simulation Mode** for EmailJS. This means:
- Forms appear to submit successfully
- Data is stored locally
- Perfect for demonstration purposes
- No API configuration needed

**To use Simulation Mode:**
1. No setup required!
2. Forms will work immediately
3. Success rate: 90% success, 10% simulated failure
4. Check browser console to see simulated data

---

### Advanced Setup (Real Email Configuration)

If you want to send real emails:

#### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up Free"
3. Create account (or login with Google/GitHub)
4. Verify your email

#### Step 2: Get Your Public Key
1. Go to Account Settings
2. Copy your **Public Key**
3. Save it temporarily

#### Step 3: Add Email Service
1. Go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider:
   - Gmail
   - Outlook
   - Yahoo
   - Custom SMTP
4. Follow provider setup instructions
5. Note the **Service ID**

#### Step 4: Create Contact Form Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Name it: `contact_form`
4. Set up template with variables:
   ```
   From: {{from_email}}
   Name: {{from_name}}
   Phone: {{phone}}
   
   Message:
   {{message}}
   ```
5. Save the template
6. Note the **Template ID**

#### Step 5: Create Inquiry Form Template
1. Create another template
2. Name it: `inquiry_form`
3. Set up template:
   ```
   From: {{from_email}}
   Name: {{from_name}}
   Company: {{company}}
   Budget: {{budget}}
   Project: {{project_name}}
   
   Details:
   {{details}}
   ```
4. Save the template
5. Note the **Template ID**

#### Step 6: Update Configuration
1. Open `js/api.js`
2. Find lines 36-39:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
   const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   const EMAILJS_CONTACT_TEMPLATE = 'YOUR_CONTACT_TEMPLATE_ID';
   const EMAILJS_INQUIRY_TEMPLATE = 'YOUR_INQUIRY_TEMPLATE_ID';
   ```
3. Replace with your actual IDs:
   ```javascript
   const EMAILJS_PUBLIC_KEY = 'xY9a1b2c3d4e5f6g7h8i9j0k';
   const EMAILJS_SERVICE_ID = 'service_abc123xyz';
   const EMAILJS_CONTACT_TEMPLATE = 'template_contact_123';
   const EMAILJS_INQUIRY_TEMPLATE = 'template_inquiry_456';
   ```
4. Save the file

#### Step 7: Test Email Sending
1. Open the website
2. Click "Get In Touch" button
3. Fill out the contact form
4. Submit the form
5. Check your email for the message

### Email Configuration Examples

#### Gmail Setup
1. Go to myaccount.google.com
2. Enable "Less secure app access" or use App Password
3. Use app password in EmailJS setup

#### Custom SMTP Setup
Required information:
- SMTP Server address
- SMTP Port (usually 587 or 465)
- Username (usually your email)
- Password or app-specific password
- From address

### Test Email Variables

**Contact Form Email Contains:**
- Sender's name
- Sender's email
- Sender's phone (if provided)
- Message content
- Submission timestamp

**Inquiry Form Email Contains:**
- Sender's name
- Sender's email
- Company name
- Budget range
- Project name
- Detailed requirements
- Submission timestamp

### Troubleshooting EmailJS

**Issue:** "Service not configured" error
- **Solution 1:** Verify Public Key is correct
- **Solution 2:** Check if email service is activated
- **Solution 3:** Ensure templates are published

**Issue:** Email not received
- **Solution 1:** Check spam/junk folder
- **Solution 2:** Verify recipient email address is correct
- **Solution 3:** Check EmailJS dashboard for failed sends

**Issue:** "Invalid Service ID" error
- **Solution 1:** Copy Service ID exactly (no spaces)
- **Solution 2:** Ensure service is activated in dashboard

**Issue:** "Template not found" error
- **Solution 1:** Verify Template ID is correct
- **Solution 2:** Ensure template is published
- **Solution 3:** Check template variables match code

### Monitoring Emails in EmailJS Dashboard

1. Go to https://dashboard.emailjs.com/
2. Click "Email Status"
3. See all sent/failed emails
4. View reasons for failures

---

## 3. Leaflet Maps API Configuration

### What It Does
Displays an interactive map showing your location:
- Zoomable and pannable map
- Location marker with popup
- Uses OpenStreetMap (free)
- No API key required

### Current Configuration
The map is **already configured** and shows:
- Location: Labo, Camarines Norte, Philippines
- Coordinates: 14.1995°N, 122.5705°E
- Zoom level: 13

### How to Change Location

#### Step 1: Get New Coordinates
1. Open https://www.google.com/maps/
2. Search for your desired location
3. Right-click on the location
4. Copy the coordinates (shown at the top)
5. Format: `[latitude, longitude]`

#### Step 2: Update Configuration
1. Open `js/main.js`
2. Find the `initializeMap()` function (around line 35)
3. Update these lines:
   ```javascript
   // OLD:
   const map = L.map('map').setView([14.1995, 122.5705], 13);
   
   // NEW:
   const map = L.map('map').setView([newLatitude, newLongitude], 13);
   ```

4. Update the marker:
   ```javascript
   // OLD:
   L.marker([14.1995, 122.5705]).addTo(map)
       .bindPopup('<b>Labo, Camarines Norte</b><br>...');
   
   // NEW:
   L.marker([newLatitude, newLongitude]).addTo(map)
       .bindPopup('<b>Your City</b><br>Your Location Description');
   ```

#### Step 3: Test the Map
1. Reload the website
2. Go to the About section
3. Verify map shows correct location

### Map Zoom Levels

The zoom level (13 in the configuration) determines how zoomed in the map is:

- 1: World view
- 5: Continent view
- 10: City view
- 13: Neighborhood view (current)
- 15: Street view
- 18: House view

### Customize Map Appearance

**Change tile provider** (different map style):

```javascript
// Current: OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
}).addTo(map);

// Alternative: OpenStreetMap Dark
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; CartoDB',
    maxZoom: 19,
}).addTo(map);

// Alternative: OpenStreetMap Light
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; CartoDB',
    maxZoom: 19,
}).addTo(map);
```

### Customize Marker

**Change marker color:**

```javascript
// Red marker
const marker = L.circleMarker([14.1995, 122.5705], {
    color: 'red',
    radius: 8,
    weight: 3,
    opacity: 1,
    fillOpacity: 0.7,
    fillColor: 'red'
}).addTo(map);

// Blue marker
const marker = L.circleMarker([14.1995, 122.5705], {
    color: 'blue',
    radius: 8,
    weight: 3,
    opacity: 1,
    fillOpacity: 0.7,
    fillColor: 'blue'
}).addTo(map);
```

### Add Multiple Markers

```javascript
// Add multiple locations
const locations = [
    {lat: 14.1995, lng: 122.5705, name: "Home"},
    {lat: 14.1234, lng: 122.5678, name: "School"},
    {lat: 14.2000, lng: 122.5600, name: "Work"}
];

locations.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(map)
        .bindPopup(`<b>${loc.name}</b>`);
});
```

### Troubleshooting Maps

**Issue:** Map doesn't display
- **Solution 1:** Check internet connection
- **Solution 2:** Ensure Leaflet libraries are loaded from CDN
- **Solution 3:** Check browser console for errors

**Issue:** Map shows wrong location
- **Solution:** Update coordinates in initializeMap()

**Issue:** Marker doesn't appear
- **Solution:** Verify marker coordinates match map view

---

## API Status Dashboard

To check all API statuses:

1. Open the website
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. Look for the API status information
5. You'll see:
   ```
   🔗 Portfolio API Integration Status
   APIs loaded and initialized:
   - GitHub API: Ready
   - EmailJS API: Configured/Simulation Mode
   - Leaflet Maps: Ready
   - Local Storage: Active
   ```

---

## Environment Variables (for Production)

For a production deployment with sensitive data:

```javascript
// Create .env.local file
VITE_GITHUB_USERNAME=your-username
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_CONTACT_TEMPLATE=template_id
VITE_EMAILJS_INQUIRY_TEMPLATE=template_id
```

Then update API calls to use these variables.

---

## API Rate Limits

### GitHub API
- **Unauthenticated:** 60 requests per hour
- **Authenticated:** 5,000 requests per hour
- **Current usage:** ~1 request per page load

### EmailJS
- **Free tier:** 200 emails per month
- **Current usage:** Variable based on form submissions

### Leaflet Maps
- **OpenStreetMap tiles:** Unlimited
- **Rate limit:** 3 requests per second per user agent
- **Current usage:** 1 tile request per map load

---

## Verification Checklist

- [ ] GitHub API - Username updated
- [ ] GitHub API - Test "Load GitHub Projects" button works
- [ ] EmailJS - Configured or Simulation Mode active
- [ ] EmailJS - Contact form submission tested
- [ ] EmailJS - Inquiry form submission tested
- [ ] Maps - Displays location correctly
- [ ] Maps - Marker shows on map
- [ ] Console - No API errors shown
- [ ] All forms - Validation working
- [ ] All forms - Success messages display

---

## Support Resources

- **GitHub API Documentation:** https://docs.github.com/en/rest
- **EmailJS Documentation:** https://www.emailjs.com/docs/
- **Leaflet Documentation:** https://leafletjs.com/
- **OpenStreetMap Tiles:** https://tile.openstreetmap.org/
- **CartoDB Tiles:** https://github.com/CartoDB/basemap-styles

---

**Last Updated:** February 2024  
**Version:** 1.0.0
