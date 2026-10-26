// Mirrors the Prisma enums in apps/api/prisma/schema.prisma; the api type-checks that they stay in sync.

export const ORDER_STATUS_LABELS = {
  NEW: 'Новый',
  CONFIRMED: 'Подтверждён',
  IN_PRODUCTION: 'В производстве',
  READY: 'Готов к отправке',
  SHIPPED: 'Отправлен',
  DELIVERED: 'Получен',
  CANCELLED: 'Отменён',
} as const;
export type OrderStatus = keyof typeof ORDER_STATUS_LABELS;

export const PAYMENT_STATUS_LABELS = {
  UNPAID: 'Не оплачен',
  PARTIAL: 'Оплачен частично',
  PAID: 'Оплачен',
  REFUNDED: 'Возврат',
} as const;
export type PaymentStatus = keyof typeof PAYMENT_STATUS_LABELS;
