'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function StrategicHeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h2 className="text-sm md:text-base font-medium tracking-[0.3em] text-blue-400 uppercase mb-6">
                        World-Class Expertise
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight mb-8 leading-tight">
                        Strategic AI <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
                            Leadership
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                        Bridging the gap between technical innovation and business value.
                        Empowering organizations to navigate the AI revolution with confidence and clarity.
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
