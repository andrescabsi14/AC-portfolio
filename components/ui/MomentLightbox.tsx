'use client';

import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { CityMomentItem, CityMoments, GlobeItemType } from '@/data/cityMoments';

const TYPE_LABELS: Record<GlobeItemType, string> = {
  recognition: 'Recognition',
  event: 'Event',
  project: 'Project',
  speaker: 'Speaker'
};

const TYPE_COLORS: Record<GlobeItemType, string> = {
  recognition: '#ef4444',
  event: '#ef4444',
  project: '#ef4444',
  speaker: '#ef4444'
};

const LIGHTBOX_EASE: [number, number, number, number] = [0.33, 1, 0.68, 1];

const SLIDE_VARIANTS = {
  enter: (_dir: number) => ({
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)'
  }),
  center: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: LIGHTBOX_EASE }
  },
  exit: (_dir: number) => ({
    opacity: 0,
    scale: 1.05,
    filter: 'blur(12px)',
    transition: { duration: 0.45, ease: LIGHTBOX_EASE }
  })
};

interface MomentLightboxProps {
  moment: (CityMoments & { items: CityMomentItem[] }) | null;
  onClose: () => void;
}

export default function MomentLightbox({ moment, onClose }: MomentLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const lastInteractionRef = useRef(Date.now());

  useEffect(() => {
    document.body.style.overflow = moment ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [moment]);

  useEffect(() => {
    setCurrentIndex(0);
    setDirection(1);
  }, [moment]);

  useEffect(() => {
    if (!moment || moment.items.length <= 1) return;
    const timer = setInterval(() => {
      if (Date.now() - lastInteractionRef.current < 1500) return;
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % moment.items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [moment]);

  const currentItem = moment ? moment.items[currentIndex] : null;
  const hasMultiple = !!moment && moment.items.length > 1;

  const handleNext = useCallback(() => {
    if (!moment) return;
    lastInteractionRef.current = Date.now();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % moment.items.length);
  }, [moment]);

  const handlePrev = useCallback(() => {
    if (!moment) return;
    lastInteractionRef.current = Date.now();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + moment.items.length) % moment.items.length);
  }, [moment]);

  useEffect(() => {
    if (!moment) return;
    const handleKey = (event: KeyboardEvent) => {
      if (!moment) return;
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [moment, onClose, handleNext, handlePrev]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!hasMultiple) return;
      if (Math.abs(info.offset.x) > 60) {
        lastInteractionRef.current = Date.now();
        if (info.offset.x < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    },
    [hasMultiple, handleNext, handlePrev]
  );

  const pagination = useMemo(() => {
    if (!moment) return null;
    return moment.items.map((item, index) => {
      const active = index === currentIndex;
      return (
        <button
          key={item.id}
          onClick={() => {
            lastInteractionRef.current = Date.now();
            setDirection(index > currentIndex ? 1 : -1);
            setCurrentIndex(index);
          }}
          className={`h-1.5 rounded-full transition-all cursor-pointer ${
            active ? 'bg-white w-12' : 'bg-white/30 w-4'
          }`}
        />
      );
    });
  }, [moment, currentIndex]);

  return (
    <AnimatePresence mode="wait">
      {moment && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        className="fixed inset-0 bg-gradient-to-b from-black/5 via-black/50 to-black/5 backdrop-blur-sm z-[60] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-visible relative"
          >
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

            <div className="relative bg-white/5">
              {hasMultiple && (
                <>
                  <button
                    onClick={() => {
                      lastInteractionRef.current = Date.now();
                      handlePrev();
                    }}
                    className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      lastInteractionRef.current = Date.now();
                      handleNext();
                    }}
                    className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition cursor-pointer"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </>
              )}

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`${moment.id}-${currentItem.id}`}
                  custom={direction}
                  variants={SLIDE_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag={hasMultiple ? 'x' : undefined}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                >
                  {currentItem.image && (
                    <div
                      className="relative w-full h-64 md:h-96 overflow-hidden bg-white/5"
                      style={{
                        backgroundImage: `url(${currentItem.image})`,
                        backgroundPosition: currentItem.imagePosition || 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <Image
                        src={currentItem.image}
                        alt={currentItem.title}
                        fill
                        className="object-cover opacity-0"
                        sizes="(max-width: 768px) 100vw, 896px"
                      />
                    </div>
                  )}

                  <div className="p-8 md:p-12 relative z-10 bg-black">
                    {currentItem.type && (
                      <div className="absolute top-8 right-8 flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.25)]"
                          style={{ backgroundColor: `${TYPE_COLORS[currentItem.type]}33`, color: '#fff' }}
                        >
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[currentItem.type] }} />
                          {TYPE_LABELS[currentItem.type]}
                        </span>
                      </div>
                    )}
                    <div className="mb-8">
                      {currentItem.title && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl md:text-3xl text-white font-semibold mb-2"
                        >
                          {currentItem.title}
                        </motion.p>
                      )}


                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-lg md:text-xl text-white/60 font-light italic mb-6"
                      >
                        {currentItem.subtitle}
                      </motion.p>

                      {currentItem.type && (
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="text-base text-white/60 uppercase tracking-widest mb-2"
                        >
                          {moment.city}
                        </motion.p>
                      )}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-base md:text-lg text-white/80 leading-relaxed"
                      >
                        {currentItem.description}
                      </motion.p>
                      {(currentItem.year || currentItem.venue || moment.city) && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 }}
                          className="mt-6 space-y-2 text-sm text-white/60"
                        >
                          {currentItem.year && (
                            <div>
                              <span className="font-semibold text-white/70">Year:</span> {currentItem.year}
                            </div>
                          )}
                          {currentItem.venue && (
                            <div>
                              <span className="font-semibold text-white/70">Venue:</span> {currentItem.venue}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

          
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {hasMultiple && (
              <div className="px-8 md:px-12 py-6 bg-black/90 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">{pagination}</div>
                <div className="flex items-center gap-4 text-white/70 text-sm">
                  <span>
                    {currentIndex + 1} / {moment.items.length}
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
