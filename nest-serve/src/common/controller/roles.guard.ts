import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext, SetMetadata, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { get } from 'lodash';

/**
 * 权限管理
 */
export const Roles = Reflector.createDecorator<string[]>();

/**
 * 权限守卫
 * 根据对应权限控制
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    const request = context.switchToHttp().getRequest();

    // 无权限标识的接口，直接通过
    if (!roles) return true;

    console.log(roles);

    // if (permissions) {
    //   const [role] = permissions;

    //   // 获取角色权限配置
    //   const roles = await this.cacheManager.get(`permissions-${request.user.id}`);

    //   if (!get(roles, role)) return false;
    // }

    return true;
  }
}
