import type { RequestHandler } from './$types';

/** Fallback if service worker is not installed */
export const GET: RequestHandler = () => {
	return new Response(String(JSON.stringify({ message: 'Hello from Sveltekit API (+server.ts)' })));
};
