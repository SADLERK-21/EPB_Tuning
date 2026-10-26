import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import type { OrderStatus as SharedOrderStatus, PaymentStatus as SharedPaymentStatus } from '@epb/shared';
import { PrismaClient, type OrderStatus, type PaymentStatus } from './generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super({ adapter: new PrismaPg({ connectionString: process.env['DATABASE_URL'] }) });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

// Status labels in @epb/shared must list exactly the DB enum values: the build fails when they drift.
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
type Assert<T extends true> = T;
export type EnumsInSync = [Assert<Same<OrderStatus, SharedOrderStatus>>, Assert<Same<PaymentStatus, SharedPaymentStatus>>];
