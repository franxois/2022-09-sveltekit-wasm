import { getFilesForWebContainer } from '../../sample_projects/getFilesForWebContainer';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const files = await getFilesForWebContainer();

	return {
		files
	};
};
