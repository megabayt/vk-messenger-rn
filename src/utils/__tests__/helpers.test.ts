import { serialize } from '../helpers';

test('serialize', () => {
  expect(serialize({ a: 1, b: 2 })).toBe('&a=1&b=2');
});
