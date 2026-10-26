import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { PrismaService } from './prisma.service.js';

describe('AppController', () => {
  let appController: AppController;
  const prisma = { $queryRaw: vi.fn() };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: PrismaService, useValue: prisma }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('reports ok when the database answers', async () => {
    prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);
    await expect(appController.health()).resolves.toEqual({ status: 'ok' });
  });

  it('fails when the database is down', async () => {
    prisma.$queryRaw.mockRejectedValue(new Error('connection refused'));
    await expect(appController.health()).rejects.toThrow('connection refused');
  });
});
