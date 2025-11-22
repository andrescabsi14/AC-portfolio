'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const services = [
    {
        title: 'Strategic Advisory',
        description: 'Guiding C-Suite executives and boards through the complexities of AI transformation. Developing roadmaps that align technical capability with business objectives.',
        features: ['AI Readiness Assessment', 'Executive Workshops', 'Technology Roadmap'],
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        title: 'Technical Implementation',
        description: 'Architecting and building scalable, production-ready AI systems. From custom LLM deployment to intelligent agent workflows.',
        features: ['Custom LLM Development', 'RAG Systems', 'Agentic Workflows'],
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        )
    },
    {
        title: 'Corporate Training',
        description: 'Upskilling engineering teams and leadership. Practical, hands-on training that bridges the gap between theory and production application.',
        features: ['Engineering Bootcamps', 'Prompt Engineering', 'AI Security & Ethics'],
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        )
    }
];

export default function ServicesSection() {
    return (
        <section className="relative py-32 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
                            Expertise for the <br />
                            <span className="text-blue-500 font-semibold">AI Era</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 max-w-md leading-relaxed">
                            Whether you need high-level strategy or deep technical execution, I provide the leadership needed to succeed.
                        </p>
                        <Button
                            className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6 rounded-full"
                            onClick={() => window.location.href = '/contact'}
                        >
                            Start a Conversation
                        </Button>
                    </motion.div>

                    {/* Right Column: Services List */}
                    <div className="space-y-6">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                                        <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                                        <ul className="flex flex-wrap gap-3">
                                            {service.features.map((feature) => (
                                                <li key={feature} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/5">
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
