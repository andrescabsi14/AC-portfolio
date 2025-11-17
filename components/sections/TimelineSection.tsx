'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    year: '2013',
    title: 'The Beginning',
    description: 'Started learning to code in Bogotá',
    color: 'from-blue-600 to-cyan-400',
  },
  {
    year: '2014',
    title: 'First Startup',
    description: 'Founded my first tech company',
    color: 'from-purple-600 to-pink-400',
  },
  {
    year: '2015',
    title: 'Breaking Barriers',
    description: 'Expanded to international markets',
    color: 'from-orange-600 to-red-400',
  },
  {
    year: '2016',
    title: 'YLAI Fellow',
    description: 'Selected for Presidential program',
    color: 'from-green-600 to-emerald-400',
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Horizontal scroll transform
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <div ref={sectionRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {projects.map((project, index) => (
            <div
              key={index}
              className="min-w-screen h-screen flex items-center justify-center px-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative max-w-4xl"
              >
                {/* Project Card */}
                <div className="relative">
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 blur-3xl rounded-3xl`}
                  />

                  {/* Image placeholder */}
                  <div className="relative bg-zinc-900 rounded-3xl overflow-hidden mb-8 border border-zinc-800">
                    <div className="aspect-video w-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                      <span className="text-9xl opacity-20">{project.year}</span>
                    </div>
                  </div>

                  {/* Text overlay */}
                  <div className="text-center">
                    <h3
                      className={`text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}
                    >
                      {project.year}
                    </h3>
                    <h4 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      {project.title}
                    </h4>
                    <p className="text-xl md:text-2xl text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
