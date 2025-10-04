# Quick Start Guide - Cloudinary Image Upload

## Setup (One-time)

1. **Get Cloudinary Credentials**
   - Sign up at https://cloudinary.com
   - Go to Dashboard
   - Copy: Cloud Name, API Key, API Secret

2. **Add to Environment**
   Create `.env.local` file:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

3. **Restart Server**
   ```bash
   npm run dev
   ```

## Usage Examples

### Upload Image (Frontend)

```javascript
// Example: Upload image from file input
async function uploadImage(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
    // Auth cookie is sent automatically
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('Image URL:', result.data.url);
    console.log('Public ID:', result.data.publicId);
    
    // Add URL to package images array
    packageData.images.push(result.data.url);
  }
}

// Usage in React component
function ImageUploader() {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  return <input type="file" onChange={handleUpload} />;
}
```

### Delete Image (Frontend)

```javascript
// Example: Delete image and remove from package
async function deleteImage(imageUrl, packageId) {
  const response = await fetch('/api/upload/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageUrl: imageUrl,
      packageId: packageId, // Optional - removes from MongoDB too
    }),
  });

  const result = await response.json();
  
  if (result.success) {
    console.log('Image deleted successfully');
  }
}

// Usage in React component
function ImageGallery({ images, packageId }) {
  const handleDelete = async (imageUrl) => {
    await deleteImage(imageUrl, packageId);
    // Refresh images list
  };

  return (
    <div>
      {images.map(url => (
        <div key={url}>
          <img src={url} />
          <button onClick={() => handleDelete(url)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Backend Usage (Direct)

```typescript
// Import utilities
import { uploadImage, deleteImage, extractPublicId } from '@/lib/cloudinary';

// Upload from backend
const result = await uploadImage(base64ImageData);
console.log(result.url); // https://res.cloudinary.com/.../image.jpg

// Delete from backend
const publicId = extractPublicId(imageUrl);
await deleteImage(publicId);
```

## Package Integration

### Saving Images to Package

```javascript
// When creating/updating a package
const packageData = {
  title: 'Goa Beach Package',
  images: [
    'https://res.cloudinary.com/.../beach1.jpg',
    'https://res.cloudinary.com/.../beach2.jpg',
  ],
  // ... other fields
};

await fetch('/api/packages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(packageData),
});
```

### Auto-Delete on Package Deletion

```javascript
// When you delete a package, images are automatically deleted
await fetch(`/api/packages/${packageId}`, {
  method: 'DELETE',
});
// All images in package.images[] are automatically removed from Cloudinary
```

## Common Patterns

### Multiple Image Upload

```javascript
async function uploadMultipleImages(files) {
  const uploadPromises = Array.from(files).map(file => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch('/api/upload', {
      method: 'POST',
      body: formData,
    }).then(r => r.json());
  });

  const results = await Promise.all(uploadPromises);
  const urls = results.map(r => r.data.url);
  return urls;
}
```

### Image Upload with Preview

```javascript
function ImageUploadWithPreview() {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    setUploading(false);

    if (result.success) {
      // Replace preview with actual Cloudinary URL
      setPreview(result.data.url);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {preview && (
        <div>
          <img src={preview} alt="Preview" />
          {uploading && <p>Uploading...</p>}
        </div>
      )}
    </div>
  );
}
```

## Troubleshooting

### Issue: 401 Unauthorized
**Solution**: Make sure you're logged in as admin. Upload endpoints require authentication.

### Issue: Invalid Cloudinary credentials
**Solution**: 
1. Check `.env.local` has correct values
2. Restart dev server after changing environment variables
3. Verify credentials in Cloudinary dashboard

### Issue: Image upload fails with large files
**Solution**: 
- Cloudinary free tier has size limits
- Consider compressing images before upload
- Or upgrade Cloudinary plan

### Issue: Images not deleted from Cloudinary
**Solution**:
- Check that image URLs are valid Cloudinary URLs
- Verify environment variables are set correctly
- Check server logs for error messages

## Testing Checklist

- [ ] Upload single image → Verify URL returned
- [ ] Upload multiple images → Verify all URLs returned
- [ ] Delete single image → Verify removed from Cloudinary
- [ ] Delete package → Verify all images removed
- [ ] Check MongoDB → Verify URLs stored correctly
- [ ] Check Cloudinary Dashboard → Verify images in correct folder

## Next Steps

1. Integrate upload endpoints in admin panel
2. Add image gallery component for package creation
3. Add drag-and-drop image upload
4. Add image cropping/editing before upload
5. Add progress indicators for uploads

See `CLOUDINARY_SETUP.md` for complete API documentation.
