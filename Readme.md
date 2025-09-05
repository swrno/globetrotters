# Globetrotters

It is a travel agency website that showcases various travel packages and allows users to register their interest in specific packages. The website also includes an admin panel for managing the travel packages.

## Tech Stack
- Frontend: Next.js, Tailwind CSS
- Backend: Next.js
- Database: MongoDB
- Authentication: Firebase Auth
- Image Storage: Firebase Storage
- Deployment: Vercel


## Landing Page & Package Display
- The `raw` folder has all the files in html and css, convert it to next.js.
- The landing page should exactly match the design in the `raw` folder. [Not a single pixel should be off]
- The Package should be dynamically rendered over the landing page, in the respective section.
- Each Package should have a Interest Form (Registration) to register for the package.
- Add Captcha to the form to avoid spam.

## Backend API
- Create a backend API using Next.js API routes to handle CRUD operations for travel packages.
- Create endpoints to fetch all packages, fetch a single package by ID, create a new package, update a package, and delete a package.

## Admin Panel
- Create an admin panel to add, edit, delete packages.
- The admin panel should be protected with authentication (you can use any method you prefer).
- Use MongoDB as the database to store package details.
- Each package should have the following details:

**Package Schema**:
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
- The admins should be able to upload images to Firebase Storage and get the URLs to store in the database.
- The Registration details should be viewable in the admin panel.
- Should have darkmode in the admin panel.
- The Darkmode should match the theme of Github Default Darkmode.

