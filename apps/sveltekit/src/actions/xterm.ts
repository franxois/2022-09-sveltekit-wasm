import * as xTerm from '@xterm/xterm';
import type { Action } from 'svelte/action';

export const xterm: Action<HTMLElement, string> = (node: HTMLElement, data: string) => {
	const term = new xTerm.Terminal();
	term.open(node);
	term.write(data);

	return {
		update(data: string) {
			term.write(data);
		}
	};
};
