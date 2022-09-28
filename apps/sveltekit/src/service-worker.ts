import { build, files, prerendered, version } from '$service-worker';

/*
    service workers only work in the production build, not in development.

    To test, need to run `pnpm run build && pnpm run preview`
    https://kit.svelte.dev/docs/service-workers
*/

console.log('Ho hi from service worker');

console.log({ build, files, prerendered, version });
