import { useEffect, useRef, useState } from 'react';

const TRANSPARENT_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export default function LazyImage({
  src,
  alt,
  className = '',
  onLoad,
  observerMargin = '180px',
  ...props
}) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const node = imgRef.current;
    if (!node) {
      return undefined;
    }

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
      { rootMargin: observerMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [observerMargin, src]);

  const handleLoad = (event) => {
    setHasLoaded(true);
    if (onLoad) {
      onLoad(event);
    }
  };

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : TRANSPARENT_PIXEL}
      alt={alt}
      className={`transition-opacity duration-500 ease-out ${
        hasLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      loading="lazy"
      decoding="async"
      onLoad={handleLoad}
      {...props}
    />
  );
}
