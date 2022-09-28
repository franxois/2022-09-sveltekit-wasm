import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	build: {
		target: 'esnext'
	},
	server: {
		fs: { allow: ['../../packages/wasm/pkg'] }
	}
};

export default config;
