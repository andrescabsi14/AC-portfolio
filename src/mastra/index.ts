import { Mastra } from '@mastra/core';
import { PostgresStore } from '@mastra/pg';
import { recruiterAgent } from './agents/recruiter';
import { screeningWorkflow } from './workflows/screening';
import { vectorStore } from './vector';

// Initialize PostgreSQL storage for memory
const pgStore = new PostgresStore({
    connectionString: process.env.DATABASE_URL || 'postgresql://vx:vx_password@localhost:5432/system',
});

export const mastra = new Mastra({
    agents: {
        recruiterAgent,
    },
    workflows: {
        screeningWorkflow,
    },
    vectors: {
        default: vectorStore,
    },
    storage: pgStore,
    telemetry: {
        serviceName: 'ac-portfolio',
        enabled: true,
    },
});
