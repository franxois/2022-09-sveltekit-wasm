import { build, files, prerendered, version } from '$service-worker';

console.log('Ho hi from service worker');

console.log({ build, files, prerendered, version });

self.addEventListener('fetch', (event) => {
	if (event instanceof FetchEvent) {
		if (event.request.url.endsWith('/backend/hello')) {
			event.respondWith(
				new Response(JSON.stringify({ message: 'Hello from Service Worker' }), {
					headers: { 'content-type': 'text/json' }
				})
			);
		}
	}
});
