import { existsSync } from 'node:fs';
import { defineConfig } from 'prisma/config';

// Prisma 7 does not read .env itself; use Node's loader instead of adding dotenv.
if (existsSync('.env')) process.loadEnvFile('.env');

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  // process.env, not env(): `prisma generate` must work without a database URL.
  datasource: { url: process.env['DATABASE_URL'] },
});
