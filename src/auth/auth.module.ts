import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {JwtModule} from "@nestjs/jwt"
import { JwtStrategy } from "./strategy";
@Module({
    imports: [JwtModule.register({
        secret:process.env.JWT_SECRET_KEY,
    })],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController]
})
export class AuthModule {}