import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateBookmarkDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    @IsOptional()
    link?: string;
}