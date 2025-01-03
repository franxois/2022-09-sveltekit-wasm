import type { PageServerLoad } from './$types';
import { getFilesForWebContainer } from '../../sample_projects/getFiles';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const files = await getFilesForWebContainer();

	return {
		files
	};
};
