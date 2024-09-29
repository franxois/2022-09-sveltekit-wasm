import type { FileSystemTree } from '@webcontainer/api';
import { getFiles } from './getFiles';

/**
 *  List all files in ./example_projects/simple_esm and create a FileSystemTree for WebContainer
 * */

export const getFilesForWebContainer = async (
	projectName: string = 'simple_esm_import'
): Promise<FileSystemTree> => {
	return Object.fromEntries(
		(await getFiles(projectName)).map(([fileName, contents]) => [fileName, { file: { contents } }])
	);
};
