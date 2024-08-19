import { Controller, Get, Post, Put, Delete, Body, Request, Param, Req } from "@nestjs/common";
import { UserService } from './user.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/guard/jwt.guard";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post("")
  async Register(@Body() user : CreateUserDto){
    try{
      return await this.userService.create(user);
    }catch(error){
      console.log('[USER_CONT][Register]' + error);
    }
  }

  @Post("/login")
  async Login(@Body() user: any){
    try{
      return await this.userService.login(user);
    }catch(error){
      console.log('[USER_CONT][Login]' + error);
    }
  }

  @UseGuards(JwtGuard)
  @Put("")
  async EditProfile(@Request() req : any){
    try{
      return await this.userService.update(req);
    }catch(error){
      console.log('[USER_CONT][EditProfile]' + error);
    }
  }

  @UseGuards(JwtGuard)
  @Get("/events")
  async GetAllRegisteredEvents(@Request() req : any){
    try{
      return await this.userService.getRegisteredEvents(req);
    }catch(error){
      console.log('[USER_CONT][GetAllRegisteredEvents]' + error);
    }
  }

  @UseGuards(JwtGuard)
  @Get("/eventid:eventId")
  async RegisterEvent(@Param('eventId') eventId : number, @Request() req : any){
    try{
      return await this.userService.registerEvent(req, eventId);
    }catch(error){
      console.log('[USER_CONT][RegisterEvent]' + error);
    }
  }

  @UseGuards(JwtGuard)
  @Delete("/eventid:eventId")
  async DeleteEvent(@Param('eventId') eventId : number, @Request() req: any){
    try{
      return await this.userService.deleteRegisteredEvent(req, eventId);
    }catch(error){
      console.log('[USER_CONT][DeleteEvent]' + error);
    }
  }
}