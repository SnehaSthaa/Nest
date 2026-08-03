import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
        role: registerUserDto.role,
      });
    } catch (err: unknown) {
      console.log(err);
      const e = err as { code: number };
      const DUPLICATE_KEY_CODE = 11000;
      if (e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }
  async getUserById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }
}
