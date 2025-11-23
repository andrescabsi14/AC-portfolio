import { openai } from '@ai-sdk/openai';
import { createAnswerRelevancyScorer, createBiasScorer, createToxicityScorer } from '@mastra/evals/scorers/llm';

const model = openai('gpt-4o');

export const answerRelevancyScorer = createAnswerRelevancyScorer({
    model,
});

export const toxicityScorer = createToxicityScorer({
    model,
});

export const biasScorer = createBiasScorer({
    model,
});
