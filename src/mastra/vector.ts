import { QdrantVector } from '@mastra/qdrant';

// Initialize Vector Store (Qdrant)
export const vectorStore = new QdrantVector({
    url: process.env.QDRANT_URL || 'http://localhost:6333',
});
