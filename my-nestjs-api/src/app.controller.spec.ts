import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            testConnection: jest.fn().mockResolvedValue('Database connection is successful'),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('testConnection', () => {
    it('should return the result from AppService', async () => {
      const result = 'Database connection is successful';
      jest.spyOn(appService, 'testConnection').mockResolvedValueOnce(result);
      expect(await appController.testConnection()).toBe(result);
    });
  });
});
