import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthDto {
    @IsNotEmpty({
        message:'email is required field'
    })
    @IsEmail()
    email: string
    @IsNotEmpty({
        message: 'password is required field'
    })
    password: string
}