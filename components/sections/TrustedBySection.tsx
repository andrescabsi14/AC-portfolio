'use client';

import { motion } from 'framer-motion';

const brands = [
    {
        id: 1,
        recognition: "Young Leaders of the Americas",
        individual: "Barack Obama",
        role: "President of the United States",
        year: "2016"
    },
    {
        id: 2,
        recognition: "Young Influencer",
        organization: "Denmark Technical University - C40 World Mayors Summit",
        year: "2019"

    }
];

export default function TrustedBySection() {
    return (
        <section className="py-12 bg-black border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
                    Recognized by Global Organizations
                </p>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {brands.map((brand, index) => (
                        <motion.div
                            key={brand.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-xl font-semibold text-white/40 hover:text-white/80 transition-colors cursor-default"
                        >
                            {brand.recognition} by {brand.individual} {brand.organization}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
