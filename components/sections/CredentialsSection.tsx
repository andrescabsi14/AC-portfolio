'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Credential {
    id: number;
    title: string;
    organization: string;
    year: string;
    description: string;
    image: string;
    accentColor: string;
}

const credentials: Credential[] = [
    {
        id: 1,
        title: 'Young Leaders of the Americas Initiative',
        organization: 'U.S. Department of State',
        year: '2016',
        description: 'Selected as one of 250 exceptional young leaders from Latin America and the Caribbean. Recognized by President Barack Obama for entrepreneurial excellence and commitment to economic development.',
        image: '/photos/certificate/PresidentObamaCertificate.jpg',
        accentColor: 'from-blue-500 to-indigo-500'
    },
    {
        id: 2,
        title: 'Young Influencer',
        organization: 'Denmark Technical University (DTU)',
        year: '2018',
        description: 'Acknowledged as a leading voice in sustainable innovation and technology at the C40 World Mayors Summit in Copenhagen. Contributing to global discussions on urban sustainability.',
        image: '/honors/dtu.jpg',
        accentColor: 'from-red-500 to-orange-500'
    },
    {
        id: 3,
        title: 'Global Speaker & Thought Leader',
        organization: 'International Summits',
        year: 'Ongoing',
        description: 'Regular contributor to high-level dialogues on AI, technology, and future readiness. Bridging the gap between policy, technology, and practical implementation.',
        image: '/honors/detroit.jpg', // Placeholder for now
        accentColor: 'from-purple-500 to-pink-500'
    }
];

export default function CredentialsSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="relative py-32 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                        Global <span className="font-semibold">Recognition</span>
                    </h2>
                    <div className="h-1 w-20 bg-blue-500" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {credentials.map((credential, index) => (
                        <motion.div
                            key={credential.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            onHoverStart={() => setHoveredId(credential.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="group relative"
                        >
                            <div className="relative h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-white/30">
                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    <img
                                        src={credential.image}
                                        alt={credential.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className={`h-1 w-12 mb-6 bg-gradient-to-r ${credential.accentColor}`} />

                                    <p className="text-sm font-medium text-white/60 mb-2 tracking-widest uppercase">
                                        {credential.organization}
                                    </p>

                                    <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">
                                        {credential.title}
                                    </h3>

                                    <p className="text-white/70 leading-relaxed text-sm opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                        {credential.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Notable Moments */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-32 max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl font-light text-white mb-12 text-center">Notable Moments</h3>
                    <div className="space-y-8">
                        {[
                            {
                                title: 'Meeting with Richard Branson',
                                description: 'Engaged in meaningful discussions with Sir Richard Branson during the YLAI Fellowship at the U.S. Department of State, exchanging insights on entrepreneurship and innovation.',
                                image: '/honors/ylai2016.jpg', // Using a placeholder from photos/mlb as Branson photo not explicitly named, user can swap
                                gradient: 'from-red-500/20 to-orange-500/20',
                                border: 'border-red-500/30'
                            },
                            {
                                title: 'Presidential Summits',
                                description: 'Participated in high-level presidential summits and international conferences, contributing to discussions on technology, innovation, and global economic development.',
                                image: '/honors/lima.png',
                                gradient: 'from-blue-500/20 to-purple-500/20',
                                border: 'border-blue-500/30'
                            }
                        ].map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="group flex gap-6 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors overflow-hidden relative"
                            >
                                <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border border-white/20 relative z-10">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="relative z-10 flex flex-col justify-center">
                                    <h4 className="text-xl font-medium text-white mb-2">{event.title}</h4>
                                    <p className="text-gray-400 leading-relaxed">{event.description}</p>
                                </div>
                                {/* Background Gradient Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
