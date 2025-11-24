export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        console.log('[INSTRUMENTATION] Loading Mastra with AI Tracing...');

        // Set the global flag BEFORE importing mastra to prevent legacy telemetry warnings
        (globalThis as any).___MASTRA_TELEMETRY___ = true;

        // Import Mastra instance to initialize observability
        await import('./src/mastra/index');

        console.log('[INSTRUMENTATION] Mastra loaded successfully');
    }
}

