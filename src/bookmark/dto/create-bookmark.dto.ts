import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateBookMarkDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsString()
    @IsNotEmpty()
    link: string
}