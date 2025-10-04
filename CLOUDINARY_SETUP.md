# Cloudinary Image Upload Integration

This project uses Cloudinary for image storage and management. Images are uploaded to Cloudinary through backend API endpoints, and their URLs are stored in MongoDB.

## Setup

### 1. Install Dependencies

The required Cloudinary SDK is already included in the project dependencies:

```bash
npm install cloudinary
```

### 2. Configure Environment Variables

Add the following variables to your `.env.local` file:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

You can obtain these credentials from your [Cloudinary Dashboard](https://cloudinary.com/console).

## API Endpoints

### Upload Image

**POST** `/api/upload`

Upload an image to Cloudinary (requires authentication).

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Headers: `Cookie: auth-token=<your-token>`
- Body: FormData with `file` field containing the image file

**Example:**
```javascript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
// Result: { success: true, data: { url: "https://...", publicId: "..." } }
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/.../image.jpg",
    "publicId": "globetrotters/packages/abc123"
  }
}
```

### Delete Image

**POST** `/api/upload/delete`

Delete an image from Cloudinary and optionally remove it from a package in MongoDB (requires authentication).

**Request:**
- Method: `POST`
- Content-Type: `application/json`
- Headers: `Cookie: auth-token=<your-token>`
- Body:
```json
{
  "imageUrl": "https://res.cloudinary.com/.../image.jpg",
  "packageId": "optional-package-id"
}
```

**Example:**
```javascript
const response = await fetch('/api/upload/delete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    imageUrl: 'https://res.cloudinary.com/.../image.jpg',
    packageId: 'package-123', // Optional
  }),
});

const result = await response.json();
// Result: { success: true, message: "Image deleted successfully" }
```

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

## Package Deletion

When a package is deleted via `DELETE /api/packages/[id]`, all associated images stored in Cloudinary are automatically deleted as well.

**Example Flow:**
1. User deletes a package
2. Backend retrieves all image URLs from the package's `images` array
3. Backend extracts public IDs from the URLs
4. Backend deletes all images from Cloudinary
5. Backend deletes the package from MongoDB

## Image Storage Structure

Images are stored in Cloudinary under the folder: `globetrotters/packages/`

The MongoDB Package model stores an array of Cloudinary URLs:
```typescript
{
  // ... other fields
  images: [
    "https://res.cloudinary.com/your-cloud/image/upload/v123/globetrotters/packages/image1.jpg",
    "https://res.cloudinary.com/your-cloud/image/upload/v123/globetrotters/packages/image2.jpg"
  ]
}
```

## Utility Functions

The `src/lib/cloudinary.ts` file provides several utility functions:

- `uploadImage(file, folder)` - Upload an image to Cloudinary
- `deleteImage(publicId)` - Delete a single image from Cloudinary
- `deleteImages(publicIds)` - Delete multiple images from Cloudinary
- `extractPublicId(url)` - Extract the public ID from a Cloudinary URL

## Error Handling

All API endpoints include proper error handling:
- Missing file: Returns 400 Bad Request
- Invalid Cloudinary URL: Returns 400 Bad Request
- Package not found: Returns 404 Not Found
- Upload/deletion failures: Returns 500 Internal Server Error
- Unauthorized access: Returns 401 Unauthorized

## Security

- All upload and delete endpoints are protected with authentication middleware
- Only authenticated admin users can upload or delete images
- Public IDs are validated before deletion operations
