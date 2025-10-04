# Cloudinary Integration Architecture

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Application                           │
│                    (Admin Panel / Frontend)                          │
└────────────┬────────────────────────────────────────┬────────────────┘
             │                                        │
             │ Upload Image                           │ Delete Package
             │ POST /api/upload                       │ DELETE /api/packages/[id]
             │                                        │
             ▼                                        ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         Next.js API Routes                           │
│                       (Protected by Auth)                            │
├─────────────────────────────────────────────────────────────────────┤
│  POST /api/upload                                                    │
│  ├─ Convert file to base64                                          │
│  ├─ Call uploadImage()                                              │
│  └─ Return URL + publicId                                           │
│                                                                      │
│  POST /api/upload/delete                                            │
│  ├─ Extract publicId from URL                                       │
│  ├─ Delete from Cloudinary                                          │
│  └─ Remove URL from MongoDB                                         │
│                                                                      │
│  DELETE /api/packages/[id]                                          │
│  ├─ Find package in MongoDB                                         │
│  ├─ Extract all image publicIds                                     │
│  ├─ Delete images from Cloudinary                                   │
│  └─ Delete package from MongoDB                                     │
└────────────┬────────────────────────────────────────┬───────────────┘
             │                                        │
             │ Upload/Delete                          │ CRUD Operations
             │                                        │
             ▼                                        ▼
┌─────────────────────────┐              ┌──────────────────────────┐
│      Cloudinary         │              │       MongoDB            │
│   Image Storage CDN     │              │   Package Database       │
├─────────────────────────┤              ├──────────────────────────┤
│ Folder Structure:       │              │ Package Model:           │
│ globetrotters/          │              │ {                        │
│   └── packages/         │              │   id: string,            │
│       ├── image1.jpg    │              │   title: string,         │
│       ├── image2.jpg    │              │   images: [              │
│       └── image3.png    │              │     "cloudinary_url_1",  │
│                         │              │     "cloudinary_url_2"   │
│ Images stored with:     │              │   ]                      │
│ - Secure URLs           │              │ }                        │
│ - Public IDs            │              │                          │
│ - Auto optimization     │              │                          │
└─────────────────────────┘              └──────────────────────────┘
```

## File Structure

```
globetrotters/
├── src/
│   ├── lib/
│   │   └── cloudinary.ts              # Cloudinary utility functions
│   │       ├── uploadImage()          # Upload to Cloudinary
│   │       ├── deleteImage()          # Delete single image
│   │       ├── deleteImages()         # Delete multiple images
│   │       └── extractPublicId()      # Extract ID from URL
│   │
│   ├── app/
│   │   └── api/
│   │       ├── upload/
│   │       │   ├── route.ts           # POST: Upload image
│   │       │   └── delete/
│   │       │       └── route.ts       # POST: Delete image
│   │       │
│   │       └── packages/
│   │           └── [id]/
│   │               └── route.ts       # Enhanced DELETE with cleanup
│   │
│   └── models/
│       └── Package.ts                 # MongoDB model with images array
│
├── CLOUDINARY_SETUP.md                # Complete documentation
└── .env.example                       # Environment template
```

## Image Lifecycle

### 1. Upload Flow
```
User selects image → Frontend creates FormData → POST /api/upload
→ Backend converts to base64 → Upload to Cloudinary
→ Cloudinary returns URL + publicId → Store URL in MongoDB
→ Return URL to frontend → Display image
```

### 2. Delete Flow (Individual Image)
```
User clicks delete on image → POST /api/upload/delete with URL
→ Extract publicId from URL → Delete from Cloudinary
→ Remove URL from package.images array → Success response
```

### 3. Delete Flow (Package with Images)
```
User deletes package → DELETE /api/packages/[id]
→ Retrieve package with images array → Extract all publicIds
→ Batch delete from Cloudinary → Delete package from MongoDB
→ Success response
```

## Key Features

✓ Backend-only image handling (secure)
✓ Automatic image cleanup on package deletion
✓ Support for multiple image formats
✓ Base64 and File object support
✓ Protected endpoints (authentication required)
✓ Proper error handling at each step
✓ MongoDB URL storage
✓ Cloudinary folder organization
✓ Public ID extraction from URLs
✓ Batch deletion support
