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
          transition={{ duration: 0.5 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
              delay: isExpanding ? 0.3 : 0
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-zinc-900/95 via-zinc-800/95 to-black/95 backdrop-blur-2xl border-2 border-cyan-500/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl shadow-cyan-500/20"
            style={{
              boxShadow: '0 0 60px rgba(34, 211, 238, 0.15), inset 0 0 40px rgba(34, 211, 238, 0.05)'
            }}
          >
            {/* Decorative gradient orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center transition-all z-10 shadow-lg hover:shadow-cyan-500/25"
            >
              <span className="text-3xl text-white font-light">×</span>
            </motion.button>

            {/* Content */}
            <div className="p-8 md:p-12 relative z-10">
              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-400 font-bold text-lg"
                  >
                    {project.year}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-500 text-xl"
                  >
                    •
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-lg"
                  >
                    📍 {project.location.city}, {project.location.country}
                  </motion.span>
                </div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent mb-6"
                >
                  {project.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                >
                  {project.description}
                </motion.p>
              </div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/40 text-cyan-300 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mb-10 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <p className="text-lg text-gray-200 leading-relaxed">{project.details}</p>
              </motion.div>

              {/* Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mb-10"
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
                    ✨ Achievements
                  </h3>
                  <ul className="space-y-4">
                    {project.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        className="flex items-start gap-4 text-gray-200 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all group"
                      >
                        <span className="text-cyan-400 text-2xl mt-0.5 group-hover:scale-125 transition-transform">▸</span>
                        <span className="text-lg">{achievement}</span>
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
                  transition={{ delay: 1.2 }}
                >
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
                    🛠️ Technologies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.3 + index * 0.05 }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        className="px-5 py-3 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-purple-900/30 border border-purple-400/40 text-purple-100 rounded-xl text-sm font-semibold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 transition-all"
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
