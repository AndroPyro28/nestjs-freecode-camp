import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { user } from 'models';
import { SigninDto, SignupDto } from './dto';
@Injectable()
export class AuthService {
  async signup(body: SignupDto): Promise<SignupDto> {
    try {
      const { email, firstname, lastname, password } = body;
      const hashPassword = await argon.hash(password);
      const newUser = await user.create({
        data: {
          email,
          firstname,
          lastname,
          password: hashPassword,
        },
      });

      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ForbiddenException('email is already exist');
      }
    }
  }
  async signin(body: SigninDto) {
    try {
      const result = await user.findUnique({
        where: {
            email: body.email
        }
    });
    if (!result) throw new ForbiddenException('invalid credentials');

    const isPwMatches = await argon.verify(result.password, body.password);

    if(isPwMatches) throw new ForbiddenException('invalid credentials');

    delete result.password
    return result;
    } catch (error) {
      console.log('yehey');
      return error;
    }
  }
} 
