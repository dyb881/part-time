import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './common/global.module';

@Module({
  imports: [GlobalModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
