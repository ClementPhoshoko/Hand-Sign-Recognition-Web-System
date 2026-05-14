/**
 * Utility to generate happy, cute, and strictly gender-neutral avatar URLs.
 * Uses DiceBear's "thumbs" collection for playful, abstract characters.
 */

const AVATAR_STYLE = 'thumbs';
const BASE_URL = `https://api.dicebear.com/7.x/${AVATAR_STYLE}/svg`;

/**
 * Generates a consistent avatar URL for a given seed.
 * The same seed will always return the same avatar appearance.
 * 
 * @param {string} seed - A unique identifier (e.g., username, user ID)
 * @returns {string} The URL to the SVG avatar
 */
export const getAvatarUrl = (seed) => {
  const safeSeed = seed || 'Guest';
  
  // We sanitize the seed to be URL-friendly
  const encodedSeed = encodeURIComponent(safeSeed);
  
  // Options: 
  // - backgroundColor: subtle pastel colors
  // - radius: for rounded corners
  return `${BASE_URL}?seed=${encodedSeed}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`;
};

/**
 * Persists or retrieves a session-specific avatar seed.
 * This ensures that a guest user keeps the same avatar 
 * if they refresh the page during a meeting.
 * 
 * @param {string} userId - The unique ID of the user
 * @returns {string} The stored or newly generated seed
 */
export const getSessionSeed = (userId) => {
  const storageKey = `gl_avatar_seed_${userId}`;
  let seed = sessionStorage.getItem(storageKey);
  
  if (!seed) {
    // Generate a random seed for this session
    seed = Math.random().toString(36).substring(7);
    sessionStorage.setItem(storageKey, seed);
  }
  
  return seed;
};
