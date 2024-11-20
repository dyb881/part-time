import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { AccountAdminModule } from './account/admin/admin.module';

@Module({
  imports: [CommonModule, AccountAdminModule],
})
export class AppModule {}
