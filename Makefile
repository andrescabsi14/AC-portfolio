.PHONY: mastra dev ingest-resumes up down logs

mastra:
	npx mastra dev

# Start Docker services in background, then start Next.js dev server
dev:
	@echo "Starting Docker services..."
	@docker compose up -d
	@echo "Starting Next.js dev server..."
	npm run dev

# Start Docker services in background
up:
	docker compose up -d

# Stop Docker services
down:
	docker compose down

# View Docker logs
logs:
	docker compose logs -f

ingest-resumes:
	npx tsx src/mastra/rag/process-resumes.ts

