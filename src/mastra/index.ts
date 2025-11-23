import { Mastra } from '@mastra/core';
import { PostgresStore } from '@mastra/pg';
import { DefaultExporter } from '@mastra/core/ai-tracing';
import { recruiterAgent } from './agents/recruiter';
// import { screeningWorkflow } from './workflows/screening'; // Commented out - using legacy workflow API
import { vectorStore } from './vector';
import { answerRelevancyScorer, biasScorer, toxicityScorer } from './scorers';

// Initialize PostgreSQL storage for memory and traces
const pgStore = new PostgresStore({
    connectionString: process.env.DATABASE_URL || 'postgresql://vx:vx_password@localhost:5432/system',
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
    observability: {
        configs: {
            local: {
                serviceName: 'ac-portfolio',
                exporters: [new DefaultExporter()],
            },
        },
    },
});
