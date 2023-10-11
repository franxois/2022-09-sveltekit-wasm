import type { FileSystemTree } from '@webcontainer/api';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const getFiles = async (): Promise<FileSystemTree> => {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));

	return {
		'index.js': {
			file: {
				contents: `
import express from 'express';
const app = express();
const port = 3111;

app.get('/', (req, res) => {
  res.send('Welcome to a WebContainers app! 🥳');
});

app.listen(port, () => {
  console.log(\`App is live at http://localhost:\${port}\`);
});`
			}
		},
		'package.json': {
			file: {
				contents: `
{
  "name": "example-app",
  "type": "module",
  "dependencies": {
    "express": "latest",
    "nodemon": "latest"
  },
  "scripts": {
    "start": "nodemon --watch './' index.js",
	"test":"node --test ."
  }
}`
			}
		},
		'math.mjs': {
			file: { contents: (await readFile(path.join(__dirname, 'math.mjs'))).toString() }
		},
		'math.test.mjs': {
			file: { contents: (await readFile(path.join(__dirname, 'math.test.mjs'))).toString() }
		}
	};
};
