import { DtoParam } from '../../common';
import { AccountAdmin } from '../admin/admin.entity';

/**
 * 管理员登录返回信息
 */
export class AdminLoginResDto extends AccountAdmin {
  @DtoParam('headers.Authorization="Bearer ${access_token}" 用于鉴权')
  access_token: string;
}
