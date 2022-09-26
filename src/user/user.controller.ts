import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport"
import { Request } from 'express';

@Controller('users') 
export class UserController {
    @UseGuards(AuthGuard(['jwt'])) // is a middleware that authenticate your token and return a payload
    @Get('me')
    GetMe(@Req() req: Request) {
        return req.user
    }
}
