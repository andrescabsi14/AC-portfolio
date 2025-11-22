'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';

interface GlobeMoment {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

interface MomentLightboxProps {
  moment: GlobeMoment | null;
  onClose: () => void;
}

export default function MomentLightbox({ moment, onClose }: MomentLightboxProps) {
  useEffect(() => {
    if (moment) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [moment]);

  // Handle ESC key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && moment) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [moment, onClose]);

  return (
    <AnimatePresence mode="wait">
      {moment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close button */}
            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onClose();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors z-[999] bg-black/50 backdrop-blur-sm"
            >
              <span className="text-2xl text-white/60 hover:text-white/80 cursor-pointer" style={{ height: '35px' }}>
                ×
              </span>
            </motion.button>

            {/* Image */}
            {moment.image && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative w-full h-64 md:h-96 rounded-t-2xl overflow-hidden bg-white/5"
              >
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </motion.div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12 relative z-10">
              {/* Header */}
              <div className="mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-light text-white mb-3"
                >
                  {moment.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-white/60 font-light italic mb-6"
                >
                  {moment.subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-base md:text-lg text-white/80 leading-relaxed"
                >
                  {moment.description}
                </motion.p>
              </div>

              {/* Location coordinates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-white/40 text-sm"
              >
                <span>📍</span>
                <span>
                  {moment.lat.toFixed(4)}°, {moment.lng.toFixed(4)}°
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
