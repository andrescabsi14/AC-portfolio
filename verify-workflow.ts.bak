import 'dotenv/config';
import { mastra } from './src/mastra';

async function testWorkflow() {
    try {
        const workflow = mastra.getWorkflow('screeningWorkflow');
        if (!workflow) {
            console.error('Workflow not found!');
            return;
        }

        console.log('Starting workflow execution...');
        const run = workflow.createRun();
        const result = await run.execute({
            triggerData: {
                jobDescription: 'We are looking for a Senior AI Engineer with experience in LLMs, Python, and TypeScript. Remote role.',
            },
        });

        console.log('Workflow Execution Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Workflow failed:', error);
    }
}

testWorkflow();
