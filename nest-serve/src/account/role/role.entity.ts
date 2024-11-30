import { Entity } from 'typeorm';
import { CommonEntity, EntityColumn } from '../../common';

@Entity()
export class Role extends CommonEntity {
  @EntityColumn('角色名称')
  name: string;

  @EntityColumn('权限配置', { type: 'simple-json' })
  permissions: Permissions;
}

class Permissions {
  
}
