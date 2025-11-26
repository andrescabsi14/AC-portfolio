'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const organizations = [
    {
        id: 1,
        name: "Young Leaders of the Americas Initiative Network",
        logo: "/memberof/1.png",
        description: "Young Leaders of the Americas Initiative Network"
    },
    {
        id: 2,
        name: "Presidential Precinct",
        logo: "/memberof/2.png",
        description: "Presidential Precinct"
    },
    {
        id: 3,
        name: "International Exchange Alumni Network",
        logo: "/memberof/3.png",
        description: "International Exchange Alumni Network"
    },
    {
        id: 4,
        name: "ASOUSA",
        logo: "/memberof/4.png",
        description: "Asociacion de Exbecarios de Programas Estadounidenses"
    },
    {
        id: 5,
        name: "DataScience Foundation",
        logo: "/memberof/5.png",
        description: "DataScience Foundation USA"
    },
];

export default function MembershipSection() {
    const height = 100;
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 80%','center', 'end 120%'],
    });
    const progressSteps = [0, 0.3, 1];
    const titleY = useTransform(scrollYProgress, progressSteps, [-200, 0, 0]);
    const titleOpacity = useTransform(scrollYProgress, progressSteps, [1, 1, 0]);
    const circleY = useTransform(scrollYProgress, progressSteps, [0, 0, 0]);
    const circleOpacity = useTransform(scrollYProgress, progressSteps, [0, 1, 0]);
    return (
        <motion.section
            ref={sectionRef}
            className="py-20 bg-black border-b border-white/5 relative"
            style={{ height: `${height}vh`, minHeight: `${height}vh` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
        >
            <div className="max-w-7xl mx-auto px-6">
                {/* Animated Title */}
                <motion.div
                    className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-12"
                    style={{ y: titleY, opacity: titleOpacity }}
                >
                    Member of
                </motion.div>

                {/* Logo Grid with Circular Containers */}
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 max-w-5xl mx-auto">
                    {organizations.map((org) => (
                        <motion.div
                            key={org.id}
                            className="group flex flex-col items-center gap-4 cursor-default"
                            style={{ y: circleY, opacity: circleOpacity }}
                            transition={{delay: 0.3}}
                        >
                                {/* Circular Logo Container */}
                                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-white overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-white/20">
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <Image
                                            src={org.logo}
                                            alt={org.name}
                                            fill
                                            sizes="(max-width: 768px) 128px, 144px"
                                            className="object-contain p-6"
                                        />
                                    </div>
                                </div>

                                {/* Organization Name */}
                                <p className="text-sm md:text-base font-light text-white/70 group-hover:text-white transition-colors text-center max-w-[140px] leading-tight">
                                    {org.name}
                                </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Gradient Fade-in for Next Section */}
            <div className="absolute bottom-[-16vh] left-0 right-0 h-[20vh] bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-30" />
        </motion.section>
    );
}
