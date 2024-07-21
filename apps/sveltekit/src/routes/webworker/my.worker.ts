import * as Comlink from 'comlink';
import { HellosRepository } from '../../repositories/HellosRepository';

Comlink.expose(HellosRepository);
