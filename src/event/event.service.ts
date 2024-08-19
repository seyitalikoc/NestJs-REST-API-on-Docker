import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventRepository } from "./event.repository";


@Injectable()
export class EventService{
    constructor(private readonly eventRepository : EventRepository){}

    async CreateEvent( event : CreateEventDto ){
        try{
            return await this.eventRepository.createEvent(event);
        }catch(error){
            console.log('[EVENT_SERV][CreateEvent]'+ error);
        }
    }

    async GetAllEvents(){
        try{
            return await this.eventRepository.getAllEvent();
        }catch(error){
            console.log('[EVENT_SERV][GetAllEvents]'+ error);
        }
    }

    async GetEvent(eventId : number){
        try{
            return await this.eventRepository.getEvent(eventId);
        }catch(error){
            console.log('[EVENT_SERV][GetEvent]'+ error);
        }
    }

    async UpdateEvent(data : CreateEventDto, eventId : number){
        try{
            return await this.eventRepository.findOneAndUpdate(data,eventId);
        }catch(error){
            console.log('[EVENT_SERV][UpdateEvent]'+ error);
        }
    }

    async DeleteEvent(eventId : number){
        try{
            return await this.eventRepository.deleteEvent(eventId);
        }catch(error){
            console.log('[EVENT_SERV][DeleteEvent]'+ error);
        }
    }

}