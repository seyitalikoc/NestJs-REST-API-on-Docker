import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { Event } from "./dto/event.entity";
import { EventRepository } from "./event.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ContextService } from "src/user/context.service";


@Module({
    imports : [
        TypeOrmModule.forFeature([Event]),
        JwtModule.register({
            secret: 'my_jwt_secret_key_32',
            signOptions: { algorithm: 'HS256'}
        })
    ],
    controllers: [EventController],
    providers : [EventService, EventRepository, ContextService],
})

export class EventModule{}