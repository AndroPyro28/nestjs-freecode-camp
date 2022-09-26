import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    lastname: string
    
    optional?: any

    @IsNotEmpty({message:'email is required field'})
    @IsEmail()
    email: string
    
    @IsNotEmpty({message: 'password is required field'})
    password: string
}
export class SigninDto{
    @IsNotEmpty({message:'email is required field'})
    @IsEmail()
    email: string

    @IsNotEmpty({message: 'password is required field'})
    password: string
}