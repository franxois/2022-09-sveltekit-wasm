import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const getFiles = async (projectName: string = 'simple_esm_import') => {
	const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), projectName);

	const files = await readdir(__dirname, { recursive: true });

	return Promise.all(
		files.map(async (fileName) => [
			fileName,
			(await readFile(path.join(__dirname, fileName))).toString()
		])
	);
};
