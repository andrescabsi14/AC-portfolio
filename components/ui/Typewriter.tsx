'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface TypewriterProps {
  text: string;
  speed?: number; // milliseconds per character
  isMarkdown?: boolean;
  isHtml?: boolean;
  onComplete?: () => void;
  className?: string;
  startDelay?: number; // milliseconds before starting
  triggerInView?: boolean; // if true (default), start when fully visible in viewport
}

export default function Typewriter({
  text,
  speed = 50,
  isMarkdown = false,
  isHtml = false,
  onComplete,
  className = '',
  startDelay = 0,
  triggerInView = true,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showHtml, setShowHtml] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 1.0, once: false });
  const shouldStart = triggerInView ? isInView : true;

  // Optional start delay (runs once on mount)
  useEffect(() => {
    if (startDelay > 0) {
      const delayTimeout = setTimeout(() => { }, startDelay);
      return () => clearTimeout(delayTimeout);
    }
  }, [startDelay]);

  // Initiate typing or HTML rendering when conditions are met
  useEffect(() => {
    if (!shouldStart) return;
    if (isHtml) {
      setShowHtml(true);
    } else if (!hasStarted) {
      setHasStarted(true);
      setCurrentIndex(0);
    }
  }, [shouldStart, isHtml, hasStarted]);

  // Typing effect for plain text / markdown
  useEffect(() => {
    if (isHtml || !hasStarted) return;
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
  }, [currentIndex, text, speed, onComplete, isComplete, hasStarted, isHtml]);

  // Convert JSX‑style className to HTML class attribute for raw HTML strings
  const sanitizedHtml = isHtml ? text.replace(/className=/g, 'class=') : '';

  if (isMarkdown) {
    return (
      <div ref={ref} className={className}>
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

  if (isHtml) {
    return (
      <div ref={ref} className={className}>
        {showHtml && (
          <span dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        )}
        {!isComplete && !showHtml && <span className="animate-pulse">|</span>}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </div>
  );
}
