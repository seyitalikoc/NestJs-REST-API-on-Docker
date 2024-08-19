import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./dto/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ContextService } from "./context.service";

@Module({
    imports: [ 
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'my_jwt_secret_key_32',
            signOptions: { algorithm: 'HS256'}
        })    
    ],
    controllers: [ UserController] ,
    providers: [ UserService, ContextService ],
})

export class UserModule {}