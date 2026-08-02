import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    console.log('Registering user:', registerUserDto);
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);
    console.log('Password hash:', hash);

    // Logic for user register
    // 1. check if email already exists
    // 2. hash the password
    // 3. save the user to the database
    // 4. generate a JWT token
    // 5. send token in response
    await (this.userService as any).createUser({
      ...registerUserDto,
      password: hash,
    });
  }
}
