'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

// Honors Data
const honors = [
    {
        id: 1,
        recognition: "Young Leaders of the Americas",
        individual: "Barack Obama",
        role: "President of the United States",
        year: "2016",
        image: "/honors/ylai2016.jpg",
        imagePosition: "center-center" as const,
        textPosition: "center-center" as const,
    },
    {
        id: 2,
        recognition: "Young Influencer",
        organization: "Denmark Technical University - C40 World Mayors Summit",
        year: "2019",
        image: "/honors/dtu.jpg",
        imagePosition: "center-center" as const,
        textPosition: "center-center" as const,
    }
];

interface HonorItemProps {
    honor: typeof honors[0];
}

function HonorItem({ honor }: HonorItemProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect for background image
    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    // Text positioning logic
    const getPositionClasses = (position: string) => {
        switch (position) {
            case 'bottom-left':
                return 'bottom-0 left-0 text-left pb-24 pl-12 md:pl-24';
            case 'bottom-right':
                return 'bottom-0 right-0 text-right pb-24 pr-12 md:pr-24';
            case 'center-center':
                return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center';
            case 'bottom-center':
                return 'bottom-0 left-1/2 -translate-x-1/2 text-center pb-24';
            default:
                return 'bottom-0 left-0 text-left pb-24 pl-12 md:pl-24';
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants: any = {
        hidden: {
            opacity: 0,
            y: 30,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <div ref={ref} className="relative w-full min-h-screen overflow-hidden flex flex-col">
            {/* Parallax Background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{ y, height: "140%", backgroundImage: `url(${honor.image})`, backgroundSize: "cover", backgroundPosition: honor.imagePosition || "center center" }}
                    className="relative w-full -top-[20%]"
                >
                    <Image
                        src={honor.image}
                        alt={honor.recognition}
                        fill
                        className="object-cover opacity-0"
                        sizes="100vw"
                        priority
                    />
                </motion.div>
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/40 z-10" />

                {/* Gradient Overlay based on text position for better readability */}
                <div className={`absolute inset-0 z-10 bg-gradient-to-b from-transparent via-black/20 to-black/80`} />
            </div>

            {/* Content */}
            <motion.div
                className={`absolute z-20 max-w-4xl w-full p-8 ${getPositionClasses(honor.textPosition)}`}
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <motion.h3
                    variants={itemVariants}
                    className="text-5xl md:text-7xl lg:text-8xl font-thin text-white mb-6 tracking-tight leading-[0.9]"
                >
                    {honor.recognition}
                </motion.h3>

                {honor.individual ? (
                    <motion.div variants={itemVariants}>
                        <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">
                            by <span className="text-white font-normal">{honor.individual}</span>
                        </p>
                    </motion.div>
                ) : (
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-white/80 font-light tracking-wide"
                    >
                        {honor.organization}
                    </motion.p>
                )}

                {honor.role && (
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-white/60 mt-2 font-light"
                    >
                        {honor.role}
                    </motion.p>
                )}

                <motion.div variants={itemVariants} className="mt-8">
                    <span className="inline-block px-4 py-1 border border-white/20 rounded-full text-sm font-mono text-white/60 tracking-widest uppercase backdrop-blur-sm">
                        {honor.year}
                    </span>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default function HonorsSection() {
    const titleRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: titleRef,
        offset: ["start start", "end start"]
    });

    const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);

    return (
        <section className="bg-black">
            {/* Title Section */}
            <div ref={titleRef} className="relative h-[100vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                <motion.div
                    style={{ opacity: titleOpacity, scale: titleScale }}
                    className="text-center px-4"
                >
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-[0.3em] mb-4">
                        Distinctions
                    </p>
                    <h2 className="text-4xl md:text-6xl font-thin text-white tracking-wide">
                        Honors & Recognition
                    </h2>
                </motion.div>
            </div>

            {/* Honors List */}
            <div className="flex flex-col">
                {honors.map((honor, index) => (
                    <HonorItem key={index} honor={honor} />
                ))}
            </div>
        </section>
    );
}
