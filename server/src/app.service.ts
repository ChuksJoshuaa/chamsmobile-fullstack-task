import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private port: number;
  constructor(private readonly configService: ConfigService) {
    const port = this.configService.get<number>('PORT');

    this.port = port;
  }
  getHello(): string {
    const database: number = this.port;

    console.log(database);
    return 'Hello world';
  }
}
