import type { PageServerLoad } from './$types';
import { getFiles } from './files';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const files = await getFiles();

	return {
		files
	};
};
