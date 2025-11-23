mastra:
	npx mastra dev

dev:
	npm run dev

ingest-resumes:
	npx tsx src/mastra/rag/process-resumes.ts
