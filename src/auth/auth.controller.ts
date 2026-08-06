import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const token = await this.authService.registerUser(registerUserDto);
    return token;
  }
  // @Post('login'){
  //   async login() {
  //     //agsvdbdhjASdkas;l
  //   }
  // }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    // Logic to get user profile
    const user = await this.userService.getUserById(userId);
    console.log('User profile:', user);
    return {
      id: user?.id,
      fname: user?.fname,
      lname: user?.lname,
      email: user?.email,
    };
  }
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.userLogin(loginUserDto);
  }
}
