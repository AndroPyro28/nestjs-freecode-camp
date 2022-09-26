import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { createUser, findUserByEmail, findUserById } from 'models';
import { SigninDto, SignupDto } from './dto';
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async signup(body: SignupDto): Promise<SignupDto> {
      const { email, firstname, lastname, password } = body;
      const hashPassword = await argon.hash(password);
      const newUser = await createUser({
        email,
        firstname,
        lastname,
        password: hashPassword,
      });
      if (newUser instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException('email is already exist');
      }
      return newUser;
  }

  async signin(body: SigninDto): Promise<{ access_token: string }> {
      const user = await findUserByEmail(body.email);

      if (!user) throw new ForbiddenException('invalid credentials');

      const isPwMatches = await argon.verify(user.password, body.password);

      if (!isPwMatches) throw new ForbiddenException('invalid credentials');

      return {
        access_token: await this.signToken(user.id, user.email),
      };
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

  async findUserByIdAndEmail({ id, email }: { id: number; email: string }) {
      const user = await findUserById(id);
      if (!user) {
        throw new UnauthorizedException('You are unauthorized');
      }
      return user;
  }
}
