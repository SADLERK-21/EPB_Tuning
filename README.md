# EPB — epbtuning.com

Монорепозиторий нового сайта.

| Папка | Что это | Порт в dev |
|---|---|---|
| `apps/shop` | Витрина, Angular 22 + SSR | 4200 |
| `apps/admin` | Админка, Angular 22 (без индексации) | 4201 |
| `apps/api` | API, NestJS 12 + Prisma 7 + PostgreSQL | 3000 (`/api/...`) |
| `libs/shared` | `@epb/shared`: общие функции и подписи статусов | — |

## Первый запуск

Нужны Node 24+ и Docker.

```bash
npm install
```

```bash
cp .env.example .env && cp .env.example apps/api/.env
```

Пароль БД поменяйте в обоих `.env`.

```bash
npm run db:up
```

```bash
npm run db:migrate
```

```bash
npm run build -w @epb/shared
```

Дальше в отдельных терминалах: `npm run dev:shared` (пересборка общей библиотеки), `npm run dev:api`, `npm run dev:shop`, `npm run dev:admin`.

Проверка API: `GET http://localhost:3000/api/health` → `{"status":"ok"}`.

## Команды

| Команда | Что делает |
|---|---|
| `npm run build` | Собирает всё по порядку: shared → api → shop → admin |
| `npm test` | Тесты всех пакетов |
| `npm run db:migrate` | Новая миграция после правки `apps/api/prisma/schema.prisma` (`prisma migrate dev`) |
| `npm run db:deploy -w api` | Применить миграции на сервере |

## Договорённости

- Схема БД: `apps/api/prisma/schema.prisma`. Клиент Prisma генерируется в `apps/api/src/generated/` (в git не хранится, создаётся при `npm install`).
- Деньги — `Decimal(12,2)` в рублях. Для показа есть `formatPrice()` из `@epb/shared`.
- Статусы заказа описаны в двух местах: в enum Prisma и в подписях в `libs/shared/src/order-status.ts`. Если они разойдутся, `api` не соберётся.
- SSR витрины принимает только хосты из `angular.json` → `security.allowedHosts` (`epbtuning.com`, `localhost`). www-зеркало перенаправляет nginx.
