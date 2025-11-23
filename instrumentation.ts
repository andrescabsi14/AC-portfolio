export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Import Mastra instance to initialize observability
    await import('./src/mastra/index');

    // Set the global flag to prevent legacy telemetry warnings
    globalThis.___MASTRA_TELEMETRY___ = true;
  }
}
