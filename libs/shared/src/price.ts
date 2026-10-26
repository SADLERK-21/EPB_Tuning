const rub = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** 35000 -> "35 000 ₽", 99.5 -> "99,5 ₽". Accepts a string because Prisma Decimal serializes to one. */
export function formatPrice(value: number | string): string {
  const n = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(n)) throw new RangeError(`Not a price: ${value}`);
  return rub.format(n);
}
