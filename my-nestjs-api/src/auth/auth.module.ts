import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'chahat', // Replace with your secret key
      signOptions: { expiresIn: '60m' },
    }),
    UserModule, // Import UserModule here
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
