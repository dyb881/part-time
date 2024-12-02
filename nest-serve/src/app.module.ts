import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CommonModule } from './common';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    CommonModule, // 公共模块
    AccountModule, // 帐号模块
    
    // 路由定义
    RouterModule.register([{ path: 'account', module: AccountModule }]),
  ],
})
export class AppModule {}
