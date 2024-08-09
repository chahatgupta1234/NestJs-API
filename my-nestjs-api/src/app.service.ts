
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user/user.entity';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async testConnection(): Promise<string> {
    try {
      const user = await this.userRepository.findOne({});
      if (user) {
        return 'Database connection is successful';
      } else {
        return 'Database connection is successful, but no user found';
      }
    } catch (error) {
      this.logger.error('Database connection failed', error.stack);
      return 'Database connection failed';
    }
  }
}
