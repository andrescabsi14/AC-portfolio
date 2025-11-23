
import { Agent } from '@mastra/core';

import { toxicityScorer, biasScorer } from '../scorers';

export const guardrailAgent = new Agent({
    name: 'Guardrail Agent',
    instructions: `
      You are a multilingual content moderator. Your goal is to analyze the input message for inappropriate content, PII, or malicious intent.
      
      1. Detect the language of the input message.
      2. If the language is not clear, ask the user for their preferred language.
      3. Analyze the content in the detected/preferred language.
      4. Return "SAFE" if the content is safe.
      5. Return "UNSAFE" followed by a reason in the SAME language as the input if the content is unsafe.
      
      Examples:
      - Input: "Hello" -> "SAFE"
      - Input: "Hola" -> "SAFE"
      - Input: "I hate you" -> "UNSAFE: Harassment detected"
      - Input: "Te odio" -> "UNSAFE: Acoso detectado"
    `,
    model: {
        id: 'google/gemini-1.5-pro',
        provider: 'GOOGLE',
    },
    scorers: {
        toxicity: {
            scorer: toxicityScorer,
            sampling: { type: 'ratio', rate: 1 },
        },
        bias: {
            scorer: biasScorer,
            sampling: { type: 'ratio', rate: 1 },
        },
    },
});
