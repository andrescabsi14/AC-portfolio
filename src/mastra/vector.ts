import { QdrantVector } from '@mastra/qdrant';

// Initialize Vector Store (Qdrant)
// Using port 6334 to avoid conflict with other Qdrant instance on 6333
export const vectorStore = new QdrantVector({
    url: process.env.QDRANT_URL || 'http://localhost:6334',
});
