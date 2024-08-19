import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to EventHub. It\'s created by Seyit Ali KOÇ and Anıl KOÇER';
  }
}
