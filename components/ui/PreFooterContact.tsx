'use client';

import { useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';
import Link from 'next/link';
import GlassButton from '@/components/ui/GlassButton';
import Typewriter from './Typewriter';

interface PreFooterContactProps {
    variant?: 'assessment' | 'contact';
}

const CONTENT = {
    assessment: {
        label: "Limited Time Offer",
        title: `Get Your Free <span className="aifirst">AI-First</span> Assessment`,
        description: `Discover exactly how much you could save and what AI can do for your business. Book a free consultation with one of our <span className="aifirst">AI-First</span> experts. No commitment required.`,
        buttonText: "See My Assessment",
        buttonHref: "/ai-first"
    },
    contact: {
        label: "Don't wait another day",
        title: `Let's create something extraordinary together.`,
        description: `Imagine not worrying about implementing AI in your business, and relying on an AI Proven Framework to eliminate the complexity.`,
        buttonText: "Learn more about AI-First",
        buttonHref: "/ai-first"
    }
};

export default function PreFooterContact({ variant = 'contact' }: PreFooterContactProps) {
    const content = CONTENT[variant];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.8 });
    const [typewriterComplete, setTypewriterComplete] = useState(false);

    return (
        <div
            ref={ref}
            className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm md:flex-row md:items-center md:justify-between"
        >
            <div className="space-y-3 min-h-[140px] md:min-h-[120px]">
                <p className="text-xs uppercase tracking-[0.25em]">{content.label}</p>
                <h3 className="text-3xl font-semibold tracking-tight text-white">
                    {isInView && (
                        <Typewriter
                            text={content.title}
                            speed={50}
                            className="text-3xl md:text-4xl font-light text-white"
                            onComplete={() => setTypewriterComplete(true)}
                            isHtml
                        />
                    )}
                </h3>
                {typewriterComplete && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="text-sm text-white/70"
                        dangerouslySetInnerHTML={{ __html: content.description }}
                    >

                    </motion.p>
                )}
            </div>
            <Link href={content.buttonHref}>
                <GlassButton className="w-full md:w-auto">
                    {content.buttonText}
                </GlassButton>
            </Link>
        </div>
    );
}
