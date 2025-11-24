'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const companies = [
    {
        id: 1,
        name: "Coca-Cola",
        logo: "/logos/coca-cola-logo.png",
    },
    {
        id: 2,
        name: "Gillette",
        logo: "/logos/Gillette-Logo.wine.svg",
    },
    {
        id: 3,
        name: "DJI",
        logo: "/logos/png-clipart-dji-logo-music-white-point-dji-drone-logo-angle-white.png",
    },
    // Add more companies as needed
];

export default function ProjectParticipationSection() {
    return (
        <section className="py-12 bg-black border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
                    Participated in Projects for Global Companies
                </p>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {companies.map((company, index) => (
                        <motion.div
                            key={company.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center justify-center h-12 hover:opacity-100 transition-opacity cursor-default"
                        >
                            <div className="relative h-full w-32">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
