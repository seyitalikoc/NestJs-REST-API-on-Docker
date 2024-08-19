import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsEmail()
    mail : string;

    @IsNotEmpty()
    @IsString()
    password : string;
    
    @IsArray()
    registered_events: [number]
}