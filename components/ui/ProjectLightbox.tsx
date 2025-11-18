'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { useEffect } from 'react';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
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
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors z-10"
            >
              <span className="text-2xl text-white">×</span>
            </button>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-cyan-400 font-bold text-xl">{project.year}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">
                    {project.location.city}, {project.location.country}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h2>
                <p className="text-xl text-gray-300">{project.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-zinc-800 text-cyan-400 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="mb-8">
                <p className="text-lg text-gray-300 leading-relaxed">{project.details}</p>
              </div>

              {/* Achievements */}
              {project.achievements && project.achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Achievements</h3>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="text-cyan-400 mt-1">▸</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 text-purple-200 rounded-lg text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
