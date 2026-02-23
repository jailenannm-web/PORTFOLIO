# Portfolio Website - Testing Guide

This guide provides comprehensive testing procedures for all features of the portfolio website.

## Table of Contents
1. [Navigation Testing](#navigation-testing)
2. [GitHub API Testing](#github-api-testing)
3. [Contact Form Testing](#contact-form-testing)
4. [Inquiry Form Testing](#inquiry-form-testing)
5. [Map Testing](#map-testing)
6. [Responsive Design Testing](#responsive-design-testing)
7. [Accessibility Testing](#accessibility-testing)

---

## Navigation Testing

### Test 1.1: Desktop Navigation
**Objective:** Verify navigation menu works on desktop

**Steps:**
1. Open website on desktop browser
2. Click "Home" link → Page scrolls to top
3. Click "About" link → Page scrolls to About section
4. Click "Skills" link → Page scrolls to Skills section
5. Click "Projects" link → Page scrolls to Projects section

**Expected Result:** Each link smoothly scrolls to the correct section

**Status:** ✓ Pass / ✗ Fail

---

### Test 1.2: Mobile Navigation
**Objective:** Verify navigation menu works on mobile

**Steps:**
1. Open website on mobile device (or use browser DevTools)
2. Set viewport to mobile size (375px width)
3. Click hamburger menu icon (three lines)
4. Verify menu appears
5. Click a navigation link
6. Verify menu closes and page scrolls to section
7. Repeat for other navigation links

**Expected Result:** Menu toggles and navigation works smoothly

**Status:** ✓ Pass / ✗ Fail

---

### Test 1.3: No Broken Links
**Objective:** Verify all links are functional

**Steps:**
1. Check all button links:
   - "View My Work" button → Scrolls to Projects
   - "Get In Touch" button → Opens contact modal
2. Check all social links:
   - LinkedIn link → Opens LinkedIn in new tab
   - GitHub link → Opens GitHub in new tab
3. Check footer links:
   - All social icons work

**Expected Result:** All links open correctly in new tabs

**Status:** ✓ Pass / ✗ Fail

---

## GitHub API Testing

### Test 2.1: GitHub API Loading
**Objective:** Verify GitHub repositories load correctly

**Prerequisites:**
- Update GITHUB_USERNAME in js/api.js to an actual GitHub username
- This username should have at least 2-3 public repositories

**Steps:**
1. Open website
2. Scroll to Projects section
3. Click "Load My GitHub Projects" button
4. Wait 1-2 seconds
5. Verify repositories appear in grid

**Expected Result:** 
- Button changes to "Loading..."
- Repositories load and display with:
  - Repository name
  - Description
  - Language
  - Stars count
  - Forks count
  - Link to GitHub

**Status:** ✓ Pass / ✗ Fail

---

### Test 2.2: GitHub API Links
**Objective:** Verify GitHub repository links work

**Steps:**
1. After repositories load
2. Click on a repository name/link
3. Verify it opens the GitHub repository in a new tab

**Expected Result:** 
- Link opens in new tab
- Correct GitHub repository page displays

**Status:** ✓ Pass / ✗ Fail

---

### Test 2.3: GitHub API Error Handling
**Objective:** Verify error messages display correctly

**Steps:**
1. Update GITHUB_USERNAME to a fake username like "xyzabc123notarealuser"
2. Click "Load My GitHub Projects" button
3. Wait for error to appear

**Expected Result:**
- Error message displays clearly
- Message explains the issue
- Button is re-enabled for retry

**Expected Message:**
```
Failed to load repositories. Please check if the GitHub username is correct and try again.
```

**Status:** ✓ Pass / ✗ Fail

---

### Test 2.4: GitHub API Rate Limiting
**Objective:** Verify API handles rate limits

**Steps:**
1. Click "Load My GitHub Projects" multiple times rapidly (>60 times)
2. Observe behavior

**Expected Result:**
- Initially loads successfully
- After rate limit, shows error message
- After 1 hour, works again

**Note:** This test may not be necessary for demo purposes

---

## Contact Form Testing

### Test 3.1: Contact Form Display
**Objective:** Verify contact form modal opens correctly

**Steps:**
1. Click "Get In Touch" button on homepage
2. Verify modal appears with:
   - Title "Get In Touch"
   - All 4 form fields visible
   - Close button (X)
   - Submit button

**Expected Result:** Modal displays with all elements

**Status:** ✓ Pass / ✗ Fail

---

### Test 3.2: Contact Form - Valid Submission
**Objective:** Verify valid form data submits successfully

**Steps:**
1. Open contact form modal
2. Fill form with valid data:
   ```
   Name: John Doe
   Email: john@example.com
   Phone: +1 (555) 123-4567
   Message: This is a test message to verify the contact form submission process.
   ```
3. Click "Send Message" button
4. Wait for response (1-2 seconds)

**Expected Result:**
- Button shows "Sending..." state
- Success message appears:
  ```
  ✓ Thank you! Your message has been sent successfully. I'll get back to you soon.
  ```
- Form resets
- Modal closes after 3 seconds
- Console shows: "[v0] Contact Form - Submission successful"

**Status:** ✓ Pass / ✗ Fail

---

### Test 3.3: Contact Form - Name Validation
**Objective:** Verify name validation works

**Test Cases:**

**3.3a: Empty Name**
```
Name: [empty]
Email: test@example.com
Message: Valid message text here
Result: Error - "Name is required"
```

**3.3b: Name Too Short**
```
Name: J
Email: test@example.com
Message: Valid message text here
Result: Error - "Name must be between 2 and 100 characters"
```

**3.3c: Valid Name**
```
Name: John Doe
Email: test@example.com
Message: Valid message text here
Result: No error, field valid
```

**Status:** ✓ Pass / ✗ Fail

---

### Test 3.4: Contact Form - Email Validation
**Objective:** Verify email validation works

**Test Cases:**

**3.4a: Empty Email**
```
Email: [empty]
Result: Error - "Email is required"
```

**3.4b: Invalid Email Format**
```
Email: notanemail
Email: test@
Email: @example.com
Result: Error - "Please enter a valid email address"
```

**3.4c: Valid Email**
```
Email: john@example.com
Result: No error, field valid
```

**Status:** ✓ Pass / ✗ Fail

---

### Test 3.5: Contact Form - Phone Validation
**Objective:** Verify phone validation works

**Test Cases:**

**3.5a: Optional Field**
```
Phone: [empty]
Result: No error (phone is optional)
```

**3.5b: Invalid Phone**
```
Phone: abc
Result: Error - "Please enter a valid phone number"
```

**3.5c: Valid Phone**
```
Phone: +1 (555) 123-4567
Phone: 555-123-4567
Phone: 5551234567
Result: No error, field valid
```

**Status:** ✓ Pass / ✗ Fail

---

### Test 3.6: Contact Form - Message Validation
**Objective:** Verify message validation works

**Test Cases:**

**3.6a: Empty Message**
```
Message: [empty]
Result: Error - "Message is required"
```

**3.6b: Message Too Short**
```
Message: Hello
Result: Error - "Message must be at least 10 characters long"
```

**3.6c: Valid Message**
```
Message: This is a longer test message with more than 10 characters
Result: No error, field valid
```

**Status:** ✓ Pass / ✗ Fail

---

### Test 3.7: Contact Form - Real-time Validation
**Objective:** Verify validation happens on field blur

**Steps:**
1. Open contact form
2. Click on Name field, enter "J" (too short)
3. Click away (blur event)
4. Verify error message appears immediately
5. Go back to Name field, add more characters
6. Verify error clears

**Expected Result:**
- Error appears on blur if invalid
- Error clears when field becomes valid

**Status:** ✓ Pass / ✗ Fail

---

### Test 3.8: Contact Form - Data Storage
**Objective:** Verify form data is stored in local storage

**Steps:**
1. Submit a valid contact form
2. Open browser console (F12)
3. Run: `console.log(JSON.parse(localStorage.getItem('portfolioTransactions')))`
4. Verify contact data appears in output

**Expected Result:**
```javascript
[{
  id: [timestamp],
  type: "contact",
  data: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    message: "Your message"
  },
  timestamp: "2024-01-01T12:00:00.000Z",
  status: "completed"
}]
```

**Status:** ✓ Pass / ✗ Fail

---

## Inquiry Form Testing

### Test 4.1: Inquiry Form Display
**Objective:** Verify inquiry form modal opens with project name

**Steps:**
1. Scroll to Projects section
2. Click "Inquire" button on any project card
3. Verify modal appears with:
   - Title "Project Inquiry"
   - Project name displayed
   - All form fields visible
   - Close button

**Expected Result:** Modal opens with all elements and project name shown

**Status:** ✓ Pass / ✗ Fail

---

### Test 4.2: Inquiry Form - Valid Submission
**Objective:** Verify valid inquiry form data submits successfully

**Steps:**
1. Click "Inquire" on any project
2. Fill form with valid data:
   ```
   Name: Jane Smith
   Email: jane@company.com
   Company: TechCorp Inc.
   Budget: $5,000 - $10,000
   Details: We need a student management system for our institution with CRUD operations and secure login capabilities. Please provide a detailed proposal and timeline.
   ```
3. Click "Submit Inquiry" button

**Expected Result:**
- Button shows "Submitting..." state
- Success message appears within 2 seconds
- Form resets
- Modal closes after 3 seconds

**Status:** ✓ Pass / ✗ Fail

---

### Test 4.3: Inquiry Form - Name Validation
**Objective:** Verify name validation (same as contact form)

**Test Cases:**
- Empty name → Error
- Name with 1 character → Error
- Valid name "Jane Smith" → No error

**Status:** ✓ Pass / ✗ Fail

---

### Test 4.4: Inquiry Form - Email Validation
**Objective:** Verify email validation (same as contact form)

**Test Cases:**
- Empty email → Error
- Invalid format "jane@" → Error
- Valid email "jane@company.com" → No error

**Status:** ✓ Pass / ✗ Fail

---

### Test 4.5: Inquiry Form - Budget Validation
**Objective:** Verify budget selection is required

**Steps:**
1. Open inquiry form
2. Leave Budget field as "Select a budget range"
3. Try to submit form

**Expected Result:**
- Error message appears: "Please select a budget range"
- Form does not submit

**Status:** ✓ Pass / ✗ Fail

---

### Test 4.6: Inquiry Form - Details Validation
**Objective:** Verify project details validation

**Test Cases:**

**4.6a: Empty Details**
```
Details: [empty]
Result: Error - "Project details are required"
```

**4.6b: Details Too Short**
```
Details: Just a few words
Result: Error - "Project details must be at least 20 characters"
```

**4.6c: Valid Details (>20 chars)**
```
Details: We need a student management system for our institution
Result: No error, field valid
```

**Status:** ✓ Pass / ✗ Fail

---

### Test 4.7: Inquiry Form - Data Storage
**Objective:** Verify inquiry data is stored in local storage

**Steps:**
1. Submit a valid inquiry form
2. Open browser console
3. Run: `console.log(JSON.parse(localStorage.getItem('portfolioTransactions')))`
4. Verify inquiry data appears with "inquiry" type

**Expected Result:**
```javascript
{
  type: "inquiry",
  data: {
    name: "Jane Smith",
    email: "jane@company.com",
    company: "TechCorp Inc.",
    budget: "5000-10000",
    details: "Project details here",
    projectName: "Student Management System"
  }
}
```

**Status:** ✓ Pass / ✗ Fail

---

## Map Testing

### Test 5.1: Map Display
**Objective:** Verify map displays in About section

**Steps:**
1. Scroll to About section
2. Verify map container is visible
3. Verify map tiles load (displays map background)

**Expected Result:**
- Map container displays
- Map tiles load and show OpenStreetMap
- "Labo, Camarines Norte" text shows below map

**Status:** ✓ Pass / ✗ Fail

---

### Test 5.2: Map Marker
**Objective:** Verify location marker appears on map

**Steps:**
1. View map in About section
2. Look for marker on the map

**Expected Result:**
- Red/blue marker visible on map
- Marker is at Labo, Camarines Norte location
- Clicking marker shows popup with location info

**Status:** ✓ Pass / ✗ Fail

---

### Test 5.3: Map Interactivity
**Objective:** Verify map zoom and pan work

**Steps:**
1. View map in About section
2. Scroll wheel/pinch to zoom in/out
3. Click and drag to pan around
4. Verify map responds smoothly

**Expected Result:**
- Map zooms in/out smoothly
- Map pans when dragged
- Marker stays in correct position

**Status:** ✓ Pass / ✗ Fail

---

## Responsive Design Testing

### Test 6.1: Desktop View (1920px)
**Objective:** Verify layout on large desktop screens

**Steps:**
1. Set viewport width to 1920px
2. Check all sections:
   - Hero section: Two columns layout
   - About section: Text left, map right
   - Skills section: 5 columns grid
   - Projects section: 3 columns grid

**Expected Result:** All sections display in multi-column layout

**Status:** ✓ Pass / ✗ Fail

---

### Test 6.2: Tablet View (768px)
**Objective:** Verify layout on tablet screens

**Steps:**
1. Set viewport width to 768px
2. Check all sections adapt properly

**Expected Result:**
- Hero: Still two columns but narrower
- Projects: 2 columns
- Skills: 2-3 columns
- Navigation: Still accessible

**Status:** ✓ Pass / ✗ Fail

---

### Test 6.3: Mobile View (375px)
**Objective:** Verify layout on mobile phones

**Steps:**
1. Set viewport width to 375px
2. Check all sections:
   - Hero: Single column
   - About: Single column (map below text)
   - Skills: Single column
   - Projects: Single column
   - Navigation: Hamburger menu visible

**Expected Result:**
- All sections stack vertically
- Text remains readable
- Images scale appropriately
- No horizontal scrolling

**Status:** ✓ Pass / ✗ Fail

---

### Test 6.4: Font Scaling
**Objective:** Verify text remains readable at all sizes

**Steps:**
1. Test at 375px, 768px, and 1920px widths
2. Check heading sizes
3. Check body text readability

**Expected Result:**
- Headings scale appropriately
- Body text remains at least 14px
- Line height is comfortable (1.4-1.6)

**Status:** ✓ Pass / ✗ Fail

---

### Test 6.5: Image Scaling
**Objective:** Verify images scale appropriately

**Steps:**
1. Check profile placeholder at different sizes
2. Check project card images
3. Verify no image distortion

**Expected Result:**
- Images maintain aspect ratio
- Icons resize properly
- No pixelation or blur

**Status:** ✓ Pass / ✗ Fail

---

## Accessibility Testing

### Test 7.1: Keyboard Navigation
**Objective:** Verify website is navigable with keyboard only

**Steps:**
1. Close touchpad/mouse
2. Use Tab key to navigate
3. Use Enter key to activate buttons
4. Navigate through all interactive elements

**Expected Result:**
- Can tab through all links and buttons
- Active element has visible focus indicator
- Can submit forms with keyboard

**Status:** ✓ Pass / ✗ Fail

---

### Test 7.2: Color Contrast
**Objective:** Verify text has sufficient contrast

**Steps:**
1. Use contrast checking tool (WebAIM)
2. Check text colors against backgrounds
3. Check primary colors used

**Expected Result:**
- All text has contrast ratio ≥ 4.5:1
- Links are distinguishable

**Status:** ✓ Pass / ✗ Fail

---

### Test 7.3: Screen Reader
**Objective:** Verify screen reader compatibility

**Steps:**
1. Use browser with screen reader (NVDA, JAWS, or macOS VoiceOver)
2. Navigate through page
3. Verify:
   - Headings are announced correctly
   - Links have descriptive text
   - Form labels are associated with fields
   - Button purposes are clear

**Expected Result:**
- Page is navigable with screen reader
- All content is accessible
- No unlabeled elements

**Status:** ✓ Pass / ✗ Fail

---

### Test 7.4: Focus Indicators
**Objective:** Verify visible focus indicators

**Steps:**
1. Tab through form fields
2. Tab through buttons
3. Tab through links

**Expected Result:**
- Each focused element has visible highlight
- Focus indicator is clear and obvious

**Status:** ✓ Pass / ✗ Fail

---

## Performance Testing

### Test 8.1: Page Load Time
**Objective:** Verify page loads quickly

**Steps:**
1. Open DevTools Performance tab
2. Reload page
3. Check load time

**Expected Result:**
- Page loads in < 3 seconds
- First contentful paint < 2 seconds
- All interactive within 3.5 seconds

**Status:** ✓ Pass / ✗ Fail

---

### Test 8.2: API Response Times
**Objective:** Verify APIs respond quickly

**Steps:**
1. Open Network tab in DevTools
2. Click "Load GitHub Projects"
3. Check GitHub API response time
4. Submit contact form and check EmailJS response

**Expected Result:**
- GitHub API: < 1 second
- EmailJS: 1-2 seconds
- Map tiles: < 2 seconds

**Status:** ✓ Pass / ✗ Fail

---

## Browser Compatibility Testing

Test on the following browsers:

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✓ Pass / ✗ Fail |
| Firefox | Latest | ✓ Pass / ✗ Fail |
| Safari | Latest | ✓ Pass / ✗ Fail |
| Edge | Latest | ✓ Pass / ✗ Fail |
| Mobile Chrome | Latest | ✓ Pass / ✗ Fail |
| Mobile Safari | Latest | ✓ Pass / ✗ Fail |

---

## Final Verification Checklist

- [ ] All navigation links work
- [ ] GitHub API loads repositories
- [ ] Contact form validates and submits
- [ ] Inquiry form validates and submits
- [ ] Map displays and is interactive
- [ ] Responsive design works at all breakpoints
- [ ] No console errors
- [ ] All buttons are clickable
- [ ] Forms show success/error messages
- [ ] Mobile navigation works
- [ ] Page loads quickly
- [ ] Accessibility features work

---

**Test Date:** ____________  
**Tested By:** ____________  
**Overall Status:** ✓ PASS / ✗ FAIL

---

**Last Updated:** February 2024

