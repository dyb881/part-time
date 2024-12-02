import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common';
import { Role, Permissions } from './role.entity';
import { RoleCreateDto, RoleUpdateDto, RoleQueryDto, RolePaginationQueryDto } from './role.dto';

@Injectable()
export class RoleService extends CommonService(
  Role,
  RoleCreateDto,
  RoleUpdateDto,
  RoleQueryDto,
  RolePaginationQueryDto,
) {
  /**
   * 获取权限配置
   */
  getPermissionConfig() {
    const permission = new Permissions();
    return permission;
  }
}
