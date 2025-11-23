import { mastra } from '@/src/mastra';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, threadId } = body;

        const agent = mastra.getAgent('recruiterAgent');

        if (!agent) {
            return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
        }

        // Use threadId for conversation persistence
        // Mastra automatically handles memory via threadId
        const response = await agent.generate(message, {
            resourceId: threadId || 'default',
            threadId: threadId || 'default',
        });

        return NextResponse.json({
            response: response.text,
        });
    } catch (error) {
        console.error('Mastra Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
