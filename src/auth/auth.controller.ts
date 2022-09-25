import { Controller, Post, Req, Res, HttpException, HttpStatus, Get, Body } from "@nestjs/common";
// import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('/signup')
    signup (@Body() body: AuthDto) {
        console.log(body);
        return this.authService.signup()
    }

    @Post('/signin')
    signin () {

    }
}