import assert from 'node:assert';
import { test } from 'node:test';
import { add } from './math.mjs';

test('Math', () => {
	assert.equal(add(1, 2), 3);
});
