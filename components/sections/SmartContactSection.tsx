'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SmartContactSection() {
    const [interactionMode, setInteractionMode] = useState<'initial' | 'agent' | 'form'>('initial');
    const [messages, setMessages] = useState<{ role: 'agent' | 'user'; content: string }[]>([
        { role: 'agent', content: 'Hello. I am the AI assistant for Andres. I can help you scope a project or schedule a priority consultation. What are you looking to build?' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessages = [...messages, { role: 'user', content: inputValue }];
        setMessages(newMessages as any); // Type assertion for quick fix
        setInputValue('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'agent',
                content: "I understand. Based on your requirements, this sounds like a high-priority initiative. I've notified Andres directly. Please provide your email so we can send you the preliminary scope."
            }]);
        }, 1500);
    };

    return (
        <section className="py-32 bg-black border-t border-white/10">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                        Start the <span className="font-semibold text-blue-500">Conversation</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Choose how you'd like to connect. Our AI agent is available for immediate project scoping.
                    </p>
                </motion.div>

                <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <AnimatePresence mode="wait">
                        {interactionMode === 'initial' && (
                            <motion.div
                                key="initial"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="p-12 flex flex-col gap-6"
                            >
                                <h3 className="text-2xl font-light text-white text-center mb-4">What brings you here?</h3>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="w-full h-16 text-lg justify-between px-8 group"
                                    onClick={() => setInteractionMode('agent')}
                                >
                                    <span>I have an immediate project</span>
                                    <span className="text-white/50 group-hover:text-white transition-colors">Talk to AI →</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full h-16 text-lg justify-between px-8 group border-white/10 hover:bg-white/5"
                                    onClick={() => setInteractionMode('form')}
                                >
                                    <span>General inquiry / Networking</span>
                                    <span className="text-white/50 group-hover:text-white transition-colors">Send Email →</span>
                                </Button>
                            </motion.div>
                        )}

                        {interactionMode === 'agent' && (
                            <motion.div
                                key="agent"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col h-[500px]"
                            >
                                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-sm font-medium text-white">AI Assistant</span>
                                    </div>
                                    <button
                                        onClick={() => setInteractionMode('initial')}
                                        className="text-xs text-white/50 hover:text-white"
                                    >
                                        Reset
                                    </button>
                                </div>

                                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                                        : 'bg-white/10 text-gray-200 rounded-tl-none'
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 border-t border-white/10 bg-white/5">
                                    <div className="flex gap-2">
                                        <Input
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type your message..."
                                            className="bg-black/50 border-white/10 text-white focus:ring-blue-500"
                                        />
                                        <Button onClick={handleSendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                                            →
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {interactionMode === 'form' && (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="p-8"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-xl font-light text-white">Send a Message</h3>
                                    <button
                                        onClick={() => setInteractionMode('initial')}
                                        className="text-xs text-white/50 hover:text-white"
                                    >
                                        Back
                                    </button>
                                </div>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs text-white/50 uppercase tracking-wider">Name</label>
                                            <Input className="bg-black/50 border-white/10 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-white/50 uppercase tracking-wider">Email</label>
                                            <Input className="bg-black/50 border-white/10 text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-white/50 uppercase tracking-wider">Message</label>
                                        <Textarea className="bg-black/50 border-white/10 text-white min-h-[150px]" />
                                    </div>
                                    <Button className="w-full bg-white text-black hover:bg-gray-200">
                                        Send Request
                                    </Button>
                                </form>
                                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                                    <p className="text-sm text-white/50">Or email directly at</p>
                                    <a href="mailto:contact@acengineering.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                                        contact@acengineering.com
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
