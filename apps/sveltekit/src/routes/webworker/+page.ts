import MyWorker from './my.worker?worker';

// Run only on client side
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	console.log('Hello from load function on /webworker');
	const worker = new MyWorker();
	return { worker };
}
