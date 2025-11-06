'use client';
import { useEffect, useState } from 'react';

export function useCarousel(count: number = 5, intervalMs: number = 3000) {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);

  // ✅ สุ่มรูปจาก picsum.photos
  useEffect(() => {
    const randomImages = Array.from({ length: count }, () => 
      `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 10000)}`
    );
    setImages(randomImages);
  }, [count]);

  // ✅ เปลี่ยนรูปอัตโนมัติทุก intervalMs
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images, intervalMs]);

  // ✅ ฟังก์ชันควบคุมด้วยมือ
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goTo = (index: number) => setCurrent(index);

  return { images, current, next, prev, goTo };
}
