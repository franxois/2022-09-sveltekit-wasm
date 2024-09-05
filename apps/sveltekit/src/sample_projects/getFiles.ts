import type { FileSystemTree } from '@webcontainer/api';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 *  List all files in ./example_projects/simple_esm and create a FileSystemTree for WebContainer
 * */

export const getFiles = async (projectName: string = 'simple_esm'): Promise<FileSystemTree> => {
	const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), projectName);

	const files = await readdir(__dirname, { recursive: true });

	return Object.fromEntries(
		await Promise.all(
			files.map(async (fileName) => [
				fileName,
				{ file: { contents: (await readFile(path.join(__dirname, fileName))).toString() } }
			])
		)
	);
};
