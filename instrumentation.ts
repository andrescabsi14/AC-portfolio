export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const {
      NodeSDK,
      ATTR_SERVICE_NAME,
      resourceFromAttributes,
    } = await import('@mastra/core/telemetry/otel-vendor');

    const sdk = new NodeSDK({
      resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: 'ac-portfolio',
      }),
    });

    sdk.start();

    // Set the global flag to prevent warning messages
    globalThis.___MASTRA_TELEMETRY___ = true;
  }
}
