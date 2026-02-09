
import { z } from "zod";

export const getLocationSchema = z.object({});

export const getLocationAction = async () => {
  if (typeof window === "undefined" || !navigator.geolocation) {
    return { error: "Geolocation not supported or window not available" };
  }

  // We check if permission was already granted (approximate check via permissions API)
  try {
    const permissionStatus = await (navigator as any).permissions.query({ name: 'geolocation' });
    if (permissionStatus.state === 'granted') {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ 
            lat: pos.coords.latitude, 
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            status: 'granted'
          }),
          (err) => resolve({ error: err.message, status: 'denied' }),
          { timeout: 5000 }
        );
      });
    } else {
      return { status: 'prompt_required', message: "User location permission is required. Please use the LocationPermissionCard component." };
    }
  } catch (e) {
    return { status: 'unknown', message: "Could not check permission status automatically." };
  }
};
