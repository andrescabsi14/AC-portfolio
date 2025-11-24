'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

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
    const height = 500;
    return (
        <section className={`py-20 bg-black border-b border-white/5`} style={{ height: `${height}px`, minHeight: `${height}px` }}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Animated Title */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-12"
                >
                    Member of
                </motion.p>

                {/* Logo Grid with Circular Containers */}
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 max-w-5xl mx-auto">
                    {organizations.map((org, index) => (
                        <motion.div
                            key={org.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.5,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="group flex flex-col items-center gap-4 cursor-default"
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
        </section>
    );
}
