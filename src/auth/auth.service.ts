import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { user } from 'models';
import { SigninDto, SignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

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
  async signin(body: SigninDto): Promise<{access_token: string}> {
    try {
      const result = await user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!result) throw new ForbiddenException('invalid credentials');

      const isPwMatches = await argon.verify(result.password, body.password);

      if (!isPwMatches) throw new ForbiddenException('invalid credentials');

      return {
       access_token: await this.signToken(result.id, result.email)
      }
    } catch (error) {
      console.log('yehey');
      return error;
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      id: userId,
      email,
    };

    return this.jwt.sign(payload, {
      expiresIn: '5m',
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
