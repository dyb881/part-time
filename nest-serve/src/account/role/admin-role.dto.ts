import { DtoParam } from '../../common';

/**
 * 查询列表对象
 */
export class AdminRoleQueryDto {
  @DtoParam('角色名称', { required: false })
  name?: string;
}

/**
 * 创建数据对象
 */
export class AdminRoleCreateDto {
  @DtoParam('角色名称')
  name: string;

  @DtoParam('权限配置')
  permissions: any;
}

/**
 * 编辑数据对象
 */
export class AdminRoleUpdateDto extends AdminRoleCreateDto {}
