import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContextService } from "src/user/context.service";
import { Event } from "./dto/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
import { Repository } from "typeorm";

@Injectable()
export class EventRepository {
    constructor(
        @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
        private readonly contextService : ContextService,
    ){}

    async getEvent(eventId : number){
        try{
            return await this.eventRepository.findOne({where: {eventId: eventId }});
        }catch(error){
            console.log('[EVENT_REPO][getEvent]' + error);
        }
    }

    async getAllEvent(): Promise<Event[]> {
        try{
            return await this.eventRepository.find();
        }catch(error){
            console.log('[EVENT_REPO][getAllEvent]' + error);
        }
    }

    async createEvent( event: CreateEventDto){
        try{
            const user = await this.contextService.getContext()
        
            const newEvent = event;
            newEvent.eventId = null;
            newEvent.createdBy = user.username;

            return await this.eventRepository.save<Event>(newEvent);
        }catch(error){
            console.log('[EVENT_REPO][createEvent]' + error);
        }
    }

    async findOneAndUpdate(data: CreateEventDto, eventId: number) {
        try{
            const user = await this.contextService.getContext();
            const event = await this.getEvent(eventId);
            if(event.createdBy == user.username){
                event.eventName = data.eventName;
                event.eventStatement = data.eventStatement;
                event.context = data.context;
                event.eventDate = data.eventDate;
                event.place = data.place;

                this.eventRepository.update({eventId:eventId}, event);
                return 'This event is changed';
            }

            return 'You can not have access to change this event.';
        }catch(error){
            console.log('[EVENT_REPO][findOneAndUpdate]' + error);
        }
    }

    async deleteEvent( eventId: number){
        try{
            const user = await this.contextService.getContext();
            const event = await this.getEvent(eventId);

            if(event.createdBy == user.username){
                this.eventRepository.delete(eventId = eventId);
                
                return 'This event deleted.';
            }

            return 'You can not have access to delete this event.';
        }catch(error){
            console.log('[EVENT_REPO][deleteEvent]' + error);
        }
    }
}