'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypewriterProps {
  text: string;
  speed?: number; // milliseconds per character
  isMarkdown?: boolean;
  onComplete?: () => void;
  className?: string;
  startDelay?: number; // milliseconds before starting
}

export default function Typewriter({
  text,
  speed = 50,
  isMarkdown = false,
  onComplete,
  className = '',
  startDelay = 0,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimeout = setTimeout(() => {
        setCurrentIndex(0);
      }, startDelay);
      return () => clearTimeout(delayTimeout);
    }
  }, [startDelay]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete]);

  if (isMarkdown) {
    return (
      <div className={className}>
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-4">{children}</p>,
            h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-bold mb-2">{children}</h3>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            ul: ({ children }) => <ul className="list-disc list-inside mb-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            code: ({ children }) => (
              <code className="bg-white/10 px-2 py-1 rounded text-sm font-mono">{children}</code>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {displayedText}
        </ReactMarkdown>
        {!isComplete && <span className="animate-pulse">|</span>}
      </div>
    );
  }

  return (
    <div className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </div>
  );
}
