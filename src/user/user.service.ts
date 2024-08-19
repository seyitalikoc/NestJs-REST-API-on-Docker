import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository:Repository<User>, 
    private readonly jwtService: JwtService,
  ){}

  async create(user : CreateUserDto){
    try{
      const person = await this.userRepository.findOne({where: { username : user.username, mail: user.mail}});
      
      if(!person){
        const new_user = this.userRepository.create(user);
        new_user.user_id = null;
        new_user.registered_events = []; //bos olacak
        return await this.userRepository.save<User>(new_user);
      }

      return 'Username or mail already registered. Try again.'; 

    }catch(error){
      console.log('[USER_SERV][create]' + error);
    }
  }

  async login(@Body() body){
    try{
      const person = await this.userRepository.findOne({where:{username: body.username}})

      if(person && body.password === person.password){
        return {
          access_token: this.jwtService.sign(
            {
              user_id: person.user_id,
              name: person.name,
              username: person.username,
              mail: person.mail,
            },
            {
              secret : "my_jwt_secret_key_32",
              expiresIn : '10m'
            }
          )
        }
      }
    }catch(error){
      console.log('[USER_SERV][login]' + error);
    }
  }

  async update(request : any){
    try{
      const user = await this.req_to_user(request);
      const username_control= await this.userRepository.findOne({where: {username: request.body.username}});
      const mail_control= await  this.userRepository.findOne({where: {mail: request.body.mail}});
      if(user ){
        user.name = request.body.name;
        if(username_control ){
          if(username_control.user_id != user.user_id){
            return 'Username or mail is already registered.'
          }
        }
        if(mail_control ){
          if(mail_control.user_id != user.user_id){
            return 'Username or mail is already registered.'
          }
        }
        user.username = request.body.username;
        user.mail = request.body.mail;
        user.password = request.body.password;
        user.registered_events = user.registered_events;

        this.userRepository.update({user_id:user.user_id},user);
        return { 
          access_token: this.jwtService.sign(
            {
              user_id: user.user_id,
              name: user.name,
              username: user.username,
              mail: user.mail,
            },
            {
              secret : "my_jwt_secret_key_32",
              expiresIn : '10m'
            }
          )
        }
      }
      return 'We can not found user. Try again.';
    }catch(error){
      console.log('[USER_SERV][update]' + error);
    }
  }

  async getRegisteredEvents(request : any){
    try{
      const user = await this.req_to_user(request);

      const person = await this.userRepository.findOne({where:{username: user.username}})
      if(person){
        return person.registered_events;
      }
      return 'We can not found user.'
    }catch(error){
      console.log('[USER_SERV][getRegisteredEvents]' + error);
    }
  }

  async registerEvent(request: any, event_id: number){
    try{
      const user =  await this.req_to_user(request);

      if(user && !user.registered_events.includes(event_id)){
        user.registered_events.push(event_id);
        return this.userRepository.update({user_id: user.user_id}, user);
      }

      return 'This event already in your registered events.'
    }catch(error){
      console.log('[USER_SERV][registerEvent]' + error);
    }
  }

  async deleteRegisteredEvent( request: any, event_id: number){
    try {
      const user = await this.req_to_user(request);

      if(user != null){
        for (let index = 0; index < user.registered_events.length; index++) {
          if (user.registered_events[index] == event_id) {
            delete user.registered_events[index] ;
            this.userRepository.update({user_id: user.user_id},user);
            return 'This event registry has deleted.'
          }
        }
      }
      return 'This event is not in your registered events.'
    }catch(error){
      console.log('[USER_SERV][deleteRegisteredEvent]' + error);
    }
  }

  async req_to_user(request : any){
    try{
      const authentication = (request.headers.authorization).split(' ')[1];
      const auth_string =  this.jwtService.verify(authentication,{secret: "my_jwt_secret_key_32"} )
      const user = await this.userRepository.findOne({where:{user_id:auth_string['user_id']}});
      return user;
    }catch(error){
      console.log('[USER_SERV][req_to_user]' + error);
    }
  }

}
