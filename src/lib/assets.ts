/**
 * Utility function to get the correct asset path for GitHub Pages deployment
 * @param path - The asset path relative to the public folder (should start with /)
 * @returns The correct asset path with base URL
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In development, use the path as is
  if (import.meta.env.DEV) {
    return `/${cleanPath}`;
  }
  
  // In production, use the base URL
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};