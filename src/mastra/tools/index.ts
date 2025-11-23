import { createTool } from '@mastra/core';
import { z } from 'zod';
import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { vectorStore } from '../vector';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Tool: Generate Resume
export const generateResume = createTool({
    id: 'generate-resume',
    description: 'Generates a custom resume PDF based on the job description and user profile.',
    inputSchema: z.object({
        jobDescription: z.string(),
        customFocus: z.string().optional(),
    }),
    outputSchema: z.object({
        resumeUrl: z.string(),
        status: z.string(),
    }),
    execute: async ({ context }) => {
        const { jobDescription, customFocus } = context;

        console.log('Generating resume for:', jobDescription);

        // Real PDF generation
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Andrés Cabrera - AI Architect", 10, 20);

        doc.setFontSize(12);
        doc.text("Contact: ac@example.com | Portfolio: ac-portfolio.com", 10, 30);

        doc.setFontSize(14);
        doc.text("Professional Summary", 10, 45);
        doc.setFontSize(10);
        doc.text(`Tailored for: ${jobDescription.substring(0, 100)}...`, 10, 55);

        if (customFocus) {
            doc.text(`Specialized Focus: ${customFocus}`, 10, 65);
        }

        doc.text("Experience:", 10, 80);
        doc.text("- CEO, BX Infrastructure (AI & Global Strategy)", 15, 90);
        doc.text("- Strategic Advisor, Coca-Cola & Gillette", 15, 100);

        const fileName = `resume-${Date.now()}.pdf`;
        const resumeDir = path.join(process.cwd(), 'public', 'resumes');

        if (!fs.existsSync(resumeDir)) {
            fs.mkdirSync(resumeDir, { recursive: true });
        }

        const filePath = path.join(resumeDir, fileName);

        // Save to file system
        const pdfOutput = doc.output('arraybuffer');
        fs.writeFileSync(filePath, Buffer.from(pdfOutput));

        return {
            resumeUrl: `/resumes/${fileName}`,
            status: 'generated'
        };
    },
});

// Tool: Notify Slack
export const notifySlack = createTool({
    id: 'notify-slack',
    description: 'Sends a message to Slack for human approval.',
    inputSchema: z.object({
        message: z.string(),
        channel: z.string().optional(),
    }),
    outputSchema: z.object({
        success: z.boolean(),
    }),
    execute: async ({ context }) => {
        const { message } = context;
        console.log('Sending to Slack:', message);

        const webhookUrl = process.env.SLACK_WEBHOOK_URL;
        if (!webhookUrl) {
            console.warn("SLACK_WEBHOOK_URL not set, skipping actual send.");
            return { success: false };
        }

        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: message }),
            });
            return { success: true };
        } catch (error) {
            console.error("Failed to send to Slack:", error);
            return { success: false };
        }
    },
});

// Tool: Read Preferences (RAG)
export const readPreferences = createTool({
    id: 'read-preferences',
    description: 'Retrieves information about Andrés\'s experience, skills, and preferences from his resume.',
    inputSchema: z.object({
        query: z.string(),
    }),
    outputSchema: z.object({
        preferences: z.string(),
    }),
    execute: async ({ context }) => {
        const { query } = context;
        console.log('Querying vector store for:', query);

        try {
            // Generate embedding for the query
            const embeddingResponse = await openai.embeddings.create({
                model: 'text-embedding-3-small',
                input: query,
            });
            const vector = embeddingResponse.data[0].embedding;

            // Query the 'resume' collection
            const results = await vectorStore.query({
                indexName: "resume",
                queryVector: vector,
                topK: 3
            });

            // Safely extract text from results, handling different possible structures
            const preferences = results
                .map((r: any) => {
                    // Handle different possible result structures
                    if (r?.payload?.text) return r.payload.text;
                    if (r?.metadata?.text) return r.metadata.text;
                    if (r?.text) return r.text;
                    if (r?.content) return r.content;
                    return null;
                })
                .filter((text: string | null) => text !== null)
                .join('\n\n');

            return {
                preferences: preferences || "No specific information found in resume."
            };
        } catch (error) {
            console.error("Vector store query failed:", error);
            return {
                preferences: "Error retrieving information."
            };
        }
    },
});
