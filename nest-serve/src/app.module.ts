import { Module } from '@nestjs/common';
import { GlobalModule } from './common';

@Module({
  imports: [GlobalModule],
})
export class AppModule {}
