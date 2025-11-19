export const optimizeImageUrl = (url, options = {}) => {
  // If you're using a CDN or image optimization service, add parameters here
  // Example for Cloudinary, Imgix, or similar services:
  // return `${url}?w=${options.width || 800}&h=${options.height || 600}&q=${options.quality || 75}&fit=crop`;
  
  // For now, return the original URL
  return url;
};

export const preloadImages = (urls) => {
  if (typeof window !== 'undefined') {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }
};

export const getImageDimensions = (url) => {
  // You can pre-define dimensions for known images or extract from filename
  // This helps prevent layout shifts
  const dimensionMap = {
    '/imgs/01.jpeg': { width: 400, height: 600 },
    '/imgs/02.jpeg': { width: 400, height: 600 },
    // Add dimensions for all your images
  };
  
  return dimensionMap[url] || { width: 400, height: 500 }; // Default dimensions
};

export const createBlurDataURL = (width, height) => {
  // Create a tiny blurred placeholder
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>
  `)}`;
};