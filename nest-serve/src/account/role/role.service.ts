import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common';
import { Role } from './role.entity';
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
    const { actions, apps } = this.configService.get<any>('permission');

    const permissionAction: any = {};
    for (let action of actions) {
      permissionAction[action] = false;
    }

    const permission: any = {};

    for (let [key, app] of Object.entries<any>(apps)) {
      permission[key] = {};
      for (let modular of app) {
        permission[key][modular] = permissionAction;
      }
    }

    return permission;
  }
}
