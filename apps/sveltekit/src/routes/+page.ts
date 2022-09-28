import type { PageLoad } from './$types';

// Disable ssr because I can't manage to make wasm work with ssr
export const ssr = false;

export const load: PageLoad = () => {
	return {
		message: 'Hello world!',
		source: 'PageLoad'
	};
};
