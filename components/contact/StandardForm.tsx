'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface StandardFormProps {
    type: 'general' | 'media';
}

export default function StandardForm({ type }: StandardFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
            >
                <div className="space-y-8">
                    <div className="w-16 h-px bg-white/30 mx-auto"></div>
                    <h2 className="text-3xl md:text-5xl font-light">Message sent</h2>
                    <p className="text-xl text-white/50 font-light">
                        {type === 'media'
                            ? "Thank you for your interest. I'll review your inquiry shortly."
                            : "I'll get back to you within 24 hours."}
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-8"
        >
            <div className="space-y-3">
                <label htmlFor="name" className="block text-xs tracking-wider text-white/30 uppercase">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="John Doe"
                />
            </div>

            <div className="space-y-3">
                <label htmlFor="email" className="block text-xs tracking-wider text-white/30 uppercase">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="john@company.com"
                />
            </div>

            <div className="space-y-3">
                <label htmlFor="company" className="block text-xs tracking-wider text-white/30 uppercase">
                    {type === 'media' ? 'Publication / Organization' : 'Company'}
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors"
                    placeholder={type === 'media' ? 'TechCrunch, BBC, etc.' : 'Your Company Inc.'}
                />
            </div>

            <div className="space-y-3">
                <label htmlFor="message" className="block text-xs tracking-wider text-white/30 uppercase">
                    {type === 'media' ? 'Topic / Interview Details' : 'Message'}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-white/10 text-white font-light focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder={type === 'media' ? 'Briefly describe the opportunity...' : 'Tell us about your business needs...'}
                />
            </div>

            <div className="pt-8">
                <button
                    type="submit"
                    className="text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300 border-b border-white/30 hover:border-white pb-1"
                >
                    Send message →
                </button>
            </div>
        </motion.form>
    );
}
