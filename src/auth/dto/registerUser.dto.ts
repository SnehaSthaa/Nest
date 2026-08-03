import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  fname: string;
  @IsString()
  lname: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
  @IsString()
  role: string;
}
