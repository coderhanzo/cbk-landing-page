import { useEffect, useMemo, useState } from "react";
import imageManifest from "../data/imageManifest.json";

const DEFAULT_DIMENSIONS = { width: 800, height: 600 };

const buildSrcSet = (sources = []) =>
  sources.map((entry) => `${entry.src} ${entry.width}w`).join(", ");

const getLargestSource = (sources = []) =>
  sources.reduce(
    (largest, entry) => (!largest || entry.width > largest.width ? entry : largest),
    undefined
  );

export default function ResponsiveImage({
  imageKey,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  loading,
  fetchpriority,
  fetchPriority,
  width,
  height,
  decoding = "async",
  placeholder = true,
  onLoad,
  style,
  ...rest
}) {
  const normalizedKey = imageKey?.toLowerCase();
  const metadata = normalizedKey ? imageManifest[normalizedKey] : undefined;

  const avifSrcSet = useMemo(() => buildSrcSet(metadata?.sources?.avif), [metadata]);
  const webpSrcSet = useMemo(() => buildSrcSet(metadata?.sources?.webp), [metadata]);
  const fallbackSources = metadata?.sources?.jpeg || metadata?.sources?.jpg || metadata?.sources?.png;
  const fallbackSrcSet = useMemo(() => buildSrcSet(fallbackSources), [fallbackSources]);
  const largestFallback = useMemo(() => getLargestSource(fallbackSources), [fallbackSources]);

  const resolvedWidth = width ?? metadata?.width ?? DEFAULT_DIMENSIONS.width;
  const resolvedHeight = height ?? metadata?.height ?? DEFAULT_DIMENSIONS.height;
  const resolvedLoading = loading ?? (priority ? "eager" : "lazy");
  const resolvedFetchPriority = fetchPriority ?? fetchpriority ?? (priority ? "high" : undefined);
  const fallbackSrc = largestFallback?.src || imageKey;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!priority || !fallbackSrc) return undefined;
    if (typeof document === "undefined") return undefined;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = fallbackSrc;
    if (fallbackSrcSet) link.imageSrcset = fallbackSrcSet;
    if (sizes) link.imageSizes = sizes;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [priority, fallbackSrc, fallbackSrcSet, sizes]);

  const handleLoad = (event) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(event);
    }
  };

  const placeholderStyles =
    placeholder && metadata?.placeholder
      ? {
          backgroundImage: `url(${metadata.placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: isLoaded ? "none" : "blur(20px)",
          transition: "opacity 300ms ease-out, filter 200ms ease-out",
        }
      : {
          transition: "opacity 300ms ease-out",
        };

  const imgClassName = `transition-opacity duration-300 ease-out ${className}`.trim();

  return (
    <picture>
      {avifSrcSet && <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />}
      {webpSrcSet && <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />}
      <img
        src={fallbackSrc}
        srcSet={fallbackSrcSet || undefined}
        sizes={sizes}
        loading={resolvedLoading}
        fetchPriority={resolvedFetchPriority}
        decoding={decoding}
        width={resolvedWidth}
        height={resolvedHeight}
        alt={alt}
        className={imgClassName}
        onLoad={handleLoad}
        style={{
          opacity: isLoaded ? 1 : 0,
          ...placeholderStyles,
          ...style,
        }}
        {...rest}
      />
    </picture>
  );
}
