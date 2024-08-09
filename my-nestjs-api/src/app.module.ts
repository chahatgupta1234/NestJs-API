import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity'; // Ensure the path to User entity is correct
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mydatabase',
      autoLoadEntities: true,
      synchronize: true, // In production, use migrations
    }),
    TypeOrmModule.forFeature([User]), // Register the User entity
    AuthModule, // Import AuthModule
    JwtModule.register({
      secret: 'secretKey', // Use a more secure key in production
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UserService, JwtStrategy], // Include JwtStrategy in providers
  controllers: [UserController],
})
export class AppModule {}
