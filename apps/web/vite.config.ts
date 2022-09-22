import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import wasm from 'vite-plugin-wasm';

const config: UserConfig = {
	build: { target: 'esnext' },
	plugins: [sveltekit(), wasm()]
};

export default config;
