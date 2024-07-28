import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	return {
		sections: [
			{ slug: '/', title: 'home' },
			{ slug: '/wasi', title: 'wasi' },
			{ slug: '/wasi_component', title: 'wasi component' },
			{ slug: '/webcontainer', title: 'webcontainer' },
			{ slug: '/webworker', title: 'webworker sqlite' },
			{ slug: '/sharedworker_count', title: 'simple sharedworker' },
			{ slug: '/sharedworker_sqlite', title: 'sharedworker sqlite' }
		]
	};
};
