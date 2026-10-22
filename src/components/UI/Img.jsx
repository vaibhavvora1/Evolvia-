import React from 'react';
import './Img.css';

/**
 * Reusable MediaFrame / Img component
 * Enforces fixed aspect ratio, zero stretching, centered object-fit,
 * placeholder background (--bg-alt), and responsive mobile bounds.
 *
 * @param {string} src - Image URL
 * @param {string} alt - Accessible description
 * @param {string} [ratio] - Aspect ratio preset ('banner', '16/10', '4/5', '4/3', '1/1') or custom CSS ratio
 * @param {boolean} [priority=false] - Eager loading & high fetchpriority if true
 * @param {string} [objectPosition='center'] - Custom object position (e.g., 'center top' for portraits)
 * @param {string} [className] - Additional wrapper class names
 * @param {string} [imgClassName] - Additional inner img class names
 * @param {React.Ref} [imgRef] - Ref forwarded to inner <img>
 * @param {number|string} [width] - Image width attribute
 * @param {number|string} [height] - Image height attribute
 * @param {object} [style] - Wrapper inline styles
 */
export default function Img({
  src,
  alt = '',
  ratio = '16/10',
  priority = false,
  objectPosition = 'center',
  className = '',
  imgClassName = '',
  imgRef,
  width,
  height,
  style,
  ...restProps
}) {
  let presetClass = '';
  let inlineRatio = undefined;

  if (ratio === 'banner' || ratio === '21/9') {
    presetClass = 'media-frame--banner';
  } else if (ratio === '16/10' || ratio === '16:10') {
    presetClass = 'media-frame--card';
  } else if (ratio === '4/5' || ratio === '4:5') {
    presetClass = 'media-frame--team';
  } else if (ratio === '4/3' || ratio === '4:3') {
    presetClass = 'media-frame--gallery';
  } else if (ratio === '1/1' || ratio === '1:1') {
    presetClass = 'media-frame--square';
  } else if (ratio) {
    inlineRatio = ratio;
  }

  const frameStyles = {
    ...(inlineRatio ? { aspectRatio: inlineRatio } : {}),
    ...style,
  };

  const imgStyles = {
    objectPosition,
  };

  return (
    <div className={`media-frame ${presetClass} ${className}`.trim()} style={frameStyles}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`media-frame-img ${imgClassName}`.trim()}
        style={imgStyles}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        {...restProps}
      />
    </div>
  );
}
