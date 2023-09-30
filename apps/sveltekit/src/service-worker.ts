/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { build, files, prerendered, version } from '$service-worker';

console.log('Ho hi from service worker');

console.log({ build, files, prerendered, version });

self.addEventListener('fetch', (event) => {
	if (event instanceof FetchEvent) {
		if (event.request.url.endsWith('/api/hello')) {
			event.respondWith(
				new Response(JSON.stringify({ message: 'Hello from event listener on FETCH request in service worker' }), {
					headers: { 'content-type': 'text/json' }
				})
			);
		}
	}
});
