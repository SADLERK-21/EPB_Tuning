import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice } from './price.ts';

// Intl puts a no-break space between thousands and before ₽; compare with plain spaces.
const plain = (s: string) => s.replace(/\s/g, ' ');

test('formats rubles with thousands separator', () => {
  assert.equal(plain(formatPrice(35000)), '35 000 ₽');
  assert.equal(plain(formatPrice('95000.00')), '95 000 ₽');
  assert.equal(plain(formatPrice(500)), '500 ₽');
});

test('keeps kopecks instead of silently rounding them', () => {
  assert.equal(plain(formatPrice('99.50')), '99,5 ₽');
});

test('rejects garbage instead of printing NaN', () => {
  assert.throws(() => formatPrice('abc'), RangeError);
});
