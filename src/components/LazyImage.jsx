import { useEffect, useRef, useState } from 'react';
import { createBlurDataURL, getImageDimensions } from '../utils/imageUtils';

const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export default function LazyImage({
  src,
  alt,
  className = '',
  onLoad,
  observerMargin = '50px',
  ...props
}) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [dimensions] = useState(() => getImageDimensions(src));
  const [placeholder] = useState(() => createBlurDataURL(dimensions.width, dimensions.height));

  useEffect(() => {
    const node = imgRef.current;
    if (!node) return undefined;

    // Reset state when src changes
    setHasLoaded(false);

    if ('loading' in HTMLImageElement.prototype) {
      setIsVisible(true);
      return undefined;
    }

    setIsVisible(false);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { 
        rootMargin: observerMargin,
        threshold: 0.1
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [src, observerMargin]);

  const handleLoad = (event) => {
    setHasLoaded(true);
    if (onLoad) {
      onLoad(event);
    }
  };

  const handleError = () => {
    setHasLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : placeholder}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={`transition-opacity duration-300 ease-out ${
        hasLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      loading="lazy"
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}