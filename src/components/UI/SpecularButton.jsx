import React, { useRef, useState } from 'react';
import './SpecularButton.css';

export default function SpecularButton({
  children,
  onClick,
  href,
  className = '',
  variant = 'primary', // 'primary' | 'dark' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon = null,
  type = 'button',
  ...rest
}) {
  const btnRef = useRef(null);
  const [coords, setCoords] = useState({ x: -100, y: -100, active: false });

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords((prev) => ({ ...prev, active: false }));
  };

  const content = (
    <>
      <span
        className="specular-glare"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          opacity: coords.active ? 1 : 0,
        }}
        aria-hidden="true"
      />
      <span className="specular-content">{children}</span>
      {icon && <span className="specular-icon" aria-hidden="true">{icon}</span>}
    </>
  );

  const classes = `specular-btn specular-btn--${variant} specular-btn--${size} ${className}`;

  if (href) {
    return (
      <a
        ref={btnRef}
        href={href}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef}
      type={type}
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
}
