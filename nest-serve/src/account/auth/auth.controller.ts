import { Body, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiPath, Method, AccountEntity, AccountLoginDto } from '../../common';
import { AccountAdminService } from '../admin/admin.service';
import { AdminAuthDto, AdminDto } from './auth.dto';
import { AccountAdmin } from '../admin/admin.entity';

@ApiPath('auth', '鉴权')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly accountAdminService: AccountAdminService,
  ) {}

  /**
   * 生成加密串
   */
  getToken(account: AccountEntity) {
    const { id, username } = account;
    const key = `secret-${this.configService.get('jwt.validateKey')}`;
    return this.jwtService.sign({ [key]: id, username });
  }

  async getAdminRole(accountAdmin: AccountAdmin) {
    const { roleId } = accountAdmin;

    return {};
  }

  @Method('管理员登陆', ['Post', 'admin'], { res: AdminAuthDto })
  async admin(@Body() data: AccountLoginDto) {
    const user = await this.accountAdminService.login(data);

    // 获取鉴权 token
    const access_token = this.getToken(user);

    // 查询角色信息
    const role = await this.getAdminRole(user);

    return { ...user, access_token, role };
  }

  @Method('获取帐号信息', ['Get', 'admin'], { res: AdminDto, auth: true })
  async getInfo(@Req() req: any) {
    const user = await this.accountAdminService.get(req.user.id);

    // 查询角色信息
    const role = await this.getAdminRole(user);

    return { ...user, role };
  }
}
