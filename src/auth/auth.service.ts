import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    signup() {
        // throw new HttpException('oh my god', HttpStatus.FORBIDDEN)
        console.log('i have signed up');
    }
    signin() {

    }
}