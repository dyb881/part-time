import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { AccountAdminModule } from './account/admin/admin.module';
import { AuthModule } from './account/auth/auth.module';

@Module({
  imports: [CommonModule, AccountAdminModule, AuthModule],
})
export class AppModule {}
