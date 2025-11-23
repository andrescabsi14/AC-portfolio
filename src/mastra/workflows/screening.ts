import { z } from 'zod';
import { LegacyWorkflow as Workflow } from '@mastra/core/workflows/legacy';
import { recruiterAgent } from '../agents/recruiter';
import { guardrailAgent } from '../agents/guardrail';

// Step 0: Guardrail
const guardrailStep = {
    id: 'guardrail',
    inputSchema: z.object({
        jobDescription: z.string(),
    }),
    outputSchema: z.object({
        safe: z.boolean(),
    }),
    execute: async ({ context }: any) => {
        const { jobDescription } = context;
        const result = await guardrailAgent.generate(`Analyze this content: ${jobDescription}`);
        const isSafe = result.text.includes('SAFE');
        if (!isSafe) {
            throw new Error('Unsafe content detected');
        }
        return { safe: true };
    },
};

// Step 1: Analyze Job
const analyzeJobStep = {
    id: 'analyze-job',
    inputSchema: z.object({
        jobDescription: z.string(),
    }),
    outputSchema: z.object({
        analysis: z.string(),
    }),
    execute: async ({ context }: any) => {
        const { jobDescription } = context;
        const prompt = "Analyze this job description: " + jobDescription + ". Is it a fit for an AI Architect?";
        const result = await recruiterAgent.generate(prompt);
        return { analysis: result.text };
    },
};

// Step 2: Check Preferences
const checkPreferencesStep = {
    id: 'check-preferences',
    inputSchema: z.object({
        analysis: z.string().optional(),
    }),
    outputSchema: z.object({
        aligned: z.boolean(),
    }),
    execute: async ({ context }: any) => {
        return { aligned: true };
    },
};

// Step 3: Notify & Generate
const notifyGenerateStep = {
    id: 'notify-generate',
    inputSchema: z.object({
        analysis: z.string(),
        jobDescription: z.string(),
    }),
    outputSchema: z.object({
        resumeUrl: z.string(),
    }),
    execute: async ({ context }: any) => {
        const { analysis, jobDescription } = context;
        // Mock runtime context for tool execution
        const mockRuntime = {} as any;

        await recruiterAgent.tools.notifySlack.execute({
            context: { message: "New Opportunity: " + analysis },
            runtimeContext: mockRuntime
        });

        const resume = await recruiterAgent.tools.generateResume.execute({
            context: { jobDescription: jobDescription },
            runtimeContext: mockRuntime
        });

        return { resumeUrl: resume.resumeUrl };
    },
};

export const screeningWorkflow = new Workflow({
    name: 'screening-workflow',
    triggerSchema: z.object({
        jobDescription: z.string(),
    }),
})
    .step(guardrailStep)
    .then(analyzeJobStep)
    .then(checkPreferencesStep)
    .then(notifyGenerateStep)
    .commit();
