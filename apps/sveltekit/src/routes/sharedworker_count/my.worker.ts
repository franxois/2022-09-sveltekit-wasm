import * as Comlink from 'comlink';

export class Stepper {
	public counter = 0;

	inc = () => {
		this.counter++;
	};
}

const instance = new Stepper();

/**
 * When a connection is made into this shared worker, expose `obj`
 * via the connection `port`.
 */
(self as unknown as SharedWorkerGlobalScope).onconnect = function (event) {
	const port = event.ports[0];
	Comlink.expose(instance, port);
};
