import { Controller, Get, LoggerService, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: LoggerService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

}
