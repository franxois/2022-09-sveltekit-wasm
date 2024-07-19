import MySharedWorker from './my.worker?sharedworker';
// import MyWorker from './my.worker?worker';

// Run only on client side
export const ssr = false;

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	console.log('Hello from load function');

	// const worker = new MyWorker();
	const sharedWorker = new MySharedWorker();

	sharedWorker.onerror = (e) => {
		console.log(e);
	};

	sharedWorker.port.onmessage = (e) => {
		console.log(e);
		console.log('load fn received message', e.data);

		sharedWorker.port.postMessage('Hello from load fn');
		//e.ports[0].postMessage('Hello from page??');
	};
	sharedWorker.port.start();

	sharedWorker.port.postMessage('Hello from load fn 2');

	sharedWorker.port.onmessageerror = (e) => {
		console.log('load fn received error', e.data);
	};

	// console.log(worker);
	console.log(sharedWorker);

	return { sharedWorker };
}
