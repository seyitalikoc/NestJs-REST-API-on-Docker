import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, BadRequestException, UseGuards, Request } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { JwtGuard } from "src/guard/jwt.guard";

@Controller("event")
export class EventController{

    constructor(private readonly eventService: EventService) {}

    @Get("")
    async GetAllEvents(){
        try{
            return await this.eventService.GetAllEvents();
        }catch(error){
            console.log('[EVENT_CONT][GetAllEvents]'+ error);
        }
    }

    @Get("/id:eventId")
    async GetEvent(@Param("eventId") eventId : number){
        try{
            return await this.eventService.GetEvent(eventId);
        }catch(error){
            console.log('[EVENT_CONT][GetEvent]'+ error);
        }
    }

    @UseGuards(JwtGuard)
    @Post("")
    async CreateEvent(@Body() body : CreateEventDto, @Res() res: any ){
        try{
            const newEvent = body;
            newEvent.eventId = null;
            newEvent.createdBy = null;
            const newEvent2: any = await this.eventService.CreateEvent(newEvent);
            return await res.status(HttpStatus.OK).send(newEvent2);
        }catch(error){
            console.log('[EVENT_CONT][CreateEvent]'+ error);
        }
    }

    @UseGuards(JwtGuard)
    @Put("/id:eventId")
    async EditEvent(@Param('eventId') eventId : number, @Body() body: CreateEventDto ){
        try{
            return await this.eventService.UpdateEvent(body, eventId);
        }catch(error){
            console.log('[EVENT_CONT][EditEvent]'+ error);
        }
    }

    @UseGuards(JwtGuard)
    @Delete("/id:eventId")
    async DeleteEvent(@Param('eventId') eventId : number ){
        try{
            return await this.eventService.DeleteEvent(eventId);
        }catch(error){
            console.log('[EVENT_CONT][DeleteEvent]'+ error);
        }
    }

}
