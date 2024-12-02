import { ApiPathAuth, CommonController, Method } from '../../common';
import { RoleService } from './role.service';
import { Role, Permissions } from './role.entity';
import { RoleCreateDto, RoleUpdateDto, RoleQueryDto, RolePaginationQueryDto, RolePaginationDto } from './role.dto';

@ApiPathAuth('role', '角色管理')
export class RoleController extends CommonController(
  Role,
  RoleCreateDto,
  RoleUpdateDto,
  RoleQueryDto,
  RolePaginationQueryDto,
  RolePaginationDto,
  RoleService,
) {}
