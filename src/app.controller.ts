import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return 'This is a test endpoint';
  }

  @Get('info')
  getInfo(): any {
    return {"foo":"bar","bizz":"buzz"};
  }
}
