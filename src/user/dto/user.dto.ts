import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserDto {

    @IsNotEmpty()
    @IsNumber()
    user_id : number;

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNotEmpty()
    @IsString()
    username : string;

    @IsNotEmpty()
    @IsEmail()
    mail : string;
    
    @IsArray()
    registered_events: [number]
}