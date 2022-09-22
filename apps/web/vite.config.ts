import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

const config: UserConfig = {
	plugins: [sveltekit(), wasm()],
	build: {
		target: 'esnext'
	}
};

export default config;
