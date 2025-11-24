'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const baseCompanies = [
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
];

// Repeat companies to fill the grid (12 items)
const companies = Array(4).fill(baseCompanies).flat().map((company, index) => ({
    ...company,
    id: index + 1 // Ensure unique IDs for keys
}));

export default function ProjectParticipationSection() {
    return (
        <section className="py-24 bg-black border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-6">
                    <h3 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight">
                        Projects
                    </h3>
                    <div className="w-24 h-px bg-white/20 mx-auto" />
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
                        For the last 12 years I've had the priviledge of working in projects with some of the best companies in the world.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10">
                    {companies.map((company, index) => (
                        <motion.div
                            key={company.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative flex items-center justify-center h-40 border-r border-b border-white/10 p-8 hover:bg-white/5 transition-colors duration-300"
                        >
                            <div className="relative h-full w-full opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={company.logo}
                                    alt={company.name}
                                    fill
                                    className="object-contain invert brightness-0 filter"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
