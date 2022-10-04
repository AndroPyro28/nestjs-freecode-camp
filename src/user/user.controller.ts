import { Controller, Get, Patch, Req, UseGuards, Body } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../../src/auth/decorator';
import { User } from '@prisma/client';
import { UserServices } from './user.service';
import { UpdateUserDto } from './dto';
@UseGuards(JwtGuard) // is a middleware that authenticate your token and return a payload, it is top level because we want of all our route to run this Guard
@Controller('users') 
export class UserController {

    constructor(private readonly userService: UserServices) {}

    @Get('me')
    GetMe(@GetUser() user: User) {
        return user
    }

    @Patch('')
    updateUser(
        @Body() body: UpdateUserDto,
        @GetUser('id') id: number,    
        ) {
        return this.userService.updateUser(id, body);
    }
}
