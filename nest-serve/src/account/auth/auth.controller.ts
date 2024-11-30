import { Body } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiPath, Method, AccountEntity, AccountLoginDto } from '../../common';
import { AccountAdminService } from '../admin/admin.service';
import { AdminLoginResDto } from './auth.dto';

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
  getToken(accountAdmin: AccountEntity) {
    const { id, username } = accountAdmin;
    const key = `secret-${this.configService.get('jwt.validateKey')}`;
    return this.jwtService.sign({ [key]: id, username });
  }

  @Method('管理员登陆', ['Post', 'admin'], { res: AdminLoginResDto })
  async admin(@Body() data: AccountLoginDto) {
    const user = await this.accountAdminService.login(data);

    // 获取鉴权 token
    const access_token = this.getToken(user);

    return { ...user, access_token };
  }

  // @Get()
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @ApiResponse({ status: 200, type: AdminInfoDto })
  // @ApiOperation('获取帐号信息')
  // getInfo(@Req() req) {
  //   return this.authService.getInfo(req.user.id);
  // }
}
