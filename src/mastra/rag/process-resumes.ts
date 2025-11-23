import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { randomUUID } from 'crypto';
import { OpenAI } from 'openai';
import { vectorStore } from '../vector';

const require = createRequire(import.meta.url);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const RESUME_DIR = path.join(process.cwd(), 'resume');

async function getEmbeddings(text: string) {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    });
    return response.data[0].embedding;
}

async function chunkText(text: string, chunkSize: number = 1000) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
}

async function processResumes() {
    console.log('Starting resume ingestion...');

    if (!fs.existsSync(RESUME_DIR)) {
        console.error('Resume directory not found:', RESUME_DIR);
        return;
    }

    // Create the collection if it doesn't exist
    try {
        await vectorStore.createIndex({
            indexName: 'resume',
            dimension: 1536, // text-embedding-3-small dimension
        });
        console.log('Created or verified "resume" collection');
    } catch (error: any) {
        // Collection might already exist, that's okay
        console.log('Collection creation note:', error.message);
    }

    const files = fs.readdirSync(RESUME_DIR);

    for (const file of files) {
        const filePath = path.join(RESUME_DIR, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) continue;

        console.log(`Processing ${file}...`);

        let text = '';

        if (file.endsWith('.pdf')) {
            const { PDFParse } = require('pdf-parse');
            const dataBuffer = fs.readFileSync(filePath);
            const parser = new PDFParse({ data: dataBuffer });
            await parser.load();
            const result = await parser.getText();
            // getText() returns {pages: [{text: string}, ...]}
            text = result.pages.map((page: any) => page.text).join('\n');
        } else if (file.endsWith('.txt') || file.endsWith('.md')) {
            text = fs.readFileSync(filePath, 'utf-8');
        } else {
            console.log(`Skipping unsupported file: ${file}`);
            continue;
        }

        const chunks = await chunkText(text);

        console.log(`Generated ${chunks.length} chunks for ${file}`);

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const embedding = await getEmbeddings(chunk);

            try {
                await vectorStore.upsert({
                    indexName: 'resume',
                    vectors: [embedding],
                    metadata: [{
                        text: chunk,
                        source: file,
                        chunkIndex: i,
                    }],
                    ids: [randomUUID()]
                });
            } catch (error: any) {
                console.error('Upsert error details:', {
                    message: error.message,
                    cause: error.cause,
                    data: error.cause?.data,
                    vectorLength: embedding.length,
                    chunkLength: chunk.length
                });
                throw error;
            }
        }
    }

    console.log('Resume ingestion complete!');
}

processResumes().catch(console.error);
