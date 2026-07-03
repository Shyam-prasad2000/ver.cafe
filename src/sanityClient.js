import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Configure Sanity Client
// Replace these values with your actual Sanity project credentials
export const sanityClient = createClient({
  projectId: 'bm13g5ye', // Replace with your Sanity project ID (must contain only a-z, 0-9, and dashes)
  dataset: 'production',      // Replace with your dataset name (e.g., 'production')
  apiVersion: '2026-07-02',  // Use current date for api versioning
  useCdn: true,               // True for fast response (read-only cached CDN queries)
  token: '',                  // Leave empty for public read queries
});

// Helper to build image URLs from Sanity image assets
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source) => {
  if (!source) return '';
  return builder.image(source);
};

// Check if client is configured
export const isSanityConfigured = () => {
  const pid = sanityClient.config().projectId;
  return pid && pid !== 'unconfigured';
};
