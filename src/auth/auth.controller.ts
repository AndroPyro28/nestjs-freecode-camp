import { Controller, Post, Req, Res, HttpException, HttpStatus, Get, Body } from "@nestjs/common";
 import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('/signup')
    signup (@Body() body: SignupDto) {
        return this.authService.signup(body)
    }

    @Post('/signin')
    signin (@Body() body: SigninDto) {
        return this.authService.signin(body)
    }
}