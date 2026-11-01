import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
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

  @Get('models')
  async getModels(): Promise<any> {
    return await this.appService.getModelsFromDb();
  }

  @Get('check')
  checkToken(
    @Headers('authorization') authorization?: string,
  ): Promise<{ valid: true; uid: string }> {
    const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    if (!token) {
      throw new UnauthorizedException('Missing or malformed bearer token');
    }

    return this.appService.checkToken(token);
  }
}
