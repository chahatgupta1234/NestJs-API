// import { Injectable } from '@nestjs/common';

// @Injectable()

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // Ensure this is injected
    private readonly jwtService: JwtService
  ) {}

  

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    console.log(`Validating user with email: ${email}`);
    if (user && user.password === password) {
      return user;
    }
    console.log('User not found or password incorrect');
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}