# Globetrotters Travel Agency Website

Globetrotters is a travel agency website that showcases various travel packages and allows users to register their interest in specific packages. The project currently consists of static HTML/CSS/JavaScript files that need to be converted to Next.js with MongoDB backend and Firebase authentication.

**ALWAYS reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Current Project State

The repository contains a complete static HTML website in the `raw/` folder that serves as the design template. This needs to be converted to Next.js according to the project requirements.

## Working Effectively

### Essential Development Setup
- Node.js v20.19.4 and npm v10.8.2 are pre-installed and working
- Sass compiler is available globally: `sass --version` (v1.92.0)
- Python3 HTTP server available for serving static content

### Bootstrap and Development Workflow
1. **Serve the existing static website for preview**:
   ```bash
   cd raw
   python3 -m http.server 8080
   ```
   - Server starts instantly (< 1 second)
   - Access via http://localhost:8080
   - NEVER CANCEL: Let the server run as long as needed for development

2. **Compile SCSS to CSS during development**:
   ```bash
   cd raw
   sass style.scss style.css
   ```
   - Compilation takes ~0.6 seconds
   - Watch mode for automatic compilation:
   ```bash
   sass --watch style.scss:style.css
   ```
   - NEVER CANCEL: Watch mode runs continuously, press Ctrl-C only when done

3. **Complete development cycle timing**:
   - SCSS compilation: ~0.6 seconds (very fast)
   - HTTP server startup: < 1 second
   - Asset loading: < 0.01 seconds per file

## Validation Requirements

### CRITICAL: Manual Validation Scenarios
After making any changes, ALWAYS validate by testing these complete user scenarios:

1. **Website Navigation Test**:
   ```bash
   # Start server
   cd raw && python3 -m http.server 8080
   ```
   - Test ALL pages load correctly: index.html, about.html, contact.html, faq.html, holiday-package.html, holiday-package-detail.html
   - Verify travel-related content appears (should find 10+ travel/package references)
   - Check that page title "Globetrotters" displays correctly

2. **Static Assets Validation**:
   - Verify CSS loads: css/bootstrap.min.css, css/swiper.css, style.css
   - Verify JavaScript loads: js/jquery.min.js, js/bootstrap.min.js, js/custom.js
   - Verify images load: images/logo.svg and banner images
   - Expected asset sizes: bootstrap.min.css (~233KB), logo.svg (~412KB)

3. **Interactive Elements Test**:
   - Contact page should contain 14+ form elements (inputs, textareas, forms)
   - Holiday packages page should contain 9+ package/destination references
   - Navigation links should be present and accessible

4. **SCSS Compilation Test**:
   ```bash
   cd raw
   sass style.scss test-output.css
   ls -la test-output.css  # Should be ~50KB
   rm test-output.css test-output.css.map
   ```

## Tech Stack and Future Requirements

### Current Stack
- **Frontend**: Static HTML, CSS (compiled from SCSS), JavaScript
- **Styling**: Bootstrap, Tailwind CSS framework, Custom SCSS
- **Assets**: jQuery, Swiper.js, FancyBox, Bootstrap JS

### Target Stack (per README requirements)
- **Frontend**: Next.js, Tailwind CSS  
- **Backend**: Next.js API routes
- **Database**: MongoDB
- **Authentication**: Firebase Auth
- **Image Storage**: Firebase Storage
- **Deployment**: Vercel

## Common Development Tasks

### Working with SCSS
- Source file: `raw/style.scss` (65KB, includes custom variables and Poppins/Damion fonts)
- Primary color variable: `$primaryColor: #000735`
- Compilation command: `sass style.scss style.css`
- Watch mode: `sass --watch style.scss:style.css`

### Serving Static Content
- Use `python3 -m http.server [port]` in the `raw/` directory
- Default ports that work: 8080, 8090, 8082
- All HTML pages return HTTP 200 and load in < 0.01 seconds

### Project Structure Reference
```
.
├── .github/           # GitHub configuration
├── .gitignore         # Includes Node.js, Next.js, and build exclusions  
├── Readme.md          # Project requirements and specs
└── raw/               # Static HTML template (TO BE CONVERTED)
    ├── css/           # Third-party CSS (Bootstrap, Swiper, etc.)
    ├── js/            # JavaScript libraries and custom code
    ├── images/        # Static images and assets
    ├── style.scss     # Main SCSS source file
    ├── style.css      # Compiled CSS output
    └── *.html         # HTML template pages
```

## Package Schema and Data Requirements

When converting to Next.js, implement this MongoDB schema:
```json
{
  "id": "uuid",
  "location": "string", 
  "title": "string",
  "description": "string (Markdown)",
  "tags": ["string"],
  "days": 0,
  "nights": 0,
  "registrations": [
    {
      "name": "string",
      "email": "string", 
      "phone": "string"
    }
  ],
  "images": ["string"]
}
```

## Critical Development Notes

### ⚠️ Current Limitations
- **No build process exists yet** - this is a static HTML template
- **No Next.js project structure** - conversion is required per README
- **No package.json** - npm/yarn setup needed for Next.js conversion
- **No testing framework** - will need to be added during Next.js conversion
- **No CI/CD workflows** - GitHub Actions need to be created

### ⚠️ NEVER CANCEL Operations
- HTTP server can run indefinitely - only stop when development is complete
- SCSS watch mode runs continuously - designed to stay active
- All operations are fast (< 1 second), so timeouts are not a concern

### ⚠️ File Management
- SCSS generates .css.map files - these are excluded in .gitignore
- Temporary test files should be cleaned up after validation
- Working directory should always be project root or `raw/` subfolder

## Next.js Conversion Checklist

When implementing the Next.js conversion mentioned in README:
1. Initialize Next.js project: `npx create-next-app@latest .`
2. Install dependencies: MongoDB, Firebase SDK, Tailwind CSS
3. Convert HTML templates to Next.js pages/components
4. Implement API routes for CRUD operations  
5. Add authentication with Firebase Auth
6. Set up MongoDB database connections
7. Add image upload to Firebase Storage
8. Create admin panel with dark mode
9. Add reCAPTCHA to forms
10. Deploy to Vercel

## Troubleshooting

### Common Issues
- **SCSS compilation fails**: Ensure you're in the `raw/` directory
- **HTTP server port conflict**: Try different ports (8080, 8090, 8082)
- **Assets not loading**: Verify server is running from `raw/` directory
- **CSS changes not reflecting**: Re-compile SCSS or use watch mode

### Validation Failures
- **Missing content**: Check if you're accessing the correct port/page
- **Form elements missing**: Verify you're testing contact.html specifically  
- **Package content missing**: Verify you're testing holiday-package.html

Always run the complete validation scenarios after any changes to ensure the website remains fully functional.