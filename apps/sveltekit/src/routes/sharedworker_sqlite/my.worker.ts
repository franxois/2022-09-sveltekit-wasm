import * as Comlink from 'comlink';
import { HellosRepository } from '../../repositories/HellosRepository';

const instance = new HellosRepository();

(self as unknown as SharedWorkerGlobalScope).onconnect = function (event) {
	const port = event.ports[0];
	Comlink.expose(instance, port);
};
