import { useEffect, useRef } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCode = ({ value, size = 128, className = '' }: QRCodeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;
    const img = document.createElement('img');
    img.src = qrUrl;
    img.alt = 'QR Code';
    img.className = 'w-full h-full object-contain';
    img.style.width =`${size}px`;
    img.style.height =`${size}px`;
    containerRef.current.appendChild(img);
  }, [value, size]);
  return (
    <div 
      ref={containerRef}
      className={`border border-gray-200 rounded ${className}`}
      style={{ width: size, height: size }}
    />
  );
};