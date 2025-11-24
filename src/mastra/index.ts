import { Mastra } from '@mastra/core';
import { PostgresStore } from '@mastra/pg';
import { recruiterAgent } from './agents/recruiter';
// import { screeningWorkflow } from './workflows/screening'; // Commented out - using legacy workflow API
import { vectorStore } from './vector';
import { answerRelevancyScorer, biasScorer, toxicityScorer } from './scorers';

// Initialize PostgreSQL storage for memory and traces
const pgStore = new PostgresStore({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/mastra',
});

export const mastra = new Mastra({
    agents: {
        recruiterAgent,
    },
    // workflows: {
    //     screeningWorkflow, // Disabled - needs migration to new Workflow API
    // },
    vectors: {
        default: vectorStore,
    },
    storage: pgStore,
    scorers: {
        answerRelevancyScorer,
        biasScorer,
        toxicityScorer,
    },
    // Explicitly disable legacy telemetry system
    telemetry: {
        enabled: false,
    },
    // Use new AI Tracing system instead
    observability: {
        default: {
            enabled: true,
        },
    },
});
