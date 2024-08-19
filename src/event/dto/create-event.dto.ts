import { 
    IsArray,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsString
} from 'class-validator';

export class CreateEventDto {

    eventId: number;

    @IsNotEmpty()
    @IsString()
    eventName : string;

    @IsNotEmpty()
    @IsString()
    eventStatement : string;

    @IsNotEmpty()
    @IsString()
    context : string;

    @IsNotEmpty()
    @IsDate()
    eventDate: string;

    @IsNotEmpty()
    @IsString()
    place : string;

    @IsNotEmpty()
    @IsString()
    createdBy : string;
}