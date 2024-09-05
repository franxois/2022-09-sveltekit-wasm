import type { PageServerLoad } from './$types';
import { getFiles } from '../../sample_projects/getFiles';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const files = await getFiles();

	return {
		files
	};
};
