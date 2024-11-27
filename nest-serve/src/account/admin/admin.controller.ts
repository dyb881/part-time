import { Controller, Query, Get, Put, Post, Delete, Body, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountAdminService } from './admin.service';
import { ApiResponse, ApiBody, ApiQuery, ApiParam, ApiOperation } from '@nestjs/swagger';
import { AccountAdmin, ACCOUNT_ADMIN_STATUS } from './admin.entity';
import {
  AccountAdminCreateDto,
  AccountAdminUpdateDto,
  AccountAdminQueryDto,
  AccountAdminPaginationQueryDto,
  AccountAdminPaginationDto,
} from './admin.dto';
import { IdsDto } from '../../common';

@ApiTags('管理员账号')
@Controller('admin')
export class AccountAdminController {
  constructor(private readonly service: AccountAdminService) {}

  @Get('all')
  @ApiOperation({ summary: `查询所有` })
  @ApiResponse({ type: [AccountAdmin] })
  getAll(@Query() data: AccountAdminQueryDto) {
    return this.service.getList(data);
  }

  @Get()
  @ApiOperation({ summary: `查询分页列表` })
  @ApiResponse({ type: AccountAdminPaginationDto })
  getListAndCount(@Query() data: AccountAdminPaginationQueryDto) {
    return this.service.getListAndCount(data);
  }

  @Get(':id')
  @ApiOperation({ summary: `查询详情` })
  @ApiResponse({ type: AccountAdmin })
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  @ApiOperation({ summary: `添加` })
  async create(@Req() req, @Body() data: AccountAdminCreateDto) {
    Object.assign(data, { reg_ip: req.clientIp });
    await this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: `编辑` })
  async update(@Param('id') id: string, @Body() data: AccountAdminUpdateDto) {
    await this.service.update(id, data);
  }

  @Delete()
  @ApiOperation({ summary: `删除` })
  async delete(@Body() { ids }: IdsDto) {
    await this.service.delete(ids);
  }
}
