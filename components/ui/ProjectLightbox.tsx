'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { useEffect } from 'react';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  isExpanding?: boolean;
}

export default function ProjectLightbox({ project, onClose, isExpanding = false }: ProjectLightboxProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              delay: isExpanding ? 0.3 : 0
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
              className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/20 hover:border-white/40 flex items-center justify-center transition-colors z-[999]"
            >
              <span className="text-2xl text-white/60 hover:text-white/80 cursor-pointer" style={{ height: '35px'}}>×</span>
            </motion.button>

            {/* Content */}
            <div className="p-8 md:p-12 relative z-10">
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-8">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="px-3 py-1 border border-white/20 rounded-full text-white/60 text-sm font-medium"
                  >
                    {project.year}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-white/30"
                  >
                    •
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 text-sm"
                  >
                    📍 {project.location.city}, {project.location.country}
                  </motion.span>
                </div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl font-light text-white mb-4"
                >
                  {project.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/70 leading-relaxed"
                >
                  {project.description}
                </motion.p>
              </div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3 mb-12"
              >
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white/90 rounded-lg text-xs font-medium transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-12 p-8 bg-white/5 rounded-lg border border-white/10"
              >
                <p className="text-base text-white/70 leading-relaxed">{project.details}</p>
              </motion.div>

              {/* Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-light text-white mb-6">✨ Achievements</h3>
                  <ul className="space-y-3">
                    {project.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                        className="flex items-start gap-3 text-white/70 pl-2 group"
                      >
                        <span className="text-white/40 mt-1 group-hover:text-white/70 transition-colors">▸</span>
                        <span className="text-sm">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <h3 className="text-2xl font-light text-white mb-6">🛠️ Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1 + index * 0.04 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white/90 rounded-lg text-xs font-medium transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
