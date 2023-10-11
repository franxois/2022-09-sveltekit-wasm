import { sveltekit } from '@sveltejs/kit/vite';
import type { Plugin, UserConfig } from 'vite';

const viteServerConfig: Plugin = {
	name: 'webcontainer-header-middleware',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			next();
		});
	}
};

const config: UserConfig = {
	plugins: [viteServerConfig, sveltekit()],
	build: {
		target: 'esnext'
	},
	server: {
		fs: { allow: ['../../packages/wasm/pkg'] }
	}
};

export default config;
