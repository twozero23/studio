
"use client";

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  duration = 2000,
  className,
  suffix = "",
  prefix = ""
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current && observer) { // Check if ref.current exists before unobserving
        observer.unobserve(ref.current);
      }
    };
  }, []); // Removed ref.current from dependencies as observer handles it

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Use floating point for smoother animation of decimals
      setCount(progress * targetValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure final count is exactly targetValue to avoid floating point inaccuracies
        setCount(targetValue);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration, isInView]);

  // Determine number of decimal places from targetValue if it's a float, otherwise 0
  const decimalPlaces = Math.floor(targetValue) === targetValue ? 0 : (targetValue.toString().split('.')[1] || '').length;

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString(undefined, { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}{suffix}
    </span>
  );
};

export default AnimatedCounter;
