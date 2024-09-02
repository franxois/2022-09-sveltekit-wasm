import * as xTerm from '@xterm/xterm';

export function xterm(node: HTMLElement, data: string) {
	const term = new xTerm.Terminal();
	term.open(node);
	term.write(data);

	return {
		update(data: string) {
			term.clear();
			term.write(data);
		}
	};
}
