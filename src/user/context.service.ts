import { Injectable, Scope } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable({scope : Scope.REQUEST})
export class ContextService{
    private context;

    getContext(): Promise<UserDto>{
        return this.context;
    }
    setContext(obj: UserDto){
        this.context = obj;
    }
}