import { Agent } from '@mastra/core';
import { Memory } from '@mastra/memory';
import { generateResume, notifySlack, readPreferences } from '../tools';

import { answerRelevancyScorer, biasScorer } from '../scorers';

export const recruiterAgent = new Agent({
    name: 'Recruiter Agent',
    instructions: `
    You are a multilingual AI assistant for Andrés Cabrera. Your goal is to screen recruiters.

    1. **Language Detection**:
       - Detect the language of the user's first message.
       - If the language is ambiguous, politely ask for their preferred language.
       - Conduct the ENTIRE conversation in the user's preferred language.

    2. **Job Analysis**:
       - Analyze the job description provided by the recruiter.

    3. **Preference Check**:
       - Use 'readPreferences' to check if the role aligns with Andrés's goals AND to retrieve relevant experience/skills from his resume that match the job description.

    4. **Negotiation**:
       - If aligned, negotiate salary/rates using the retrieved preferences.

    5. **Approval**:
       - If the opportunity is strong, use 'notifySlack' to ask for Andrés's approval.

    6. **Resume Generation**:
       - If approved, use 'generateResume' to create a custom resume. Pass the relevant experience/skills you found in step 3 into the 'customFocus' field to tailor the resume.

    **Tone & Style**:
    - Be professional, concise, and protective of Andrés's time.
    - Adapt your tone to the cultural norms of the language being used.

    IMPORTANT: If this is a returning conversation, acknowledge the previous discussion and continue from where you left off, maintaining the same language.
  `,
    model: {
        id: 'openai/gpt-4',
        provider: 'OPEN_AI',
    },
    memory: new Memory({
        options: {
            semanticRecall: {
                enabled: true,
                topK: 5,
                messageRange: 3,
                scope: 'resource',
            },
        },
    }),
    scorers: {
        answerRelevancy: {
            scorer: answerRelevancyScorer,
            sampling: { type: 'ratio', rate: 1 },
        },
        bias: {
            scorer: biasScorer,
            sampling: { type: 'ratio', rate: 1 },
        },
    },
    tools: {
        generateResume,
        notifySlack,
        readPreferences,
    },
});
