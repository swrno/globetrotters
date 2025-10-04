import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary
 * @param file - Base64 encoded image data or file buffer
 * @param folder - Cloudinary folder name (default: 'globetrotters/packages')
 * @returns Object containing secure_url and public_id
 */
export async function uploadImage(file: string, folder: string = 'globetrotters/packages') {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

/**
 * Delete an image from Cloudinary
 * @param publicId - The public_id of the image to delete
 * @returns Deletion result
 */
export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}

/**
 * Delete multiple images from Cloudinary
 * @param publicIds - Array of public_ids to delete
 * @returns Deletion results
 */
export async function deleteImages(publicIds: string[]) {
  try {
    const results = await Promise.all(
      publicIds.map(publicId => cloudinary.uploader.destroy(publicId))
    );
    return results;
  } catch (error) {
    console.error('Error deleting images from Cloudinary:', error);
    throw new Error('Failed to delete images');
  }
}

/**
 * Extract public_id from Cloudinary URL
 * @param url - Cloudinary image URL
 * @returns public_id or null if not a valid Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{public_id}.{format}
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    }
    
    // Alternative format without version
    const regex2 = /\/upload\/(.+)\.\w+$/;
    const match2 = url.match(regex2);
    if (match2) {
      return match2[1];
    }
    
    return null;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
}

export default cloudinary;
