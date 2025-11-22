'use client';

import { motion } from 'framer-motion';

export default function GlobalStatus() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="fixed bottom-8 right-8 z-40 hidden lg:block"
        >
            <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Global Reach</span>
                </div>

                <h3 className="text-lg font-light text-white mb-2">
                    High-Level Engagement
                </h3>

                <p className="text-sm text-white/60 leading-relaxed mb-4">
                    Collaborating with executive teams across Europe, America, Africa, and Asia.
                </p>

                <div className="flex gap-2">
                    {['EU', 'US', 'AF', 'AS'].map((region) => (
                        <span key={region} className="text-[10px] font-bold text-white/30 border border-white/10 px-2 py-1 rounded">
                            {region}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
