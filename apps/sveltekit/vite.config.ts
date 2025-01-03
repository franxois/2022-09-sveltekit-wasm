import { sveltekit } from '@sveltejs/kit/vite';
import type { Plugin, UserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const viteServerConfig: Plugin = {
	// Used for webcontainer but those headers are also necessary for
	// sqlite3-wasm.
	// see https://developer.chrome.com/blog/sqlite-wasm-in-the-browser-backed-by-the-origin-private-file-system?hl=fr
	name: 'webcontainer-header-middleware',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
			res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
			next();
		});
	}
};

export default {
	plugins: [
		viteServerConfig,
		sveltekit(),
		nodePolyfills({ include: ['buffer'] }) // Used for @sebastianwessel/quickjs
	],
	build: {
		target: 'esnext'
	},
	server: {
		fs: { allow: ['../../packages/wasm/pkg', '../../packages/component/dist/'] }
	},
	optimizeDeps: {
		exclude: ['@sqlite.org/sqlite-wasm']
	}
} satisfies UserConfig;
