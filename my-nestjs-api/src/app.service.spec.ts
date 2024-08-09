import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';

describe('AppService', () => {
  let service: AppService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('testConnection', () => {
    it('should return successful message if user found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({} as User);
      expect(await service.testConnection()).toBe('Database connection is successful');
    });

    it('should return successful message if no user found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);
      expect(await service.testConnection()).toBe('Database connection is successful, but no user found');
    });

    it('should return failed message if error occurs', async () => {
      jest.spyOn(repository, 'findOne').mockRejectedValueOnce(new Error('Error'));
      expect(await service.testConnection()).toBe('Database connection failed');
    });
  });
});
