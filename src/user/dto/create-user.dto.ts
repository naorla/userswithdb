import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsEnum(['ADMIN', 'ENGINEER', 'INTERN'], {
    message: 'Role must be one of the following values: ADMIN, ENGINEER, or INTERN (and cannot be empty)',
  })
  role: 'ADMIN' | 'ENGINEER' | 'INTERN';
}
